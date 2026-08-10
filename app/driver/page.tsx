'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Profile = { id: string; full_name: string; role: string }
type Call = { id: string; created_at: string; status: string; recording_url: string | null; lawyer_id: string | null }
type QuotedTicket = { id: string; offence_type: string; quote_amount: number; quote_note: string | null }
type RespondedTicket = { id: string; offence_type: string; response: 'accepted' | 'declined' }

export default function DriverPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [calls, setCalls] = useState<Call[]>([])
  const [quotedTickets, setQuotedTickets] = useState<QuotedTicket[]>([])
  const [respondedTickets, setRespondedTickets] = useState<RespondedTicket[]>([])
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const [askingQuestion, setAskingQuestion] = useState<string | null>(null)
  const [questionText, setQuestionText] = useState<Record<string, string>>({})
  const [questionSent, setQuestionSent] = useState<string[]>([])
  const [callStatus, setCallStatus] = useState<'idle' | 'searching' | 'requesting' | 'connecting'>('idle')
  const [error, setError] = useState('')
  const [lawyersOnline, setLawyersOnline] = useState<boolean | null>(null)

  const loadProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!p || p.role !== 'driver') { router.push('/login'); return }
    setProfile(p)

    const { data: c } = await supabase.from('calls').select('*').eq('driver_id', user.id).order('created_at', { ascending: false }).limit(10)
    setCalls(c || [])

    const { data: qt } = await supabase.from('tickets').select('id, offence_type, quote_amount, quote_note')
      .eq('driver_id', user.id).eq('status', 'quoted')
    setQuotedTickets(qt || [])

    // Check lawyer coverage on load
    const { data: lawyers } = await supabase.from('lawyers').select('id').eq('is_available', true).limit(1)
    setLawyersOnline(!!(lawyers && lawyers.length > 0))
  }, [router])

  useEffect(() => { loadProfile() }, [loadProfile])

  // Re-check lawyer coverage every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data: lawyers } = await supabase.from('lawyers').select('id').eq('is_available', true).limit(1)
      setLawyersOnline(!!(lawyers && lawyers.length > 0))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  async function callLawyer() {
    setError('')
    setCallStatus('searching')

    // Check if any lawyers are available (quick UX feedback)
    const { data: lawyers } = await supabase.from('lawyers').select('id').eq('is_available', true).limit(1)

    if (!lawyers || lawyers.length === 0) {
      setError('Sorry, we were unable to connect you with a legal professional. Please try again.')
      setCallStatus('idle')
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setCallStatus('requesting')

    // Create call — broadcast to all available lawyers, no assignment yet
    const res = await fetch('/api/create-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driverId: user.id })
    })

    if (!res.ok) {
      setError('Something went wrong. Please try again.')
      setCallStatus('idle')
      return
    }

    const { callId } = await res.json()
    setCallStatus('connecting')

    // Poll every 2 seconds to check if lawyer accepted
    const startTime = Date.now()
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('calls')
        .select('status')
        .eq('id', callId)
        .single()

      if (data?.status === 'active') {
        clearInterval(poll)
        router.push(`/call/${callId}`)
      } else if (data?.status === 'missed') {
        clearInterval(poll)
        setError('Sorry, we were unable to connect you with a legal professional. Please try again.')
        setCallStatus('idle')
      } else if (Date.now() - startTime > 60000) {
        clearInterval(poll)
        setError('Sorry, we were unable to connect you with a legal professional. Please try again.')
        setCallStatus('idle')
      }
    }, 2000)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function respondToQuote(ticketId: string, response: 'accepted' | 'declined') {
    if (!profile) return
    setRespondingTo(ticketId + response)
    const res = await fetch('/api/respond-to-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, driverId: profile.id, response }),
    })
    if (res.ok) {
      const ticket = quotedTickets.find(t => t.id === ticketId)
      if (ticket) {
        setRespondedTickets(prev => [...prev, { id: ticketId, offence_type: ticket.offence_type, response }])
        setQuotedTickets(prev => prev.filter(t => t.id !== ticketId))
      }
    }
    setRespondingTo(null)
  }

  async function sendQuestion(ticketId: string, offenceType: string) {
    const question = questionText[ticketId]?.trim()
    if (!question || !profile) return
    setRespondingTo(ticketId + 'question')
    await fetch('/api/driver-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, driverName: profile.full_name, offenceType, question }),
    }).catch(() => {})
    setQuestionSent(prev => [...prev, ticketId])
    setAskingQuestion(null)
    setRespondingTo(null)
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="app-shell" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'rgba(12,15,22,0.9)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <p className="label" style={{ marginBottom: '2px' }}>Good day</p>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>{firstName}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="pill pill-green">
            <span className="pulse-dot" style={{ background: 'var(--safe)', boxShadow: '0 0 6px var(--safe)' }}></span>
            Protected
          </span>
          <button onClick={handleSignOut} className="label" style={{ cursor: 'pointer', color: 'var(--text-muted)', background: 'none', border: 'none' }}>Sign out</button>
        </div>
      </div>

      {/* Quote ready banners */}
      {quotedTickets.map(qt => (
        <div key={qt.id} style={{ background: 'rgba(16,185,129,0.08)', borderBottom: '1px solid rgba(16,185,129,0.2)', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>💬</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#34D399', marginBottom: '4px' }}>Quote ready — {qt.offence_type}</p>
              <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.7)', marginBottom: '12px' }}>
                A legal professional has quoted <strong style={{ color: '#E8EBF0' }}>${qt.quote_amount} CAD</strong> to fight your ticket.
                {qt.quote_note && <span style={{ color: 'rgba(232,235,240,0.55)' }}> "{qt.quote_note}"</span>}
              </p>
              {questionSent.includes(qt.id) ? (
                <p style={{ fontSize: '12px', color: '#60A5FA', marginTop: '4px' }}>✉️ Question sent — we'll follow up shortly.</p>
              ) : askingQuestion === qt.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <textarea
                    autoFocus
                    placeholder="What would you like to know? (e.g. What are my chances? Can you lower the price?)"
                    value={questionText[qt.id] || ''}
                    onChange={e => setQuestionText(prev => ({ ...prev, [qt.id]: e.target.value }))}
                    className="input"
                    rows={3}
                    style={{ fontSize: '13px', resize: 'none' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                    <button
                      onClick={() => setAskingQuestion(null)}
                      style={{ padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(232,235,240,0.5)', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => sendQuestion(qt.id, qt.offence_type)}
                      disabled={!questionText[qt.id]?.trim() || respondingTo !== null}
                      className="btn-primary"
                      style={{ padding: '10px', fontSize: '13px' }}
                    >
                      {respondingTo === qt.id + 'question' ? <span className="spinner" style={{ width: '14px', height: '14px' }} /> : 'Send Question'}
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                  <button
                    onClick={() => setAskingQuestion(qt.id)}
                    disabled={respondingTo !== null}
                    style={{ padding: '10px', borderRadius: '10px', border: '1px solid rgba(96,165,250,0.3)', background: 'rgba(96,165,250,0.06)', color: '#60A5FA', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Ask a Question
                  </button>
                  <button
                    onClick={() => respondToQuote(qt.id, 'accepted')}
                    disabled={respondingTo !== null}
                    className="btn-primary"
                    style={{ padding: '10px', fontSize: '13px', background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 4px 12px rgba(5,150,105,0.3)' }}
                  >
                    {respondingTo === qt.id + 'accepted' ? <span className="spinner" style={{ width: '14px', height: '14px' }} /> : 'Accept Quote'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Response confirmation banners */}
      {respondedTickets.map(rt => (
        <div key={rt.id} style={{ background: rt.response === 'accepted' ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${rt.response === 'accepted' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.08)'}`, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>{rt.response === 'accepted' ? '✅' : '👋'}</span>
          <p style={{ fontSize: '13px', color: rt.response === 'accepted' ? '#34D399' : 'rgba(232,235,240,0.5)' }}>
            {rt.response === 'accepted'
              ? `Quote accepted for ${rt.offence_type} — we'll be in touch shortly.`
              : `Quote declined for ${rt.offence_type}.`}
          </p>
        </div>
      ))}

      {/* No coverage banner */}
      {lawyersOnline === false && (
        <div style={{ background: 'rgba(245,158,11,0.08)', borderBottom: '1px solid rgba(245,158,11,0.2)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <p style={{ fontSize: '13px', color: '#FCD34D', lineHeight: '1.5' }}>
            Sorry, no legal professionals are available to connect right now.
          </p>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>

        {/* Call button section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
          <p className="label" style={{ marginBottom: '32px', textAlign: 'center' }}>
            {callStatus === 'idle' && 'Pulled over or in an accident?'}
            {callStatus === 'searching' && 'Finding an available lawyer...'}
            {callStatus === 'requesting' && 'Connecting you...'}
            {callStatus === 'connecting' && 'Waiting for lawyer to accept...'}
          </p>

          <button
            onClick={callLawyer}
            disabled={callStatus !== 'idle'}
            className={callStatus === 'idle' ? 'call-btn-ring' : ''}
            style={{
              width: '190px', height: '190px', borderRadius: '50%',
              background: callStatus !== 'idle' ? 'linear-gradient(135deg, #1e3a8a, #1e40af)' : 'radial-gradient(circle at 35% 35%, #2563EB, #1D4ED8)',
              border: '2px solid rgba(59,130,246,0.5)',
              boxShadow: callStatus === 'idle' ? '0 20px 60px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.15)' : 'none',
              cursor: callStatus !== 'idle' ? 'not-allowed' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'all 0.3s',
              opacity: callStatus !== 'idle' ? 0.7 : 1,
            }}
          >
            {callStatus === 'idle' ? (
              <>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4a2 2 0 0 1 1.99-2.18H6.6a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.94-1.48a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.4v2.52z"/>
                </svg>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.03em' }}>Call a Lawyer</span>
              </>
            ) : (
              <span className="spinner" style={{ width: '32px', height: '32px', borderWidth: '3px' }} />
            )}
          </button>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '24px', textAlign: 'center', lineHeight: '1.6' }}>
            A licensed Ontario lawyer<br />will join in seconds
          </p>

          {error && (
            <div style={{ marginTop: '20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '14px 16px', fontSize: '13px', color: '#FCA5A5', textAlign: 'center', maxWidth: '280px' }}>
              {error}
            </div>
          )}
        </div>

        {/* Fight a Ticket — submit a ticket for paralegal review */}
        <div style={{ marginBottom: '24px' }}>
          <Link href="/submit-ticket" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '16px', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '24px' }}>⚖️</span>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}>Got a ticket?</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>Submit it — we'll get a legal professional to review your case</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(232,235,240,0.3)" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </Link>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span className="label">How it works</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
          </div>
          <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { step: '01', text: 'Press the button' },
              { step: '02', text: 'Lawyer joins live' },
              { step: '03', text: 'Recording saved' },
            ].map(({ step, text }) => (
              <div key={step} className="glass" style={{ borderRadius: '12px', padding: '14px 12px', textAlign: 'center' }}>
                <p className="label" style={{ color: 'var(--accent)', marginBottom: '6px' }}>{step}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: '1.4' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Past calls */}
        {calls.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span className="label">Recent calls</span>
              <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {calls.slice(0, 5).map((call) => (
                <div key={call.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: call.status === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${call.status === 'completed' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={call.status === 'completed' ? '#34D399' : '#FCD34D'} strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: '500' }}>{new Date(call.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="label">{call.status}</p>
                  </div>
                  {call.recording_url && (
                    <a href={call.recording_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>View</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* iOS safe area spacer */}
        <div className="safe-bottom" style={{ paddingBottom: '16px' }} />
      </div>
    </div>
  )
}
