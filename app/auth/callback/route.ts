import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? ''

  if (code) {
    // Password reset — send code directly to reset page (skips /auth/confirm)
    if (next === 'reset') {
      return NextResponse.redirect(`${origin}/reset-password?code=${code}`)
    }
    // Email verification — exchange code client-side so session lands in localStorage
    return NextResponse.redirect(`${origin}/auth/confirm?code=${code}`)
  }

  if (token_hash && type) {
    const params = next ? `token_hash=${token_hash}&type=${type}&next=${next}` : `token_hash=${token_hash}&type=${type}`
    return NextResponse.redirect(`${origin}/auth/confirm?${params}`)
  }

  return NextResponse.redirect(`${origin}/login?message=Email+confirmed!+You+can+now+sign+in.`)
}
