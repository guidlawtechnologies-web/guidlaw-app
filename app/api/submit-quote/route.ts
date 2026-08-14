import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { ticketId, quoteAmount, quoteNote } = await req.json()

    // Get ticket + driver info
    const { data: ticket } = await supabase
      .from('tickets')
      .select('*, driver:profiles!tickets_driver_id_fkey(full_name), paralegal:profiles!tickets_paralegal_id_fkey(full_name)')
      .eq('id', ticketId)
      .single()

    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })

    // Update ticket with quote
    const { error } = await supabase.from('tickets')
      .update({
        quote_amount: quoteAmount,
        quote_note: quoteNote || null,
        status: 'quoted',
      })
      .eq('id', ticketId)

    if (error) return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500 })

    // Email GuidLaw so they can review and forward to driver
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'GuidLaw <notifications@guidlaw.ca>',
        to: 'info@guidlaw.ca',
        subject: `Quote Received — ${ticket.offence_type}`,
        html: `
          <h2>A paralegal has submitted a quote</h2>
          <p><strong>Paralegal:</strong> ${ticket.paralegal?.full_name || 'Unknown'}</p>
          <p><strong>Driver:</strong> ${ticket.driver?.full_name || 'Unknown'}</p>
          <p><strong>Offence:</strong> ${ticket.offence_type}</p>
          <p><strong>Quote Amount:</strong> $${quoteAmount} CAD</p>
          ${quoteNote ? `<p><strong>Note:</strong> ${quoteNote}</p>` : ''}
          <br/>
          <p>The driver has been notified in-app. You may follow up if needed.</p>
          <p>— GuidLaw System</p>
        `,
      }),
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit quote error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
