'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

        <div className="card" style={{ padding: '32px' }}>
          <p className="label" style={{ marginBottom: '8px' }}>Get started</p>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '28px', letterSpacing: '-0.4px' }}>Create your account</h1>


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
