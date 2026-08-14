import Link from 'next/link'

export default function LawyersPage() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: '#06080C', color: '#E8EBF0', minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Back link */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(232,235,240,0.35)', fontSize: '13px', marginBottom: '32px', transition: 'color 0.2s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to GuidLaw
        </Link>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="44" height="44" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
            <span style={{ fontSize: '22px', fontWeight: '700' }}><span style={{ color: '#3B82F6' }}>Road</span><span style={{ color: '#E8EBF0' }}>Right</span></span>
          </div>
          <span style={{ fontSize: '11px', color: 'rgba(232,235,240,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Partner Opportunity · Confidential</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60A5FA', fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '5px 12px', borderRadius: '100px', marginBottom: '20px' }}>
            Now recruiting Ontario lawyers & paralegals
          </div>
          <h1 style={{ fontSize: '38px', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Be the professional <span style={{ color: '#3B82F6' }}>drivers call</span><br />when it matters most.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(232,235,240,0.6)', lineHeight: '1.7', maxWidth: '680px' }}>
            GuidLaw connects Ontario drivers to LSO-licensed lawyers and paralegals via live video the moment they&apos;re pulled over.
            10-minute sessions. Zero overhead. Fully LSO-compliant. You set your availability.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '48px' }}>
          {[
            { number: '~10 min', label: 'Average session length' },
            { number: '$0', label: 'Admin, overhead, or billing' },
            { number: '100%', label: 'Remote — from anywhere' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px', textAlign: 'center' as const }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#3B82F6', marginBottom: '4px' }}>{s.number}</div>
              <div style={{ fontSize: '12px', color: 'rgba(232,235,240,0.45)', lineHeight: '1.4' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '16px' }}>How it works</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
            {[
              { num: '01', text: <><strong>You toggle Available</strong> on the GuidLaw lawyer app whenever you&apos;re ready to take calls — morning, evening, weekends, whenever fits.</> },
              { num: '02', text: <><strong>A driver is pulled over</strong> and presses one button. GuidLaw connects them to you in seconds via live video.</> },
              { num: '03', text: <><strong>You guide them through the stop</strong> — what to say, what not to say, what their rights are. The call auto-records to their account.</> },
              { num: '04', text: <><strong>Every call is a warm lead.</strong> Drivers who need further representation know exactly who helped them when it counted.</> },
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px 20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#3B82F6', minWidth: '24px', paddingTop: '2px' }}>{step.num}</span>
                <p style={{ fontSize: '14px', color: 'rgba(232,235,240,0.75)', lineHeight: '1.5' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Paralegal callout */}
        <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '16px', padding: '22px 24px', marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#60A5FA', marginBottom: '10px' }}>Paralegals — this is your home territory</div>
          <p style={{ fontSize: '14px', color: 'rgba(232,235,240,0.65)', lineHeight: '1.7' }}>
            Highway Traffic Act and Provincial Offences Act matters are squarely within the <strong style={{ color: '#E8EBF0' }}>P1 paralegal scope of practice</strong>. If HTA work is already part of your practice, GuidLaw is a natural fit — same work, new channel, zero disruption to your existing caseload.
          </p>
        </div>

        {/* Why lawyers join */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '16px' }}>Why lawyers & paralegals are joining</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: '⏱️', title: 'Your schedule, fully', desc: 'Toggle on and off whenever you want. No shifts, no commitments, no minimums.' },
              { icon: '💼', title: 'Zero overhead', desc: 'No client files, no billing, no admin. Show up, help, done.' },
              { icon: '📲', title: 'Built-in client pipeline', desc: 'Every driver you help is a potential full-service referral. You already have the relationship.' },
              { icon: '🍁', title: 'First in Canada', desc: "No one else is doing this here. You'd be part of building something that didn't exist." },
            ].map((item) => (
              <div key={item.title} style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px 20px' }}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(232,235,240,0.5)', lineHeight: '1.5' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(232,235,240,0.35)', marginBottom: '16px' }}>LSO compliance</div>
          <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '16px', padding: '22px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', background: 'rgba(16,185,129,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>✅</div>
            <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.6)', lineHeight: '1.6' }}>
              GuidLaw operates under <strong style={{ color: '#34D399', fontWeight: '600' }}>LSO-approved Limited Scope Retainer rules</strong> (Rule 3.2-1A).
              All sessions use encrypted video. In-app consent is obtained from every driver before connecting.
              Scope of service is clearly defined. You&apos;re covered — we&apos;ve done the legal groundwork.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div style={{ background: '#0C0F16', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '3px solid #3B82F6', borderRadius: '0 14px 14px 0', padding: '20px 22px', fontSize: '15px', color: 'rgba(232,235,240,0.7)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '40px' }}>
          &ldquo;Racial profiling during traffic stops is a documented reality in Ontario. GuidLaw exists so that
          every driver — regardless of background — has a licensed legal professional in their corner the moment they need one.
          The lawyers and paralegals who join us early are the ones who showed up when it mattered.&rdquo;
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1D4ED8)', borderRadius: '20px', padding: '32px', textAlign: 'center' as const }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Ready to join <span style={{ color: '#3B82F6' }}>Road</span>Right?</h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '24px', lineHeight: '1.6' }}>
            We&apos;re onboarding LSO-licensed lawyers and paralegals now.<br />Beta is free — no commitment, no minimums, just impact.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px', alignItems: 'center', width: '100%' }}>
            {/* Co-founders side by side */}
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginBottom: '2px' }}>Hassan Shah</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Co-Founder</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>📞 +1 (437) 982-7146</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginBottom: '2px' }}>Faiyaz Khan</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Co-Founder</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>📞 +1 (905) 244-3049</div>
              </div>
            </div>
            {/* Email and website below */}
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>📧 <span style={{ color: 'white', fontWeight: '600' }}>info@guidlaw.ca</span></div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>🌐 <span style={{ color: 'white', fontWeight: '600' }}>guidlaw.ca</span></div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '18px 20px' }}>
          <p style={{ fontSize: '11px', color: 'rgba(232,235,240,0.25)', lineHeight: '1.7' }}>
            <strong style={{ color: 'rgba(232,235,240,0.35)' }}>Legal Disclaimer:</strong> GuidLaw is a technology platform and is not itself a law firm or legal services provider. All legal services are provided independently by LSO-licensed lawyers (L1) and paralegals (P1) who join the platform. Legal professionals are responsible for their own compliance with LSO Rules of Professional Conduct and Paralegal Rules of Conduct, including Rule 3.2-1A (Limited Scope Retainer). GuidLaw does not supervise legal professionals, does not direct legal advice, and does not assume liability for services rendered. Each professional maintains their own errors and omissions insurance. GuidLaw is currently in beta.
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center' as const, fontSize: '11px', color: 'rgba(232,235,240,0.2)', lineHeight: '1.6' }}>
          GuidLaw · guidlaw.ca · Ontario, Canada · 2026<br />
          For LSO-licensed lawyers and paralegals only.
        </div>

      </div>
    </div>
  )
}
