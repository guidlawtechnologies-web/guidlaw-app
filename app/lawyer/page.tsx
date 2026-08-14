'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Profile = { id: string; full_name: string }
type IncomingCall = { id: string; driver_id: string; daily_room_name: string }
type AssignedTicket = { id: string; offence_type: string; court_date: string | null; notes: string | null; ticket_number: string | null; photo_url: string | null; created_at: string }
type QuoteForm = { amount: string; note: string }

export default function LawyerPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isAvailable, setIsAvailable] = useState(false)
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null)
  const [toggling, setToggling] = useState(false)
  const [todayCalls, setTodayCalls] = useState(0)
  const [weeklyCalls, setWeeklyCalls] = useState(0)
  const [totalCalls, setTotalCalls] = useState(0)
  const [assignedTickets, setAssignedTickets] = useState<AssignedTicket[]>([])
  const [quoteForms, setQuoteForms] = useState<Record<string, QuoteForm>>({})
  const [submittingQuote, setSubmittingQuote] = useState<string | null>(null)
  const [submittedQuotes, setSubmittedQuotes] = useState<string[]>([])
  const [onlineSeconds, setOnlineSeconds] = useState(0)
  const [callTaken, setCallTaken] = useState(false)
  const [declinedIds, setDeclinedIds] = useState<string[]>([])
  const userIdRef = useRef<string>('')
  const pollRef = useRef<NodeJS.Timeout | null>(null)
  const declinedIdsRef = useRef<string[]>([])
  const onlineTimerRef = useRef<NodeJS.Timeout | null>(null)
  const onlineSinceRef = useRef<number | null>(null)

  async function registerPushNotifications(lawyerId: string) {
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return
      const reg = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready
      const existing = await reg.pushManager.getSubscription()
      const subscription = existing || await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      })
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyerId, subscription }),
      })
    } catch (err) {
      console.error('Push registration error:', err)
    }
  }

  function startOnlineTimer() {
    onlineSinceRef.current = Date.now()
    onlineTimerRef.current = setInterval(() => {
      if (onlineSinceRef.current) {
        setOnlineSeconds(Math.floor((Date.now() - onlineSinceRef.current) / 1000))
      }
    }, 1000)
  }

  function stopOnlineTimer() {
    if (onlineTimerRef.current) clearInterval(onlineTimerRef.current)
    onlineSinceRef.current = null
    setOnlineSeconds(0)
  }

  function formatOnlineTime(secs: number) {
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    if (h > 0) return `${h}h ${m}m`
    if (m > 0) return `${m}m ${s}s`
    return `${s}s`
  }

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      userIdRef.current = user.id

      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!p || p.role !== 'lawyer') { router.push('/login'); return }
      setProfile(p)

      const { data: l } = await supabase.from('lawyers').select('is_available').eq('id', user.id).single()
      if (l?.is_available) {
        setIsAvailable(true)
        startOnlineTimer()
      }

      await registerPushNotifications(user.id)

      const today = new Date().toISOString().split('T')[0]
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

      const { count: todayCount } = await supabase.from('calls').select('*', { count: 'exact', head: true })
        .eq('lawyer_id', user.id).gte('created_at', today)
      setTodayCalls(todayCount || 0)

      const { count: weekCount } = await supabase.from('calls').select('*', { count: 'exact', head: true })
        .eq('lawyer_id', user.id).gte('created_at', weekAgo)
      setWeeklyCalls(weekCount || 0)

      const { count: totalCount } = await supabase.from('calls').select('*', { count: 'exact', head: true })
        .eq('lawyer_id', user.id)
      setTotalCalls(totalCount || 0)

      // Load assigned tickets
      const { data: tickets } = await supabase.from('tickets')
        .select('id, offence_type, court_date, notes, ticket_number, photo_url, created_at')
        .eq('paralegal_id', user.id)
        .eq('status', 'assigned')
        .order('created_at', { ascending: false })
      setAssignedTickets(tickets || [])

      // Poll for incoming calls
      pollRef.current = setInterval(async () => {
        const { data: lawyerRow } = await supabase.from('lawyers').select('is_available').eq('id', userIdRef.current).single()
        if (!lawyerRow?.is_available) { setIncomingCall(null); return }

        const res = await fetch('/api/get-incoming-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ declinedIds: declinedIdsRef.current }),
        })
        const { call } = await res.json()
        setIncomingCall(call || null)
      }, 2000)
    }

    init()

    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
      if (onlineTimerRef.current) clearInterval(onlineTimerRef.current)
    }
  }, [router])

  async function toggleAvailability() {
    if (!profile) return
    setToggling(true)
    const newStatus = !isAvailable
    await supabase.from('lawyers').update({ is_available: newStatus }).eq('id', profile.id)
    await supabase.from('availability_logs').insert({ lawyer_id: profile.id, status: newStatus })
    setIsAvailable(newStatus)
    if (newStatus) startOnlineTimer()
    else stopOnlineTimer()
    setToggling(false)
  }

  async function acceptCall() {
    if (!incomingCall || !profile) return
    const res = await fetch('/api/claim-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callId: incomingCall.id, lawyerId: profile.id }),
    })
    const { success } = await res.json()
    if (success) {
      router.push(`/call/${incomingCall.id}`)
    } else {
      setIncomingCall(null)
      setCallTaken(true)
      setTimeout(() => setCallTaken(false), 3000)
    }
  }

  async function declineCall() {
    if (!incomingCall) return
    const newDeclined = [...declinedIdsRef.current, incomingCall.id]
    declinedIdsRef.current = newDeclined
    setDeclinedIds(newDeclined)
    setIncomingCall(null)
  }

  async function submitQuote(ticketId: string) {
    const form = quoteForms[ticketId]
    if (!form?.amount) return
    setSubmittingQuote(ticketId)
    await fetch('/api/submit-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, quoteAmount: parseFloat(form.amount), quoteNote: form.note }),
    })
    setSubmittedQuotes(prev => [...prev, ticketId])
    setAssignedTickets(prev => prev.filter(t => t.id !== ticketId))
    setSubmittingQuote(null)
  }

  async function handleSignOut() {
    if (profile) await supabase.from('lawyers').update({ is_available: false }).eq('id', profile.id)
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'rgba(12,15,22,0.9)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <p className="label" style={{ marginBottom: '2px' }}>Lawyer Portal</p>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>{profile?.full_name || '...'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isAvailable ? (
            <span className="pill pill-green"><span className="pulse-dot" style={{ background: 'var(--safe)' }}></span>Online</span>
          ) : (
            <span className="pill" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>Offline</span>
          )}
          <button onClick={handleSignOut} className="label" style={{ cursor: 'pointer', color: 'var(--text-muted)', background: 'none', border: 'none' }}>Sign out</button>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Call taken toast */}
        {callTaken && (
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '14px 16px', fontSize: '13px', color: '#FCD34D', textAlign: 'center' as const }}>
            Another lawyer got there first — stay available for the next one.
          </div>
        )}

        {/* Incoming call alert */}
        {incomingCall && (
          <div className="incoming-alert card" style={{ padding: '20px', borderColor: 'rgba(59,130,246,0.4)', background: 'rgba(59,130,246,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="pulse-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}></span>
              <span className="label" style={{ color: 'var(--accent)' }}>Incoming call</span>
            </div>
            <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>Driver requesting assistance</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Traffic stop · Ontario</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
              <button className="btn-danger" onClick={declineCall} style={{ padding: '12px' }}>Decline</button>
              <button className="btn-primary" onClick={acceptCall} style={{ padding: '12px', background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 4px 16px rgba(5,150,105,0.4)' }}>Accept Call</button>
            </div>
          </div>
        )}

        {/* Quote submitted toast */}
        {submittedQuotes.length > 0 && (
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', padding: '14px 16px', fontSize: '13px', color: '#34D399', textAlign: 'center' as const }}>
            ✅ Quote submitted — GuidLaw will notify the driver.
          </div>
        )}

        {/* Assigned tickets banner */}
        {assignedTickets.length > 0 && (
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '16px', padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '16px' }}>⚖️</span>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#FCD34D' }}>
                {assignedTickets.length} ticket{assignedTickets.length > 1 ? 's' : ''} assigned to you
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {assignedTickets.map(ticket => (
                <div key={ticket.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px' }}>
                  {/* Ticket details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <p style={{ fontSize: '15px', fontWeight: '700' }}>{ticket.offence_type}</p>
                    {ticket.photo_url && (
                      <a href={ticket.photo_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--accent)', textDecoration: 'none', flexShrink: 0 }}>View photo →</a>
                    )}
                  </div>
                  {ticket.court_date && (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                      Court date: {new Date(ticket.court_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                  {ticket.ticket_number && (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>Ticket #: {ticket.ticket_number}</p>
                  )}
                  {ticket.notes && (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Notes: {ticket.notes}</p>
                  )}

                  {/* Quote submission form */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginTop: '8px' }}>
                    <p className="label" style={{ marginBottom: '8px', color: '#FCD34D' }}>Submit your quote</p>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '13px' }}>$</span>
                        <input
                          type="number"
                          placeholder="Amount (CAD)"
                          value={quoteForms[ticket.id]?.amount || ''}
                          onChange={e => setQuoteForms(prev => ({ ...prev, [ticket.id]: { ...prev[ticket.id], amount: e.target.value, note: prev[ticket.id]?.note || '' } }))}
                          className="input"
                          style={{ paddingLeft: '24px', fontSize: '13px', padding: '10px 10px 10px 24px' }}
                        />
                      </div>
                    </div>
                    <textarea
                      placeholder="Brief note for the driver (optional)"
                      value={quoteForms[ticket.id]?.note || ''}
                      onChange={e => setQuoteForms(prev => ({ ...prev, [ticket.id]: { ...prev[ticket.id], note: e.target.value, amount: prev[ticket.id]?.amount || '' } }))}
                      className="input"
                      rows={2}
                      style={{ fontSize: '13px', resize: 'none', marginBottom: '8px' }}
                    />
                    <button
                      onClick={() => submitQuote(ticket.id)}
                      disabled={!quoteForms[ticket.id]?.amount || submittingQuote === ticket.id}
                      className="btn-primary"
                      style={{ width: '100%', padding: '11px', fontSize: '13px' }}
                    >
                      {submittingQuote === ticket.id ? <span className="spinner" /> : 'Submit Quote'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability toggle */}
        <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
          <p className="label" style={{ marginBottom: '16px' }}>Your availability</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-dim)' }}>Off</span>
            <button
              onClick={toggleAvailability}
              disabled={toggling}
              style={{
                width: '64px', height: '34px', borderRadius: '100px', cursor: 'pointer',
                background: isAvailable ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)',
                border: isAvailable ? '1px solid rgba(16,185,129,0.5)' : '1px solid var(--border)',
                boxShadow: isAvailable ? '0 0 20px rgba(16,185,129,0.2)' : 'none',
                position: 'relative', transition: 'all 0.3s',
              }}
            >
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: isAvailable ? 'var(--safe)' : 'rgba(255,255,255,0.4)',
                boxShadow: isAvailable ? '0 0 12px var(--safe)' : 'none',
                position: 'absolute', top: '3px',
                left: isAvailable ? '33px' : '3px',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }} />
            </button>
            <span style={{ fontSize: '14px', fontWeight: '600', color: isAvailable ? 'var(--safe)' : 'var(--text-dim)' }}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            {isAvailable ? 'Drivers can see and call you right now.' : "Toggle on when you're ready to take calls."}
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="glass" style={{ borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--safe)' }}>{todayCalls}</div>
            <p className="label" style={{ marginTop: '4px' }}>Calls today</p>
          </div>
          <div className="glass" style={{ borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--accent)' }}>{weeklyCalls}</div>
            <p className="label" style={{ marginTop: '4px' }}>This week</p>
          </div>
          <div className="glass" style={{ borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: '700', color: '#C084FC' }}>{totalCalls}</div>
            <p className="label" style={{ marginTop: '4px' }}>All time</p>
          </div>
          <div className="glass" style={{ borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: isAvailable ? '20px' : '26px', fontWeight: '700', color: isAvailable ? '#FCD34D' : 'rgba(232,235,240,0.2)' }}>
              {isAvailable ? formatOnlineTime(onlineSeconds) : '—'}
            </div>
            <p className="label" style={{ marginTop: '4px' }}>Online time</p>
          </div>
        </div>

        {/* Info */}
        <div className="glass" style={{ borderRadius: '14px', padding: '16px' }}>
          <p className="label" style={{ marginBottom: '10px' }}>How calls work</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              "Toggle Available when you're ready",
              "You'll see an alert the moment a driver calls",
              'Accept to join their live video call',
              'The call auto-records to their account',
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span className="label" style={{ color: 'var(--accent)', flexShrink: 0 }}>0{i + 1}</span>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: '1.5' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="safe-bottom" style={{ paddingBottom: '8px' }} />
      </div>
    </div>
  )
}
