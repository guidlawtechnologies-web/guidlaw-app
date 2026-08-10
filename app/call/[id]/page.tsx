'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

type Call = { id: string; daily_room_name: string; status: string; driver_id: string; lawyer_id: string }

export default function CallPage() {
  const router = useRouter()
  const params = useParams()
  const callId = params.id as string

  const [call, setCall] = useState<Call | null>(null)
  const [roomUrl, setRoomUrl] = useState('')
  const [userId, setUserId] = useState('')
  const [userRole, setUserRole] = useState('')
  const [elapsed, setElapsed] = useState(0)

  const loadCall = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    setUserId(user.id)

    const { data: c } = await supabase.from('calls').select('*').eq('id', callId).single()
    if (!c) { router.push('/driver'); return }
    setCall(c)

    // Get user's name and role to pre-fill Daily.co and handle redirect
    const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).single()
    setUserRole(profile?.role || 'driver')
    const displayName = profile?.role === 'lawyer'
      ? `Lawyer (${profile.full_name || 'Your Lawyer'})`
      : (profile?.full_name || 'Driver')

    const domain = process.env.NEXT_PUBLIC_DAILY_DOMAIN || 'roadright-calls'
    setRoomUrl(`https://${domain}.daily.co/${c.daily_room_name}?userName=${encodeURIComponent(displayName)}`)
  }, [callId, router])

  useEffect(() => { loadCall() }, [loadCall])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  async function endCall() {
    if (!call) return
    await supabase.from('calls').update({ status: 'completed', ended_at: new Date().toISOString() }).eq('id', callId)

    // Re-enable lawyer availability
    if (call.lawyer_id) {
      await supabase.from('lawyers').update({ is_available: true }).eq('id', call.lawyer_id)
    }

    // Trigger recording save — Daily.co needs ~90s to process, so we retry a few times
    const attemptSaveRecording = async (attempt: number) => {
      if (attempt > 5) return // give up after 5 tries (~7.5 mins)
      const delay = 90000 // wait 90s between each attempt
      setTimeout(async () => {
        const res = await fetch('/api/save-recording', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callId, roomName: call.daily_room_name }),
        })
        const { success } = await res.json()
        if (!success) attemptSaveRecording(attempt + 1)
      }, delay * attempt)
    }
    attemptSaveRecording(1)

    // Determine redirect by matching userId against the call record directly
    // This is reliable even when two accounts are open on the same browser
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    const currentId = currentUser?.id || userId
    const isLawyer = currentId === call.lawyer_id
    router.push(isLawyer ? '/lawyer' : '/driver')
  }

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  if (!call || !roomUrl) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner" style={{ width: '32px', height: '32px', borderWidth: '3px' }} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050709', position: 'relative', overflow: 'hidden' }}>

      {/* Recording badge */}
      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <span className="pill pill-red">
          <span className="pulse-dot" style={{ background: '#EF4444', width: '6px', height: '6px' }}></span>
          Recording
        </span>
      </div>

      {/* Timer */}
      <div style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <span style={{ fontFamily: 'monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{formatTime(elapsed)}</span>
      </div>

      {/* Daily.co iframe — the video call */}
      <iframe
        src={roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{ position: 'absolute', inset: 0, width: '100%', height: 'calc(100% - 100px)', border: 'none' }}
        title="Video call"
      />

      {/* End call button */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px 36px', background: 'linear-gradient(to top, rgba(5,7,9,0.95) 0%, transparent 100%)', display: 'flex', justifyContent: 'center', gap: '16px', zIndex: 20 }}>
        <button
          onClick={endCall}
          style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(239,68,68,0.5)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ transform: 'rotate(135deg)' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4a2 2 0 0 1 1.99-2.18H6.6a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.94-1.48a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.4v2.52z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
