'use client'
import { useState, useEffect, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { GuidLawLogo } from '@/components/GuidLawLogo'

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
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
      <GuidLawLogo size={38} variant="light" />
    </div>
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
