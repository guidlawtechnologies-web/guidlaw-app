import Link from 'next/link'

interface GuidLawLogoProps {
  size?: number
  // 'dark' = logo on dark background (Guid white, Law teal)
  // 'light' = logo on light background (Guid dark-teal, Law light-teal)
  variant?: 'dark' | 'light'
  showWordmark?: boolean
  href?: string
  style?: React.CSSProperties
}

export function GuidLawLogo({
  size = 36,
  variant = 'dark',
  showWordmark = true,
  href = '/',
  style,
}: GuidLawLogoProps) {
  const guidColor = variant === 'dark' ? '#ffffff' : '#0d9488'
  const lawColor = '#5eead4'
  const fontSize = Math.round(size * 0.5)

  const content = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" rx="112" fill="#0d9488"/>
        <path d="M 240 224 L 256 64 L 272 224 Z" fill="white"/>
        <path d="M 240 288 L 256 448 L 272 288 Z" fill="white"/>
        <path d="M 224 240 L 64 256 L 224 272 Z" fill="white"/>
        <path d="M 288 240 L 448 256 L 288 272 Z" fill="white"/>
        <circle cx="256" cy="256" r="40" fill="white"/>
      </svg>
      {showWordmark && (
        <span style={{ fontSize, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}>
          <span style={{ color: guidColor }}>Guid</span>
          <span style={{ color: lawColor }}>Law</span>
        </span>
      )}
    </div>
  )

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  )
}
