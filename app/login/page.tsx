'use client'
import { useState, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

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
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', justifyContent: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" rx="112" fill="#0A0E17"/>
            <path d="M48 460 L196 188 L316 188 L464 460 Z" fill="#141c2e"/>
            <path d="M48 460 L196 188" stroke="white" strokeWidth="18" strokeLinecap="round"/>
            <path d="M464 460 L316 188" stroke="white" strokeWidth="18" strokeLinecap="round"/>
            <line x1="256" y1="224" x2="256" y2="272" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.7"/>
            <line x1="256" y1="296" x2="256" y2="352" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.5"/>
            <line x1="256" y1="374" x2="256" y2="436" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.35"/>
            <rect x="192" y="120" width="128" height="60" rx="30" fill="#2563EB"/>
            <rect x="236" y="106" width="40" height="18" rx="9" fill="#1D4ED8"/>
            <line x1="256" y1="62" x2="256" y2="104" stroke="#60A5FA" strokeWidth="12" strokeLinecap="round" opacity="0.85"/>
            <line x1="152" y1="82" x2="178" y2="118" stroke="#2563EB" strokeWidth="10" strokeLinecap="round" opacity="0.7"/>
            <line x1="108" y1="108" x2="146" y2="132" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" opacity="0.4"/>
            <line x1="360" y1="82" x2="334" y2="118" stroke="#2563EB" strokeWidth="10" strokeLinecap="round" opacity="0.7"/>
            <line x1="404" y1="108" x2="366" y2="132" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" opacity="0.4"/>
          </svg>
          <span style={{ fontSize: '18px', fontWeight: '700' }}><span style={{ color: '#3B82F6' }}>Road</span><span style={{ color: '#E8EBF0' }}>Right</span></span>
        </Link>

        {message && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', fontSize: '14px', color: '#86efac', textAlign: 'center' }}>
            ✅ {message}
          </div>
        )}

        <div className="card" style={{ padding: '32px' }}>
          <p className="label" style={{ marginBottom: '8px' }}>Welcome back</p>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '28px', letterSpacing: '-0.4px' }}>Sign in</h1>

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

        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: 'var(--text-dim)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Sign up free</Link>
        </p>
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
