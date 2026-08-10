import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { declinedIds } = await req.json()
    const sixtySecondsAgo = new Date(Date.now() - 60 * 1000).toISOString()

    // Clean up stale unassigned calls
    await supabase
      .from('calls')
      .update({ status: 'missed' })
      .eq('status', 'requesting')
      .is('lawyer_id', null)
      .lt('created_at', sixtySecondsAgo)

    // Get the oldest unassigned requesting call (FIFO — first driver who called gets served first)
    const { data } = await supabase
      .from('calls')
      .select('*')
      .eq('status', 'requesting')
      .is('lawyer_id', null)
      .gte('created_at', sixtySecondsAgo)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    // Don't show calls this lawyer already declined
    if (data && declinedIds?.includes(data.id)) {
      return NextResponse.json({ call: null })
    }

    return NextResponse.json({ call: data || null })
  } catch (err) {
    console.error('Get incoming call error:', err)
    return NextResponse.json({ call: null })
  }
}
