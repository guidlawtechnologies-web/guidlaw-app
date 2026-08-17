'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GuidLawLogo } from '@/components/GuidLawLogo'

const passwordRules = [
  { label: 'At least 8 characters',       test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter (A–Z)',   test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter (a–z)',   test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number (0–9)',             test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character (!@#$…)',test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [role] = useState<'driver' | 'lawyer'>('driver')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const passwordValid = passwordRules.every(r => r.test(password))

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!passwordValid) {
      setError('Please make sure your password meets all the requirements below.')
      setLoading(false)
      return
    }

    // If Supabase processes the signup but the HTTP response hangs (common on
    // free tier), show the verification screen after 5 seconds anyway —
    // the email will have already been sent on their end.
    const fallbackTimer = setTimeout(() => {
      setEmailSent(true)
      setLoading(false)
    }, 5000)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role },
          emailRedirectTo: 'https://guidlaw.ca/auth/callback',
        }
      })

      clearTimeout(fallbackTimer)

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // data.user can be null if email already confirmed — show email screen either way
      if (!data.user) {
        setEmailSent(true)
        setLoading(false)
        return
      }

      // identities empty = email exists but unconfirmed, resend the link
      if (data.user.identities && data.user.identities.length === 0) {
        await supabase.auth.resend({
          type: 'signup',
          email,
          options: { emailRedirectTo: 'https://guidlaw.ca/auth/callback' }
        })
        setEmailSent(true)
        setLoading(false)
        return
      }

      // Profile created by Supabase trigger. If session exists go straight in.
      if (data.session) {
        router.push(role === 'lawyer' ? '/lawyer' : '/driver')
      } else {
        setEmailSent(true)
        setLoading(false)
      }
    } catch {
      clearTimeout(fallbackTimer)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="safe-top safe-bottom" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 24px' }}>📧</div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Verify your email address</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.7', marginBottom: '8px' }}>
            We sent a verification link to <strong style={{ color: 'var(--text)' }}>{email}</strong>
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
            Click the link in the email to activate your account, then come back here to sign in. Check your spam folder if you don't see it.
          </p>
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%' }}>Sign In</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="safe-top safe-bottom" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <GuidLawLogo size={38} variant="light" />
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <p className="label" style={{ marginBottom: '8px' }}>Existing clients</p>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', letterSpacing: '-0.4px' }}>Set up your account</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '22px' }}>
            For clients who have already retained us — this is where you&apos;ll track your case.
            To just have a ticket looked at,{' '}
            <a href="/submit-ticket" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              send it to us instead
            </a>{' '}
            — no account needed.
          </p>


          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Full name</label>
              <input className="input" type="text" placeholder="Your name" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
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

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 14px', fontSize: '13px', color: '#FCA5A5' }}>
                {error}
              </div>
            )}

            <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: '8px' }}>
              {loading ? <span className="spinner" /> : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-dim)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
