import Link from 'next/link'

export default function TicketsPage() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: '#06080C', color: '#E8EBF0', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,8,12,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="32" height="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" rx="112" fill="#0A0E17"/>
            <path d="M48 460 L196 188 L316 188 L464 460 Z" fill="#141c2e"/>
            <path d="M48 460 L196 188" stroke="white" strokeWidth="18" strokeLinecap="round"/>
            <path d="M464 460 L316 188" stroke="white" strokeWidth="18" strokeLinecap="round"/>
            <line x1="256" y1="224" x2="256" y2="272" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.7"/>
            <line x1="256" y1="296" x2="256" y2="352" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.5"/>
            <rect x="192" y="120" width="128" height="60" rx="30" fill="#2563EB"/>
            <line x1="256" y1="62" x2="256" y2="104" stroke="#60A5FA" strokeWidth="12" strokeLinecap="round" opacity="0.85"/>
          </svg>
          <span style={{ fontSize: '18px', fontWeight: '700' }}><span style={{ color: '#3B82F6' }}>Road</span><span style={{ color: '#E8EBF0' }}>Right</span></span>
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '14px', color: 'rgba(232,235,240,0.5)', textDecoration: 'none' }}>Home</Link>
          <Link href="/signup" style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#2563EB', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' as const }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
          <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#34D399' }}>HTA ticket defence · Ontario</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: '800', lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '24px' }}>
          Already got a ticket?<br />
          <span style={{ color: '#3B82F6' }}>Don&apos;t just pay it.</span>
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(232,235,240,0.6)', lineHeight: '1.7', maxWidth: '580px', margin: '0 auto 40px' }}>
          Most drivers pay their ticket without knowing they have options. Our network of LSO-licensed paralegals fights HTA violations in court — often reducing or eliminating fines, demerit points, and insurance impacts.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <Link href="/signup" style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: 'white', fontSize: '16px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
            Get Help With My Ticket
          </Link>
          <Link href="#how-it-works" style={{ padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#E8EBF0', fontSize: '16px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' }}>
            See how it works
          </Link>
        </div>
      </section>

      {/* Two services comparison */}
      <section style={{ background: 'rgba(12,15,22,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '12px' }}>Two ways we protect you</p>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: '800', letterSpacing: '-0.5px' }}>Before the ticket. After the ticket.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="home-grid-2">
            {/* Mid-stop */}
            <div style={{ background: '#0C0F16', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '20px', padding: '28px 24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '100px', padding: '4px 12px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', display: 'inline-block' }}></span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#60A5FA', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Mid-stop assistance</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>🔴 Live legal guidance</h3>
              <p style={{ fontSize: '14px', color: 'rgba(232,235,240,0.55)', lineHeight: '1.7', marginBottom: '20px' }}>
                The moment you&apos;re pulled over — press one button. A licensed lawyer or paralegal joins your video call in seconds, guides you through the stop, and records everything automatically.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px', marginBottom: '20px' }}>
                {['Real-time video with a licensed professional', 'Guides you on what to say and what not to say', 'Documents the interaction as it happens', 'Protects your rights under the Canadian Charter'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#3B82F6', fontSize: '13px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '13px', color: 'rgba(232,235,240,0.6)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(232,235,240,0.3)', fontStyle: 'italic' }}>Best for: preventing a bad situation from getting worse</div>
            </div>

            {/* Post-ticket */}
            <div style={{ background: '#0C0F16', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '20px', padding: '28px 24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '100px', padding: '4px 12px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#34D399', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Post-ticket defence</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>⚖️ Fight your ticket</h3>
              <p style={{ fontSize: '14px', color: 'rgba(232,235,240,0.55)', lineHeight: '1.7', marginBottom: '20px' }}>
                Already received a ticket? Don&apos;t pay it and walk away. Our licensed paralegals appear in court on your behalf to fight HTA violations — often getting charges reduced, withdrawn, or eliminated.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px', marginBottom: '20px' }}>
                {['Reduce or eliminate fines', 'Protect demerit points on your licence', 'Reduce insurance premium impact', 'Paralegal appears in court — you don\'t have to'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10B981', fontSize: '13px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '13px', color: 'rgba(232,235,240,0.6)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(232,235,240,0.3)', fontStyle: 'italic' }}>Best for: fighting charges after the fact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket types */}
      <section id="how-it-works" style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '12px' }}>We handle all HTA violations</p>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: '800', letterSpacing: '-0.5px' }}>What tickets can we fight?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="home-grid-3">
            {[
              { icon: '⚡', title: 'Speeding', desc: 'Minor to major speeding charges, including stunt driving thresholds.' },
              { icon: '🚨', title: 'Stunt driving', desc: '50+ km/h over the limit. Immediate impoundment. These can be fought.' },
              { icon: '🔴', title: 'Careless driving', desc: 'One of the most serious HTA charges — 6 demerit points and major insurance impacts.' },
              { icon: '🚦', title: 'Red light / stop sign', desc: 'Camera-issued or officer-issued. Both are contestable.' },
              { icon: '📱', title: 'Distracted driving', desc: 'Cellphone and handheld device charges. 3 demerit points and steep fines.' },
              { icon: '🛡️', title: 'Driving without insurance', desc: 'One of the most costly HTA violations — minimum $5,000 fine. Get help immediately.' },
              { icon: '🪪', title: 'Suspended licence', desc: 'Driving while suspended carries serious penalties. Proper legal defence matters.' },
              { icon: '💡', title: 'Seatbelt violations', desc: 'For driver or passenger. Quick to fight, worth contesting.' },
              { icon: '🅿️', title: 'Other HTA violations', desc: 'Improper lane change, following too close, failing to yield, and more.' },
            ].map(t => (
              <div key={t.title} style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{t.icon}</div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>{t.title}</h4>
                <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.45)', lineHeight: '1.5' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why fight it */}
      <section style={{ background: 'rgba(12,15,22,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '12px' }}>The real cost of just paying</p>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: '800', letterSpacing: '-0.5px' }}>Why you should never just pay a ticket</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="home-grid-3">
            {[
              { icon: '💰', title: 'Insurance goes up', desc: 'A single HTA conviction can raise your insurance premiums by 15–25% for up to 3 years. The cost of fighting far outweighs the fine.' },
              { icon: '📉', title: 'Demerit points', desc: 'Accumulate enough demerit points and you face licence suspension. Fighting even minor charges protects your driving record long-term.' },
              { icon: '⚖️', title: 'You have options', desc: 'Many charges are reduced or withdrawn entirely on first appearance. A licensed paralegal knows how to negotiate with prosecutors.' },
            ].map(r => (
              <div key={r.title} style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px 24px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{r.icon}</div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>{r.title}</h4>
                <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.5)', lineHeight: '1.6' }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '12px' }}>Simple process</p>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: '800', letterSpacing: '-0.5px' }}>How ticket defence works</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
            {[
              { num: '01', title: 'Create your account', desc: 'Sign up at roadright.ca and submit your ticket directly through your account. No emailing required — everything is handled in one place.' },
              { num: '02', title: 'Review your case', desc: 'Your paralegal reviews the charge, the circumstances, and your options. No obligation — you\'ll know what to expect before committing.' },
              { num: '03', title: 'We appear for you', desc: 'Your paralegal appears in court on your behalf. In most cases, you don\'t have to attend at all.' },
              { num: '04', title: 'Outcome', desc: 'Charges are frequently reduced to a lesser offence, withdrawn, or eliminated. Your paralegal keeps you informed at every step.' },
            ].map(step => (
              <div key={step.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px 22px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#3B82F6', minWidth: '24px', paddingTop: '3px' }}>{step.num}</span>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{step.title}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.55)', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 88px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'linear-gradient(135deg, #1e3a8a, #1D4ED8)', borderRadius: '24px', padding: '48px 40px', textAlign: 'center' as const }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '14px' }}>Got a ticket? Let&apos;s fight it.</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', marginBottom: '32px', lineHeight: '1.7' }}>
            Create an account and send in your ticket — we&apos;ll connect you with a licensed Ontario paralegal. Free initial review, no obligation.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: '12px', background: 'white', color: '#1D4ED8', fontSize: '16px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none' }}>
            Create Account &amp; Submit Ticket
          </Link>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>Free initial review · Ontario only · No credit card needed</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', background: '#050709', textAlign: 'center' as const }}>
        <div style={{ marginBottom: '16px' }}>
          <Link href="/" style={{ fontSize: '14px', color: 'rgba(232,235,240,0.4)', textDecoration: 'none', marginRight: '24px' }}>Home</Link>
          <Link href="#how-it-works" style={{ fontSize: '14px', color: 'rgba(232,235,240,0.4)', textDecoration: 'none', marginRight: '24px' }}>How it works</Link>
          <a href="mailto:info@roadright.ca" style={{ fontSize: '14px', color: 'rgba(232,235,240,0.4)', textDecoration: 'none' }}>Contact</a>
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(232,235,240,0.2)', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto 12px' }}>
          <strong style={{ color: 'rgba(232,235,240,0.3)' }}>Legal Disclaimer:</strong> RoadRight is a technology platform that connects users with independently licensed paralegals and lawyers regulated by the Law Society of Ontario. RoadRight is not a law firm. Ticket defence services are provided by independent LSO-licensed paralegals (P1). Outcomes cannot be guaranteed. Results depend on the specific circumstances of each case. For serious criminal matters, retain independent legal counsel.
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(232,235,240,0.2)' }}>© 2026 RoadRight · Ontario, Canada · All rights reserved.</p>
      </footer>

    </div>
  )
}
