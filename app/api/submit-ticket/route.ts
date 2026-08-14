import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const driverId = formData.get('driverId') as string
    const offenceType = formData.get('offenceType') as string
    const courtDate = formData.get('courtDate') as string
    const notes = formData.get('notes') as string
    const ticketNumber = formData.get('ticketNumber') as string
    const photo = formData.get('photo') as File | null

    let photoUrl = null

    // Upload photo to Supabase Storage if provided
    if (photo && photo.size > 0) {
      const fileExt = photo.name.split('.').pop()
      const fileName = `${driverId}-${Date.now()}.${fileExt}`
      const arrayBuffer = await photo.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from('tickets')
        .upload(fileName, buffer, { contentType: photo.type })

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('tickets').getPublicUrl(fileName)
        photoUrl = urlData.publicUrl
      }
    }

    // Save ticket to database
    const { data: ticket, error } = await supabase.from('tickets').insert({
      driver_id: driverId,
      offence_type: offenceType,
      court_date: courtDate || null,
      notes: notes || null,
      photo_url: photoUrl,
      ticket_number: ticketNumber || null,
      status: 'pending',
    }).select().single()

    if (error) {
      console.error('Ticket insert error:', error)
      return NextResponse.json({ error: 'Failed to submit ticket' }, { status: 500 })
    }

    // ── AUTO-ASSIGN ──────────────────────────────────────────────────────────
    // If this driver had a call with a paralegal in the last 7 days,
    // assign the ticket to that paralegal automatically.
    let autoAssignedParalegal: { id: string; email: string; full_name: string } | null = null

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data: recentCall } = await supabase
      .from('calls')
      .select('lawyer_id, started_at')
      .eq('driver_id', driverId)
      .not('lawyer_id', 'is', null)
      .gte('started_at', sevenDaysAgo)
      .order('started_at', { ascending: false })
      .limit(1)
      .single()

    if (recentCall?.lawyer_id) {
      // Look up the paralegal's profile
      const { data: paralegal } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('id', recentCall.lawyer_id)
        .single()

      if (paralegal) {
        // Auto-assign the ticket
        await supabase.from('tickets').update({
          paralegal_id: paralegal.id,
          status: 'assigned',
          assigned_at: new Date().toISOString(),
        }).eq('id', ticket.id)

        autoAssignedParalegal = paralegal

        // Notify the paralegal
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'GuidLaw <notifications@guidlaw.ca>',
            to: paralegal.email,
            subject: `Ticket Auto-Assigned to You — ${offenceType}`,
            html: `
              <h2>A ticket has been assigned to you</h2>
              <p>A driver you assisted recently has submitted a ticket — it's been automatically assigned to you.</p>
              <p><strong>Offence:</strong> ${offenceType}</p>
              <p><strong>Court Date:</strong> ${courtDate || 'Not provided'}</p>
              <p><strong>Notes:</strong> ${notes || 'None'}</p>
              ${photoUrl ? `<p><strong>Ticket Photo:</strong> <a href="${photoUrl}">View</a></p>` : ''}
              ${ticketNumber ? `<p><strong>Ticket #:</strong> ${ticketNumber}</p>` : ''}
              <br/>
              <p><a href="https://guidlaw.ca/lawyer" style="background:#2563EB;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:600;">Review &amp; Submit Quote →</a></p>
              <br/>
              <p>— GuidLaw Team</p>
            `,
          }),
        }).catch(() => {})
      }
    }
    // ────────────────────────────────────────────────────────────────────────

    // Email notification to GuidLaw admin
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'GuidLaw <notifications@guidlaw.ca>',
        to: 'info@guidlaw.ca',
        subject: `New Ticket Submitted — ${offenceType}${autoAssignedParalegal ? ' (Auto-Assigned)' : ''}`,
        html: `
          <h2>New Ticket Submission</h2>
          ${autoAssignedParalegal
            ? `<p style="color:#16a34a;font-weight:600;">✅ Auto-assigned to ${autoAssignedParalegal.full_name} (previous call within 7 days)</p>`
            : `<p style="color:#d97706;font-weight:600;">⏳ Unassigned — no recent call found. Manual assignment needed.</p>`
          }
          <p><strong>Offence:</strong> ${offenceType}</p>
          <p><strong>Court Date:</strong> ${courtDate || 'Not provided'}</p>
          <p><strong>Notes:</strong> ${notes || 'None'}</p>
          <p><strong>Photo:</strong> ${photoUrl ? `<a href="${photoUrl}">View photo</a>` : 'None'}</p>
          <p><strong>Ticket ID:</strong> ${ticket.id}</p>
          <br/>
          <p><a href="https://guidlaw.ca/admin/tickets">Review in dashboard →</a></p>
        `,
      }),
    }).catch(() => {}) // Don't block if email fails

    return NextResponse.json({
      success: true,
      ticketId: ticket.id,
      autoAssigned: !!autoAssignedParalegal,
    })
  } catch (err) {
    console.error('Submit ticket error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
