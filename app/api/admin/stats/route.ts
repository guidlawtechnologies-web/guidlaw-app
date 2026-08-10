import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function GET() {
  try {
    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

    // --- Calls ---
    const { count: totalCalls } = await supabase.from('calls').select('*', { count: 'exact', head: true })
    const { count: todayCalls } = await supabase.from('calls').select('*', { count: 'exact', head: true }).gte('created_at', todayStr)
    const { count: weeklyCalls } = await supabase.from('calls').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo)
    const { count: missedCalls } = await supabase.from('calls').select('*', { count: 'exact', head: true }).eq('status', 'missed')

    // Calls per day for last 7 days
    const { data: recentCalls } = await supabase.from('calls').select('created_at').gte('created_at', weekAgo)
    const callsByDay: Record<string, number> = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      callsByDay[d.toISOString().split('T')[0]] = 0
    }
    recentCalls?.forEach(c => {
      const day = c.created_at.split('T')[0]
      if (callsByDay[day] !== undefined) callsByDay[day]++
    })

    // --- Drivers ---
    const { count: totalDrivers } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'driver')

    // --- Tickets ---
    const { count: totalTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true })
    const { count: pendingTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'pending')
    const { count: assignedTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'assigned')
    const { count: quotedTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'quoted')
    const { count: acceptedTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'accepted')
    const { count: declinedTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'declined')
    const { count: closedTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'closed')

    // --- Lawyers ---
    const { data: lawyers } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('role', 'lawyer')

    const { data: lawyerRows } = await supabase.from('lawyers').select('id, is_available')

    // Get call counts per lawyer
    const { data: callCounts } = await supabase
      .from('calls')
      .select('lawyer_id')
      .not('lawyer_id', 'is', null)

    const callCountMap: Record<string, number> = {}
    callCounts?.forEach(c => {
      if (c.lawyer_id) callCountMap[c.lawyer_id] = (callCountMap[c.lawyer_id] || 0) + 1
    })

    // Get active ticket counts per paralegal (pending/assigned/quoted)
    const { data: activeTickets } = await supabase
      .from('tickets')
      .select('paralegal_id')
      .not('paralegal_id', 'is', null)
      .in('status', ['assigned', 'quoted'])

    const ticketCountMap: Record<string, number> = {}
    activeTickets?.forEach(t => {
      if (t.paralegal_id) ticketCountMap[t.paralegal_id] = (ticketCountMap[t.paralegal_id] || 0) + 1
    })

    // Get last sign in + email from auth (profiles table has no email column)
    const { data: authUsers } = await supabase.auth.admin.listUsers()
    const lastLoginMap: Record<string, string> = {}
    const emailMap: Record<string, string> = {}
    authUsers?.users?.forEach(u => {
      if (u.last_sign_in_at) lastLoginMap[u.id] = u.last_sign_in_at
      if (u.email) emailMap[u.id] = u.email
    })

    const lawyerAvailMap: Record<string, boolean> = {}
    lawyerRows?.forEach(l => { lawyerAvailMap[l.id] = l.is_available })

    const lawyerStats = lawyers?.map(l => ({
      id: l.id,
      full_name: l.full_name,
      email: emailMap[l.id] || '',
      is_available: lawyerAvailMap[l.id] || false,
      total_calls: callCountMap[l.id] || 0,
      active_tickets: ticketCountMap[l.id] || 0,
      last_login: lastLoginMap[l.id] || null,
    })) || []

    return NextResponse.json({
      calls: { total: totalCalls || 0, today: todayCalls || 0, week: weeklyCalls || 0, missed: missedCalls || 0, byDay: callsByDay },
      drivers: { total: totalDrivers || 0 },
      tickets: { total: totalTickets || 0, pending: pendingTickets || 0, assigned: assignedTickets || 0, quoted: quotedTickets || 0, accepted: acceptedTickets || 0, declined: declinedTickets || 0, closed: closedTickets || 0 },
      lawyers: lawyerStats,
    })
  } catch (err) {
    console.error('Admin stats error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
