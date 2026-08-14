'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { elapsedBusinessHours } from '@/lib/businessHours'

// ─── Types ───────────────────────────────────────────────────────────────────

type Ticket = {
  id: string
  driver_id: string
  paralegal_id: string | null
  offence_type: string
  court_date: string | null
  notes: string | null
  photo_url: string | null
  status: string
  created_at: string
  assigned_at: string | null
  driver?: { full_name: string }
  paralegal?: { full_name: string }
}

type Paralegal = { id: string; full_name: string }

type Stats = {
  calls: { total: number; today: number; week: number; missed: number; byDay: Record<string, number> }
  drivers: { total: number }
  tickets: { total: number; pending: number; assigned: number; quoted: number; accepted: number; declined: number; closed: number }
  lawyers: { id: string; full_name: string; email: string; is_available: boolean; total_calls: number; active_tickets: number; last_login: string | null }[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_COLOURS: Record<string, string> = {
  pending: 'pill-amber',
  assigned: 'pill-blue',
  quoted: 'pill-green',
  accepted: 'pill-green',
  declined: 'pill-red',
  closed: 'pill-red',
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function BarChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data)
  const max = Math.max(...entries.map(([, v]) => v), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
      {entries.map(([date, count]) => {
        const d = new Date(date + 'T12:00:00')
        const label = DAYS[d.getDay()]
        const pct = (count / max) * 100
        const isToday = date === new Date().toISOString().split('T')[0]
        return (
          <div key={date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '11px', color: count > 0 ? '#E8EBF0' : 'rgba(232,235,240,0.2)', fontWeight: '600' }}>{count}</span>
            <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: isToday ? '#2563EB' : 'rgba(59,130,246,0.35)', height: `${Math.max(pct, 4)}%`, transition: 'height 0.4s ease' }} />
            <span style={{ fontSize: '10px', color: isToday ? 'rgba(232,235,240,0.7)' : 'rgba(232,235,240,0.3)', fontWeight: isToday ? '700' : '400' }}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px' }}>
      <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '8px' }}>{label}</p>
      <p style={{ fontSize: '28px', fontWeight: '800', color: color || '#E8EBF0', letterSpacing: '-0.5px' }}>{value}</p>
      {sub && <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.35)', marginTop: '4px' }}>{sub}</p>}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [tab, setTab] = useState<'overview' | 'tickets'>('overview')
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [paralegals, setParalegals] = useState<Paralegal[]>([])
  const [assigning, setAssigning] = useState<string | null>(null)
  const [selectedParalegal, setSelectedParalegal] = useState<Record<string, string>>({})
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    await Promise.all([loadTickets(), loadStats()])
    setLoading(false)
  }

  async function loadTickets() {
    const { data: t } = await supabase
      .from('tickets')
      .select('*, driver:profiles!tickets_driver_id_fkey(full_name), paralegal:profiles!tickets_paralegal_id_fkey(full_name)')
      .order('created_at', { ascending: false })
    const { data: p } = await supabase.from('profiles').select('id, full_name').eq('role', 'lawyer')
    setTickets(t || [])
    setParalegals(p || [])
  }

  async function loadStats() {
    const res = await fetch('/api/admin/stats')
    if (res.ok) setStats(await res.json())
  }

  async function assignTicket(ticketId: string) {
    const paralegalId = selectedParalegal[ticketId]
    if (!paralegalId) return
    setAssigning(ticketId)
    await fetch('/api/assign-ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, paralegalId }),
    })
    await loadAll()
    setAssigning(null)
  }

  const label = (s: string) => ({ fontSize: '11px', fontWeight: '600' as const, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)' })

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#06080C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="spinner" style={{ width: '32px', height: '32px', borderWidth: '3px' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#06080C', color: '#E8EBF0', fontFamily: "'Outfit', sans-serif", padding: '32px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '4px' }}>GuidLaw</p>
            <h1 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.3px' }}>Admin Dashboard</h1>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.3)' }}>
            {new Date().toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
          {(['overview', 'tickets'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '9px 20px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600',
              background: tab === t ? '#1D2433' : 'transparent',
              color: tab === t ? '#E8EBF0' : 'rgba(232,235,240,0.4)',
              boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
              transition: 'all 0.2s',
              fontFamily: "'Outfit', sans-serif",
            }}>
              {t === 'overview' ? '📊 Overview' : `⚖️ Tickets${tickets.filter(t => t.status === 'pending').length > 0 ? ` (${tickets.filter(t => t.status === 'pending').length})` : ''}`}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === 'overview' && stats && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '24px' }}>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <StatCard label="Total Calls" value={stats.calls.total} sub={`${stats.calls.today} today`} color="#60A5FA" />
              <StatCard label="This Week" value={stats.calls.week} sub={`${stats.calls.missed} missed`} color="#A78BFA" />
              <StatCard label="Drivers" value={stats.drivers.total} sub="registered" color="#34D399" />
              <StatCard label="Tickets" value={stats.tickets.total} sub={`${stats.tickets.pending} pending`} color="#FCD34D" />
            </div>

            {/* Calls chart + Ticket breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              {/* Call volume chart */}
              <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 24px' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Call Volume</p>
                <p style={{ fontSize: '11px', color: 'rgba(232,235,240,0.35)', marginBottom: '20px' }}>Last 7 days</p>
                <BarChart data={stats.calls.byDay} />
              </div>

              {/* Ticket breakdown */}
              <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 24px' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Ticket Pipeline</p>
                <p style={{ fontSize: '11px', color: 'rgba(232,235,240,0.35)', marginBottom: '20px' }}>By status</p>
                {stats.tickets.total === 0 ? (
                  <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.3)', textAlign: 'center', padding: '24px 0' }}>No tickets yet</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                    {[
                      { label: 'Pending', count: stats.tickets.pending, color: '#F59E0B' },
                      { label: 'Assigned', count: stats.tickets.assigned, color: '#3B82F6' },
                      { label: 'Quoted', count: stats.tickets.quoted, color: '#10B981' },
                      { label: 'Accepted', count: stats.tickets.accepted, color: '#34D399' },
                      { label: 'Declined', count: stats.tickets.declined, color: '#F87171' },
                      { label: 'Closed', count: stats.tickets.closed, color: '#EF4444' },
                    ].map(({ label, count, color }) => (
                      <div key={label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontSize: '12px', color: 'rgba(232,235,240,0.6)' }}>{label}</span>
                          <span style={{ fontSize: '12px', fontWeight: '600' }}>{count}</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(count / stats.tickets.total) * 100}%`, background: color, borderRadius: '99px', transition: 'width 0.5s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lawyer availability board */}
            <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '2px' }}>Paralegal Availability</p>
                  <p style={{ fontSize: '11px', color: 'rgba(232,235,240,0.35)' }}>
                    {stats.lawyers.filter(l => l.is_available).length} online · {stats.lawyers.filter(l => !l.is_available).length} offline
                  </p>
                </div>
                <a href="/admin/coverage" style={{ fontSize: '12px', color: '#60A5FA', textDecoration: 'none', fontWeight: '600' }}>
                  View coverage heatmap →
                </a>
              </div>

              {stats.lawyers.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.3)' }}>No paralegals onboarded yet</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
                  {/* Sort: online first */}
                  {[...stats.lawyers].sort((a, b) => Number(b.is_available) - Number(a.is_available)).map(l => {
                    const lastLoginDate = l.last_login ? new Date(l.last_login) : null
                    const minutesAgo = lastLoginDate ? Math.floor((Date.now() - lastLoginDate.getTime()) / 60000) : null
                    const lastSeenLabel = minutesAgo === null ? 'Never logged in'
                      : minutesAgo < 60 ? `${minutesAgo}m ago`
                      : minutesAgo < 1440 ? `${Math.floor(minutesAgo / 60)}h ago`
                      : lastLoginDate!.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })

                    return (
                      <div key={l.id} style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '14px 16px', borderRadius: '12px',
                        background: l.is_available ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${l.is_available ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}`,
                        flexWrap: 'wrap' as const,
                      }}>
                        {/* Avatar + status dot */}
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: l.is_available ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', fontWeight: '700',
                            color: l.is_available ? '#34D399' : 'rgba(232,235,240,0.4)',
                          }}>
                            {l.full_name.charAt(0).toUpperCase()}
                          </div>
                          <span style={{
                            position: 'absolute', bottom: '1px', right: '1px',
                            width: '9px', height: '9px', borderRadius: '50%',
                            background: l.is_available ? '#34D399' : 'rgba(232,235,240,0.2)',
                            border: '2px solid #0C0F16',
                            boxShadow: l.is_available ? '0 0 6px rgba(52,211,153,0.6)' : 'none',
                          }} />
                        </div>

                        {/* Name + email */}
                        <div style={{ flex: 1, minWidth: '120px' }}>
                          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{l.full_name}</p>
                          <p style={{ fontSize: '11px', color: 'rgba(232,235,240,0.35)' }}>{l.email}</p>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' as const }}>
                          <div style={{ textAlign: 'center' as const }}>
                            <p style={{ fontSize: '18px', fontWeight: '800', color: l.total_calls > 0 ? '#60A5FA' : 'rgba(232,235,240,0.2)', lineHeight: 1 }}>{l.total_calls}</p>
                            <p style={{ fontSize: '10px', color: 'rgba(232,235,240,0.3)', marginTop: '3px', letterSpacing: '0.05em' }}>CALLS</p>
                          </div>
                          <div style={{ textAlign: 'center' as const }}>
                            <p style={{ fontSize: '18px', fontWeight: '800', color: l.active_tickets > 0 ? '#FCD34D' : 'rgba(232,235,240,0.2)', lineHeight: 1 }}>{l.active_tickets}</p>
                            <p style={{ fontSize: '10px', color: 'rgba(232,235,240,0.3)', marginTop: '3px', letterSpacing: '0.05em' }}>TICKETS</p>
                          </div>
                          <div style={{ textAlign: 'right' as const }}>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: '5px',
                              fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '99px',
                              background: l.is_available ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.05)',
                              color: l.is_available ? '#34D399' : 'rgba(232,235,240,0.35)',
                              border: `1px solid ${l.is_available ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                            }}>
                              {l.is_available ? '● Online' : '○ Offline'}
                            </span>
                            <p style={{ fontSize: '10px', color: 'rgba(232,235,240,0.25)', marginTop: '5px' }}>Last seen: {lastSeenLabel}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ── TICKETS TAB ── */}
        {tab === 'tickets' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.45)' }}>
                {tickets.length} total · {tickets.filter(t => t.status === 'pending').length} pending · {tickets.filter(t => t.status === 'assigned' && t.assigned_at && elapsedBusinessHours(new Date(t.assigned_at)) >= 5).length > 0 ? `⚠️ ${tickets.filter(t => t.status === 'assigned' && t.assigned_at && elapsedBusinessHours(new Date(t.assigned_at)) >= 5).length} overdue` : ''}
              </p>
            </div>

            {tickets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 24px', color: 'rgba(232,235,240,0.3)' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>📭</div>
                <p>No tickets submitted yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
                {tickets.map(ticket => {
                  const isOverdue = ticket.status === 'assigned' && ticket.assigned_at && elapsedBusinessHours(new Date(ticket.assigned_at)) >= 5
                  return (
                    <div key={ticket.id} style={{ background: '#0C0F16', border: `1px solid ${isOverdue ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '16px', padding: '20px 24px' }}>

                      {/* Top row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap' as const, gap: '10px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' as const }}>
                            <span style={{ fontSize: '16px', fontWeight: '700' }}>{ticket.offence_type}</span>
                            <span className={`pill ${STATUS_COLOURS[ticket.status] || 'pill-blue'}`}>{ticket.status}</span>
                            {isOverdue && <span className="pill pill-red" style={{ fontSize: '10px' }}>⚠️ OVERDUE</span>}
                          </div>
                          <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)' }}>
                            Driver: {ticket.driver?.full_name || 'Unknown'} · {new Date(ticket.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        {ticket.photo_url && (
                          <a href={ticket.photo_url} target="_blank" rel="noopener noreferrer">
                            <img src={ticket.photo_url} alt="Ticket" style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' as const, border: '1px solid rgba(255,255,255,0.1)' }} />
                          </a>
                        )}
                      </div>

                      {/* Details */}
                      <div style={{ display: 'flex', gap: '24px', marginBottom: '14px', flexWrap: 'wrap' as const }}>
                        {ticket.court_date && (
                          <div>
                            <p style={{ fontSize: '10px', color: 'rgba(232,235,240,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '2px' }}>Court Date</p>
                            <p style={{ fontSize: '13px', fontWeight: '500' }}>{new Date(ticket.court_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                        )}
                        {ticket.notes && (
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '10px', color: 'rgba(232,235,240,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '2px' }}>Notes</p>
                            <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.6)', lineHeight: '1.5' }}>{ticket.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Assignment */}
                      {ticket.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                          <select
                            value={selectedParalegal[ticket.id] || ''}
                            onChange={e => setSelectedParalegal(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                            className="input"
                            style={{ flex: 1, fontSize: '13px', padding: '10px 12px', color: '#E8EBF0' }}
                          >
                            <option value="" style={{ background: '#0C0F16', color: '#E8EBF0' }}>Assign to paralegal...</option>
                            {paralegals.map(p => <option key={p.id} value={p.id} style={{ background: '#0C0F16', color: '#E8EBF0' }}>{p.full_name}</option>)}
                          </select>
                          <button
                            onClick={() => assignTicket(ticket.id)}
                            disabled={!selectedParalegal[ticket.id] || assigning === ticket.id}
                            className="btn-primary"
                            style={{ width: 'auto', padding: '10px 20px', fontSize: '13px' }}
                          >
                            {assigning === ticket.id ? <span className="spinner" /> : 'Assign'}
                          </button>
                        </div>
                      ) : ticket.status === 'assigned' ? (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '10px' }}>
                          <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)' }}>
                            Assigned to: <strong style={{ color: '#E8EBF0' }}>{ticket.paralegal?.full_name || 'Unknown'}</strong>
                            {ticket.assigned_at && <span style={{ marginLeft: '8px', color: 'rgba(232,235,240,0.25)' }}>· {elapsedBusinessHours(new Date(ticket.assigned_at)).toFixed(1)}h elapsed</span>}
                          </p>
                          {/* Reassign option */}
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <select
                              value={selectedParalegal[ticket.id] || ''}
                              onChange={e => setSelectedParalegal(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                              className="input"
                              style={{ fontSize: '12px', padding: '7px 10px', color: '#E8EBF0' }}
                            >
                              <option value="" style={{ background: '#0C0F16', color: '#E8EBF0' }}>Reassign...</option>
                              {paralegals.map(p => <option key={p.id} value={p.id} style={{ background: '#0C0F16', color: '#E8EBF0' }}>{p.full_name}</option>)}
                            </select>
                            <button
                              onClick={() => assignTicket(ticket.id)}
                              disabled={!selectedParalegal[ticket.id] || assigning === ticket.id}
                              className="btn-primary"
                              style={{ width: 'auto', padding: '7px 14px', fontSize: '12px' }}
                            >
                              {assigning === ticket.id ? <span className="spinner" /> : 'Reassign'}
                            </button>
                          </div>
                        </div>
                      ) : ticket.status === 'accepted' ? (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '8px' }}>
                          <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)' }}>
                            Assigned to: <strong style={{ color: '#E8EBF0' }}>{ticket.paralegal?.full_name || 'Unknown'}</strong>
                          </p>
                          <span style={{ fontSize: '12px', color: '#34D399', fontWeight: '600' }}>✅ Driver accepted quote</span>
                        </div>
                      ) : ticket.status === 'declined' ? (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '8px' }}>
                          <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)' }}>
                            Assigned to: <strong style={{ color: '#E8EBF0' }}>{ticket.paralegal?.full_name || 'Unknown'}</strong>
                          </p>
                          <span style={{ fontSize: '12px', color: '#FCA5A5', fontWeight: '600' }}>❌ Driver declined quote</span>
                        </div>
                      ) : (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                          <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)' }}>
                            Assigned to: <strong style={{ color: '#E8EBF0' }}>{ticket.paralegal?.full_name || 'Unknown'}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
