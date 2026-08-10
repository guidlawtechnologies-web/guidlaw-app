import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { lawyerId, subscription } = await req.json()
    if (!lawyerId || !subscription) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    // Upsert — update if exists, insert if not
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({ lawyer_id: lawyerId, subscription }, { onConflict: 'lawyer_id' })

    if (error) {
      console.error('Subscribe error:', error)
      return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
