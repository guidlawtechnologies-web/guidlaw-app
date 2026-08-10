import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { callId, lawyerId } = await req.json()

    // Atomic claim — only succeeds if call is still unassigned and requesting
    const { data, error } = await supabase
      .from('calls')
      .update({
        lawyer_id: lawyerId,
        status: 'active',
        started_at: new Date().toISOString(),
      })
      .eq('id', callId)
      .eq('status', 'requesting')
      .is('lawyer_id', null)
      .select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // If no rows updated, another lawyer claimed it first
    const success = data && data.length > 0
    return NextResponse.json({ success })
  } catch (err) {
    console.error('Claim call error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
