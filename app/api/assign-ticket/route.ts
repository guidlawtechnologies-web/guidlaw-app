import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { ticketId, paralegalId } = await req.json()

    // Get ticket details
    const { data: ticket } = await supabase.from('tickets').select('*').eq('id', ticketId).single()
    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })

    // Get paralegal details
    const { data: paralegal } = await supabase.from('profiles').select('*').eq('id', paralegalId).single()
    if (!paralegal) return NextResponse.json({ error: 'Paralegal not found' }, { status: 404 })

    // Assign ticket
    const { error } = await supabase.from('tickets')
      .update({ paralegal_id: paralegalId, status: 'assigned', assigned_at: new Date().toISOString() })
      .eq('id', ticketId)

    if (error) return NextResponse.json({ error: 'Failed to assign' }, { status: 500 })

    // Email notification to paralegal
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'RoadRight <notifications@roadright.ca>',
        to: paralegal.email,
        subject: `New Ticket Assigned — ${ticket.offence_type}`,
        html: `
          <h2>You've been assigned a new ticket</h2>
          <p><strong>Offence:</strong> ${ticket.offence_type}</p>
          <p><strong>Court Date:</strong> ${ticket.court_date || 'Not provided'}</p>
          <p><strong>Notes:</strong> ${ticket.notes || 'None'}</p>
          ${ticket.photo_url ? `<p><strong>Ticket Photo:</strong> <a href="${ticket.photo_url}">View</a></p>` : ''}
          ${ticket.ticket_number ? `<p><strong>Ticket #:</strong> ${ticket.ticket_number}</p>` : ''}
          <br/>
          <p>Please review the ticket and submit your quote directly in the RoadRight app.</p>
          <p><a href="https://roadright.ca/lawyer" style="background:#2563EB;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:8px;font-weight:600;">Open App & Submit Quote →</a></p>
          <br/>
          <p>— RoadRight Team</p>
        `,
      }),
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Assign ticket error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
