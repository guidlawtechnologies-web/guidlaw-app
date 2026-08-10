import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.json()

  // Handle recording-ready event from Daily.co
  if (body.action === 'recording-ready') {
    const roomName = body.room_name as string
    const recordingUrl = body.recording_url as string

    if (roomName && recordingUrl) {
      // Room name format: call-{callId}
      const callId = roomName.replace('call-', '')

      await supabase.from('calls').update({ recording_url: recordingUrl }).eq('id', callId)
    }
  }

  return NextResponse.json({ ok: true })
}
