// ─── GuidLaw Logo Components ─────────────────────────────────────────────────
//
// Usage:
//   import { LogoIcon, LogoFull } from '@/components/Logo'
//
//   <LogoIcon size={48} />          ← square icon only
//   <LogoFull height={40} />        ← icon + "GuidLaw" wordmark

// ─── Icon (compass on teal square) ───────────────────────────────────────────

export function LogoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GuidLaw"
    >
      {/* Background */}
      <rect width="512" height="512" rx="112" fill="#0d9488" />
      {/* Compass — north */}
      <path d="M 240 224 L 256 64 L 272 224 Z" fill="white" />
      {/* Compass — south */}
      <path d="M 240 288 L 256 448 L 272 288 Z" fill="white" />
      {/* Compass — west */}
      <path d="M 224 240 L 64 256 L 224 272 Z" fill="white" />
      {/* Compass — east */}
      <path d="M 288 240 L 448 256 L 288 272 Z" fill="white" />
      {/* Centre */}
      <circle cx="256" cy="256" r="40" fill="white" />
    </svg>
  )
}

// ─── Full logo (icon + wordmark) ─────────────────────────────────────────────

export function LogoFull({ height = 40 }: { height?: number }) {
  const width = height * 4.8 // preserves 960:200 aspect ratio
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 960 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GuidLaw"
    >
      {/* Icon background */}
      <rect width="200" height="200" rx="44" fill="#0d9488" />
      {/* Compass — north */}
      <path d="M 94 88 L 100 25 L 106 88 Z" fill="white" />
      {/* Compass — south */}
      <path d="M 94 112 L 100 175 L 106 112 Z" fill="white" />
      {/* Compass — west */}
      <path d="M 88 94 L 25 100 L 88 106 Z" fill="white" />
      {/* Compass — east */}
      <path d="M 112 94 L 175 100 L 112 106 Z" fill="white" />
      {/* Centre */}
      <circle cx="100" cy="100" r="16" fill="white" />
      {/* Wordmark */}
      <text
        x="230"
        y="142"
        fontFamily="system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
        fontSize="100"
        fontWeight="700"
        letterSpacing="-2"
      >
        <tspan fill="#ffffff">Guid</tspan>
        <tspan fill="#5eead4">Law</tspan>
      </text>
    </svg>
  )
}
