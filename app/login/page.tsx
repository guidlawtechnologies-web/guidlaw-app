'use client'
import { useState, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { GuidLawLogo } from '@/components/GuidLawLogo'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Get user role and redirect
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'lawyer') {
      router.push('/lawyer')
    } else {
      router.push('/driver')
    }
  }

  return (
    <div className="safe-top safe-bottom" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <GuidLawLogo size={38} variant="light" />
        </div>

        {message && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', fontSize: '14px', color: '#86efac', textAlign: 'center' }}>
            ✅ {message}
          </div>
        )}

        <div className="card" style={{ padding: '32px' }}>
          <p className="label" style={{ marginBottom: '8px' }}>Existing clients</p>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', letterSpacing: '-0.4px' }}>Sign in to your case</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '24px' }}>
            This is for clients who have already retained us. You don&apos;t need an account to send
            us a ticket.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 14px', fontSize: '13px', color: '#FCA5A5' }}>
                {error}
              </div>
            )}

            <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: '8px' }}>
              {loading ? <span className="spinner" /> : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
          <Link href="/forgot-password" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Forgot your password?</Link>
        </p>

        <div style={{ marginTop: '24px', padding: '18px 20px', background: '#faf8f2', border: '1px solid #eae7dd', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 600, marginBottom: '4px' }}>
            Haven&apos;t sent us your ticket yet?
          </p>
          <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '12px' }}>
            You don&apos;t need an account for that. Send it over and we&apos;ll review it free —
            we&apos;ll set you up with a login once we&apos;re working on your case.
          </p>
          <Link href="/submit-ticket" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
            Send us your ticket →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
