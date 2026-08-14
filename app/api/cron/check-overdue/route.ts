import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { elapsedBusinessHours } from '@/lib/businessHours'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

const OVERDUE_HOURS = 5

export async function GET(req: NextRequest) {
  // Verify secret token to prevent unauthorized calls
  const token = req.nextUrl.searchParams.get('token')
  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Find assigned tickets that haven't been quoted yet and haven't been alerted
  const { data: tickets } = await supabase
    .from('tickets')
    .select('*, paralegal:profiles!tickets_paralegal_id_fkey(full_name)')
    .eq('status', 'assigned')
    .eq('overdue_alert_sent', false)
    .not('assigned_at', 'is', null)

  if (!tickets || tickets.length === 0) {
    return NextResponse.json({ checked: 0, overdue: 0 })
  }

  let overdueCount = 0

  for (const ticket of tickets) {
    const assignedAt = new Date(ticket.assigned_at)
    const hours = elapsedBusinessHours(assignedAt)

    if (hours >= OVERDUE_HOURS) {
      overdueCount++

      // Send alert email to Hassan
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'GuidLaw <notifications@guidlaw.ca>',
          to: 'info@guidlaw.ca',
          subject: `⚠️ Overdue Ticket — ${ticket.offence_type} (${Math.floor(hours)}h elapsed)`,
          html: `
            <h2>⚠️ A ticket has not been quoted within 5 business hours</h2>
            <p><strong>Offence:</strong> ${ticket.offence_type}</p>
            <p><strong>Assigned to:</strong> ${ticket.paralegal?.full_name || 'Unknown'}</p>
            <p><strong>Assigned at:</strong> ${new Date(ticket.assigned_at).toLocaleString('en-CA', { timeZone: 'America/Toronto' })} ET</p>
            <p><strong>Business hours elapsed:</strong> ${hours.toFixed(1)} hours</p>
            <br/>
            <p>Please reassign this ticket to another paralegal.</p>
            <p>
              <a href="https://guidlaw.ca/admin/tickets" style="background:#DC2626;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:8px;font-weight:600;">
                Reassign Now →
              </a>
            </p>
            <br/>
            <p>— GuidLaw System</p>
          `,
        }),
      }).catch(() => {})

      // Mark as alerted so we don't send again
      await supabase.from('tickets')
        .update({ overdue_alert_sent: true })
        .eq('id', ticket.id)
    }
  }

  return NextResponse.json({ checked: tickets.length, overdue: overdueCount })
}
