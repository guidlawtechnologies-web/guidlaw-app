import Link from 'next/link'

const Logo = () => (
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
    <line x1="360" y1="82" x2="334" y2="118" stroke="#2563EB" strokeWidth="10" strokeLinecap="round" opacity="0.7"/>
  </svg>
)

export default function InstallPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#06080C', color: '#E8EBF0', fontFamily: "'Outfit', sans-serif", padding: '48px 24px' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* Back link */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(232,235,240,0.35)', fontSize: '13px', marginBottom: '32px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to RoadRight
        </Link>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <Logo />
          <span style={{ fontSize: '20px', fontWeight: '700' }}><span style={{ color: '#3B82F6' }}>Road</span><span style={{ color: '#E8EBF0' }}>Right</span></span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60A5FA', fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '5px 12px', borderRadius: '100px', marginBottom: '20px' }}>
            No app store needed
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '12px' }}>Add <span style={{ color: '#3B82F6' }}>Road</span>Right to your phone</h1>
          <p style={{ fontSize: '16px', color: 'rgba(232,235,240,0.5)', lineHeight: '1.6' }}>Install it directly from your browser — opens full screen like a native app</p>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>

          {/* iPhone */}
          <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🍎</div>
              <div>
                <p style={{ fontSize: '17px', fontWeight: '700', marginBottom: '2px' }}>iPhone</p>
                <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.35)' }}>Use Safari browser</p>
              </div>
            </div>
            <div style={{ padding: '8px 24px 20px' }}>
              {[
                { n: '1', title: 'Open Safari', desc: 'Must be Safari — not Chrome or Firefox' },
                { n: '2', title: 'Go to roadright.ca/driver', desc: 'Type it into the Safari address bar' },
                { n: '3', title: 'Tap the Share button ⬆️', desc: 'The box with an arrow at the bottom of Safari' },
                { n: '4', title: 'Tap "Add to Home Screen"', desc: 'Scroll down in the share menu to find it' },
                { n: '5', title: 'Tap "Add"', desc: 'RoadRight appears on your home screen — done!' },
              ].map((s, i, arr) => (
                <div key={s.n} style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>{s.n}</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '3px' }}>{s.title}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)', lineHeight: '1.5' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Android */}
          <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(61,220,132,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🤖</div>
              <div>
                <p style={{ fontSize: '17px', fontWeight: '700', marginBottom: '2px' }}>Android</p>
                <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.35)' }}>Use Chrome browser</p>
              </div>
            </div>
            <div style={{ padding: '8px 24px 20px' }}>
              {[
                { n: '1', title: 'Open Chrome', desc: 'Must be Chrome — not Samsung Browser or Firefox' },
                { n: '2', title: 'Go to roadright.ca/driver', desc: 'Type it into the Chrome address bar' },
                { n: '3', title: 'Tap the three dots ⋮', desc: 'Top right corner of Chrome' },
                { n: '4', title: 'Tap "Add to Home Screen"', desc: 'Or Chrome may show an install banner automatically' },
                { n: '5', title: 'Tap "Add"', desc: 'RoadRight appears on your home screen — done!' },
              ].map((s, i, arr) => (
                <div key={s.n} style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(61,220,132,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#34D399', flexShrink: 0, marginTop: '2px' }}>{s.n}</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '3px' }}>{s.title}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.4)', lineHeight: '1.5' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Note */}
        <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '14px', padding: '18px 22px', display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.55)', lineHeight: '1.6' }}>
            Once installed, RoadRight opens <strong style={{ color: '#E8EBF0' }}>full screen like a native app</strong> — no browser bar, no distractions. One tap connects you to a licensed lawyer or paralegal in seconds.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' as const }}>
          <Link href="/signup" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '14px 36px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: 'white', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
              Get Started Free
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
