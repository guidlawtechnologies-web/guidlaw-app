import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { ticketId, driverName, offenceType, question } = await req.json()

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'GuidLaw <notifications@guidlaw.ca>',
        to: 'info@guidlaw.ca',
        subject: `❓ Driver Question — ${offenceType}`,
        html: `
          <h2>A driver has a question about their quote</h2>
          <p><strong>Driver:</strong> ${driverName}</p>
          <p><strong>Offence:</strong> ${offenceType}</p>
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
          <br/>
          <blockquote style="border-left: 3px solid #2563EB; padding-left: 16px; color: #374151;">
            "${question}"
          </blockquote>
          <br/>
          <p>Reply to this email or follow up with the driver directly.</p>
          <p><a href="https://guidlaw.ca/admin/tickets">View in dashboard →</a></p>
        `,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Driver question error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
