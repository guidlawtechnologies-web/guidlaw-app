'use client'
import { useEffect, useState, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

function ConfirmInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'error'>('loading')

  useEffect(() => {
    async function confirm() {
      const code = searchParams.get('code')
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type') as 'email' | 'recovery' | 'invite' | null
      const next = searchParams.get('next')

      const successUrl = next === 'reset'
        ? '/reset-password'
        : '/login?message=Your+email+has+been+verified.+You+can+now+sign+in.'

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.replace(successUrl)
          return
        }
      }

      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ type, token_hash })
        if (!error) {
          router.replace(successUrl)
          return
        }
      }

      setStatus('error')
    }

    confirm()
  }, [searchParams, router])

  if (status === 'error') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Link expired or invalid</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '24px' }}>
            This confirmation link has expired. Please sign up again to get a new one.
          </p>
          <a href="/signup" style={{ color: 'var(--accent)', fontWeight: '500' }}>Back to Sign Up</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <span className="spinner" style={{ width: '28px', height: '28px' }} />
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-dim)' }}>Confirming your email…</p>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmInner />
    </Suspense>
  )
}
