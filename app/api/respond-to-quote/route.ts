import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { ticketId, driverId, response } = await req.json()

    if (!ticketId || !driverId || !['accepted', 'declined'].includes(response)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Verify this ticket belongs to this driver and is in 'quoted' status
    const { data: ticket, error: fetchError } = await supabase
      .from('tickets')
      .select('*, driver:profiles!tickets_driver_id_fkey(full_name), paralegal:profiles!tickets_paralegal_id_fkey(full_name)')
      .eq('id', ticketId)
      .eq('driver_id', driverId)
      .eq('status', 'quoted')
      .single()

    if (fetchError || !ticket) {
      return NextResponse.json({ error: 'Ticket not found or already responded to' }, { status: 404 })
    }

    // Update ticket status
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ status: response })
      .eq('id', ticketId)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 })
    }

    // Notify admin
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'GuidLaw <notifications@guidlaw.ca>',
        to: 'info@guidlaw.ca',
        subject: `Quote ${response === 'accepted' ? '✅ Accepted' : '❌ Declined'} — ${ticket.offence_type}`,
        html: `
          <h2>Quote ${response === 'accepted' ? 'Accepted' : 'Declined'}</h2>
          <p><strong>Driver:</strong> ${ticket.driver?.full_name || 'Unknown'}</p>
          <p><strong>Offence:</strong> ${ticket.offence_type}</p>
          <p><strong>Assigned to:</strong> ${ticket.paralegal?.full_name || 'Unknown'}</p>
          <p><strong>Quote Amount:</strong> $${ticket.quote_amount} CAD</p>
          ${ticket.quote_note ? `<p><strong>Quote Note:</strong> ${ticket.quote_note}</p>` : ''}
          <br/>
          <p><a href="https://guidlaw.ca/admin/tickets">View in dashboard →</a></p>
        `,
      }),
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Respond to quote error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
