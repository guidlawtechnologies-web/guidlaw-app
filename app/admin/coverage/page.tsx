'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Log = { lawyer_id: string; status: boolean; created_at: string; profiles: { full_name: string; email: string } | null }
type HourBlock = { hour: string; label: string; online: number; offline: number; hasCoverage: boolean }
type LawyerActivity = { lawyer_id: string; name: string; email: string; sessionsOnline: number; lastSeen: string | null }

export default function CoveragePage() {
  const [hourBlocks, setHourBlocks] = useState<HourBlock[]>([])
  const [lawyerActivity, setLawyerActivity] = useState<LawyerActivity[]>([])
  const [totalOnlineHours, setTotalOnlineHours] = useState(0)
  const [gapCount, setGapCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(7)
  const [tab, setTab] = useState<'coverage' | 'lawyers'>('coverage')

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true)
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
      const { data } = await supabase
        .from('availability_logs')
        .select('*, profiles(full_name, email)')
        .gte('created_at', since)
        .order('created_at', { ascending: true })

      const logData: Log[] = data || []
      buildHourBlocks(logData, days)
      buildLawyerActivity(logData)
      setLoading(false)
    }
    fetchLogs()
  }, [days])

  function buildHourBlocks(logData: Log[], dayCount: number) {
    const blocks: HourBlock[] = []
    const now = new Date()
    const totalHours = dayCount * 24

    for (let i = totalHours - 1; i >= 0; i--) {
      const hourStart = new Date(now.getTime() - i * 60 * 60 * 1000)
      hourStart.setMinutes(0, 0, 0)
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000)

      const hourLogs = logData.filter(l => {
        const t = new Date(l.created_at)
        return t >= hourStart && t < hourEnd
      })

      const wentOnline = hourLogs.filter(l => l.status === true).length
      const wentOffline = hourLogs.filter(l => l.status === false).length
      const hasCoverage = wentOnline > wentOffline || wentOnline > 0

      const dayLabel = hourStart.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })
      const timeLabel = hourStart.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: true })

      blocks.push({ hour: hourStart.toISOString(), label: `${dayLabel} ${timeLabel}`, online: wentOnline, offline: wentOffline, hasCoverage })
    }

    setHourBlocks(blocks)
    setTotalOnlineHours(blocks.filter(b => b.hasCoverage).length)
    setGapCount(blocks.filter(b => !b.hasCoverage).length)
  }

  function buildLawyerActivity(logData: Log[]) {
    const map: Record<string, LawyerActivity> = {}

    for (const log of logData) {
      const id = log.lawyer_id
      if (!map[id]) {
        map[id] = {
          lawyer_id: id,
          name: log.profiles?.full_name || 'Unknown',
          email: log.profiles?.email || '—',
          sessionsOnline: 0,
          lastSeen: null,
        }
      }
      if (log.status === true) {
        map[id].sessionsOnline += 1
        if (!map[id].lastSeen || log.created_at > map[id].lastSeen!) {
          map[id].lastSeen = log.created_at
        }
      }
    }

    const sorted = Object.values(map).sort((a, b) => b.sessionsOnline - a.sessionsOnline)
    setLawyerActivity(sorted)
  }

  const coveragePct = hourBlocks.length > 0 ? Math.round((totalOnlineHours / hourBlocks.length) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: '#06080C', color: '#E8EBF0', fontFamily: "'Outfit', sans-serif", padding: '32px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <Link href="/admin/tickets" style={{ fontSize: '12px', color: 'rgba(232,235,240,0.35)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              ← Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Coverage Dashboard</h1>
            <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.45)', marginTop: '4px' }}>When paralegals are online — and who is showing up</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 7, 14].map(d => (
              <button key={d} onClick={() => setDays(d)} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: 'none', background: days === d ? '#2563EB' : 'rgba(255,255,255,0.06)', color: days === d ? 'white' : 'rgba(232,235,240,0.5)' }}>
                {d === 1 ? 'Today' : `${d}d`}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Coverage Rate', value: loading ? '—' : `${coveragePct}%`, color: coveragePct >= 70 ? '#34D399' : coveragePct >= 40 ? '#FCD34D' : '#F87171', sub: 'of hours had a paralegal online' },
            { label: 'Hours Covered', value: loading ? '—' : `${totalOnlineHours}h`, color: '#60A5FA', sub: `out of ${hourBlocks.length} total hours` },
            { label: 'Coverage Gaps', value: loading ? '—' : `${gapCount}h`, color: gapCount === 0 ? '#34D399' : '#F87171', sub: 'hours with no lawyer online' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
              <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,235,240,0.35)', marginBottom: '8px' }}>{stat.label}</p>
              <p style={{ fontSize: '32px', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
          {([['coverage', 'Coverage Heatmap'], ['lawyers', 'Paralegal Activity']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ padding: '7px 18px', borderRadius: '7px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: 'none', background: tab === key ? '#1e293b' : 'transparent', color: tab === key ? 'white' : 'rgba(232,235,240,0.45)', transition: 'all 0.2s' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Coverage heatmap tab */}
        {tab === 'coverage' && (
          <>
            <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,235,240,0.35)', marginBottom: '16px' }}>
                Hour-by-hour — last {days === 1 ? '24 hours' : `${days} days`}
              </p>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', color: 'rgba(232,235,240,0.3)', fontSize: '13px' }}>Loading...</div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {hourBlocks.map((block, i) => (
                    <div key={i} title={`${block.label}\n${block.hasCoverage ? '✅ Covered' : '❌ No coverage'}${block.online > 0 ? `\n${block.online} went online` : ''}`}
                      style={{ width: '16px', height: '16px', borderRadius: '3px', background: block.hasCoverage ? block.online >= 2 ? '#059669' : '#34D399' : 'rgba(239,68,68,0.25)', border: block.hasCoverage ? 'none' : '1px solid rgba(239,68,68,0.3)', cursor: 'default', transition: 'transform 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.4)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                {[{ color: '#059669', label: '2+ lawyers' }, { color: '#34D399', label: '1 lawyer' }, { color: 'rgba(239,68,68,0.35)', label: 'No coverage', border: '1px solid rgba(239,68,68,0.4)' }].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: item.color, border: item.border }} />
                    <span style={{ fontSize: '11px', color: 'rgba(232,235,240,0.4)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {!loading && gapCount > 0 && (
              <div style={{ background: '#0C0F16', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '16px', padding: '24px' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.6)', marginBottom: '14px' }}>Coverage gaps</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '240px', overflowY: 'auto' }}>
                  {hourBlocks.filter(b => !b.hasCoverage).map((block, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(239,68,68,0.04)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.1)' }}>
                      <span style={{ fontSize: '13px' }}>❌</span>
                      <span style={{ fontSize: '13px', color: 'rgba(232,235,240,0.6)' }}>{block.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && gapCount === 0 && hourBlocks.length > 0 && (
              <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '20px', marginBottom: '4px' }}>✅</p>
                <p style={{ fontSize: '14px', color: '#34D399', fontWeight: '600' }}>Full coverage — no gaps in this period</p>
              </div>
            )}
          </>
        )}

        {/* Lawyer activity tab */}
        {tab === 'lawyers' && (
          <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', color: 'rgba(232,235,240,0.3)', fontSize: '13px' }}>Loading...</div>
            ) : lawyerActivity.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', color: 'rgba(232,235,240,0.3)', fontSize: '13px' }}>No activity in this period</div>
            ) : (
              <>
                {/* Table header */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 2fr', gap: '16px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Paralegal', 'Email', 'Times Online', 'Last Seen'].map(h => (
                    <span key={h} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,235,240,0.3)' }}>{h}</span>
                  ))}
                </div>
                {lawyerActivity.map((lawyer, i) => (
                  <div key={lawyer.lawyer_id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 2fr', gap: '16px', padding: '16px 20px', borderBottom: i < lawyerActivity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{lawyer.name}</span>
                    <span style={{ fontSize: '13px', color: 'rgba(232,235,240,0.55)' }}>{lawyer.email}</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#60A5FA' }}>{lawyer.sessionsOnline}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)' }}>
                      {lawyer.lastSeen
                        ? new Date(lawyer.lastSeen).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
                        : '—'}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
