'use client'
import { useState, useEffect, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const passwordRules = [
  { label: 'At least 8 characters',        test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter (A–Z)',    test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter (a–z)',    test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number (0–9)',              test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character (!@#$…)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function ResetPasswordInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sessionReady, setSessionReady] = useState(false)
  const [sessionError, setSessionError] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const passwordValid = passwordRules.every(r => r.test(password))

  useEffect(() => {
    async function establishSession() {
      const code = searchParams.get('code')
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type') as 'recovery' | null

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          setSessionError('This reset link has expired or is invalid. Please request a new one.')
          return
        }
        setSessionReady(true)
        return
      }

      if (token_hash && type === 'recovery') {
        const { error } = await supabase.auth.verifyOtp({ type, token_hash })
        if (error) {
          setSessionError('This reset link has expired or is invalid. Please request a new one.')
          return
        }
        setSessionReady(true)
        return
      }

      // No code or token — check if session already exists (e.g. navigated here after exchange)
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setSessionReady(true)
      } else {
        setSessionError('This reset link has expired or is invalid. Please request a new one.')
      }
    }

    establishSession()
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!passwordValid) {
      setError('Please make sure your password meets all the requirements.')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    await supabase.auth.signOut()
    router.push('/login?message=Password+updated+successfully.+Please+sign+in.')
  }

  const Logo = () => (
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
  )

  // Still exchanging the code
  if (!sessionReady && !sessionError) {
    return (
      <div className="safe-top safe-bottom" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <span className="spinner" style={{ width: '28px', height: '28px' }} />
          <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-dim)' }}>Verifying your link…</p>
        </div>
      </div>
    )
  }

  // Link expired or invalid
  if (sessionError) {
    return (
      <div className="safe-top safe-bottom" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Logo />
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Link expired or invalid</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '24px', lineHeight: '1.6' }}>
              {sessionError}
            </p>
            <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%' }}>Request a New Link</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="safe-top safe-bottom" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <Logo />

        <div className="card" style={{ padding: '32px' }}>
          <p className="label" style={{ marginBottom: '8px' }}>Account recovery</p>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.4px' }}>Set a new password</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '28px', lineHeight: '1.6' }}>
            Choose a strong password for your account.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>New password</label>
              <input
                className="input"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPasswordTouched(true)}
                required
              />
              {passwordTouched && (
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {passwordRules.map(rule => {
                    const passed = rule.test(password)
                    return (
                      <div key={rule.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: passed ? '#86efac' : 'var(--text-muted)' }}>
                        <span style={{ fontSize: '11px' }}>{passed ? '✅' : '○'}</span>
                        {rule.label}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Confirm password</label>
              <input
                className="input"
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
              {confirm && password !== confirm && (
                <p style={{ fontSize: '12px', color: '#FCA5A5', marginTop: '6px' }}>Passwords do not match.</p>
              )}
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 14px', fontSize: '13px', color: '#FCA5A5' }}>
                {error}
              </div>
            )}

            <button className="btn-primary" type="submit" disabled={loading || !passwordValid || password !== confirm} style={{ marginTop: '8px' }}>
              {loading ? <span className="spinner" /> : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  )
}
