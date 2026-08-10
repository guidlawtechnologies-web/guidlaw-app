import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    webpush.setVapidDetails(
      process.env.VAPID_EMAIL!,
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    )
    // Get all available lawyers
    const { data: availableLawyers } = await supabase
      .from('lawyers')
      .select('id')
      .eq('is_available', true)

    if (!availableLawyers || availableLawyers.length === 0) {
      return NextResponse.json({ sent: 0 })
    }

    const lawyerIds = availableLawyers.map(l => l.id)

    // Get their push subscriptions
    const { data: subscriptions } = await supabase
      .from('push_subscriptions')
      .select('subscription')
      .in('lawyer_id', lawyerIds)

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ sent: 0 })
    }

    const payload = JSON.stringify({
      title: '🚨 Driver needs help 🚨',
      body: 'A driver has been pulled over - tap to accept the call.',
      url: '/lawyer',
    })

    // Send to all available lawyers simultaneously
    const results = await Promise.allSettled(
      subscriptions.map(({ subscription }) =>
        webpush.sendNotification(subscription, payload)
      )
    )

    const sent = results.filter(r => r.status === 'fulfilled').length
    return NextResponse.json({ sent })
  } catch (err) {
    console.error('Notify lawyers error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
