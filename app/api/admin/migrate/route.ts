import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function GET() {
  const { error } = await supabase.rpc('run_migration')
  // Fallback: try direct insert to verify column exists
  const { error: testError } = await supabase
    .from('tickets')
    .select('quote_note')
    .limit(1)

  if (testError && testError.message.includes('quote_note')) {
    return NextResponse.json({ status: 'column_missing', hint: 'Run in Supabase SQL editor: ALTER TABLE tickets ADD COLUMN IF NOT EXISTS quote_note text;' })
  }

  return NextResponse.json({ status: 'ok', message: 'quote_note column exists' })
}
