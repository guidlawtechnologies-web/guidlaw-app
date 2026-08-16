import Link from "next/link";
import { GuidLawLogo } from "@/components/GuidLawLogo";
import { IconBadge } from "@/components/Icon";
import { FAQS } from "@/content/faqs";
import { POSTS } from "@/content/posts";
import { STEPS, COMMITMENTS } from "@/content/process";
import { SERVICES, SEVERITY_LEGEND, PHOTO_CREDITS } from "@/content/services";
import { ServiceCard } from "@/components/ServiceCard";
import { NAV_LINKS } from "@/components/SiteChrome";

// Eight representative charges for the homepage grid, spanning the
// severity range. All eight have photographs — the full list, including
// the charges with no natural image, lives on /services.
const HOME_SLUGS = [
  "speeding", "red-light", "following-too-closely", "seatbelt",
  "distracted-driving", "careless-driving", "stunt-driving", "school-bus",
];
const HOME_SERVICES = HOME_SLUGS.map((s) => SERVICES.find((x) => x.slug === s)!);

// ── Main homepage ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#0F172A",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 24px",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <GuidLawLogo size={38} variant="dark" />

          <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <a href="tel:+14379827146" className="nav-phone" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              +1 437 982 7146
            </a>
            <Link href="/submit-ticket" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
              Fight My Ticket
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#faf8f2",
          borderBottom: "1px solid #eae7dd",
          padding: "0 24px",
        }}
      >
        <div
          className="container hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            gap: 40,
            alignItems: "center",
            minHeight: 620,
            padding: "72px 0",
          }}
        >
          {/* LEFT — editorial type */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 32,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              <span style={{ width: 36, height: 1, background: "#0d9488", display: "inline-block" }} />
              <span style={{ color: "#0d9488" }}>Ontario · Est. 2026</span>
            </div>

            {/* Big serif headline */}
            <h1
              className="gl-serif"
              style={{
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-2px",
                color: "#0F172A",
                fontSize: "clamp(56px, 8.5vw, 104px)",
                margin: "0 0 32px",
              }}
            >
              <span style={{ display: "block" }}>Don&apos;t pay</span>
              <span style={{ display: "block" }}>the ticket.</span>
              <em style={{ display: "block", color: "#0d9488", fontStyle: "italic", fontWeight: 400 }}>
                Fight&nbsp;it.
              </em>
            </h1>

            {/* Subhead */}
            <p
              style={{
                fontSize: "clamp(15px, 1.4vw, 17px)",
                color: "#4a4a44",
                lineHeight: 1.65,
                marginBottom: 28,
                maxWidth: 420,
              }}
            >
              Submit your ticket in two minutes. An LSO-licensed paralegal takes it from there — court appearance included.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <Link
                href="/submit-ticket"
                style={{
                  background: "#0F172A",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "14px 26px",
                  borderRadius: 8,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Get a free review <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/how-it-works"
                style={{
                  color: "#0F172A",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "14px 4px",
                  borderBottom: "1.5px solid #0F172A",
                  textDecoration: "none",
                }}
              >
                See how it works
              </Link>
            </div>

          </div>

          {/* RIGHT — dismissed ticket graphic */}
          <div
            className="hero-graphic"
            style={{
              position: "relative",
              minHeight: 560,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ticket 1 — behind, faded */}
            <div
              style={{
                position: "absolute",
                top: "6%",
                left: "-2%",
                width: "clamp(260px, 26vw, 380px)",
                background: "white",
                borderRadius: 4,
                padding: "clamp(20px, 1.9vw, 28px)",
                transform: "rotate(-9deg)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                border: "0.5px solid #ececec",
                opacity: 0.75,
              }}
            >
              <div style={{ fontSize: 10, color: "#888", letterSpacing: "0.14em", marginBottom: 6, fontWeight: 500 }}>
                PROVINCIAL OFFENCES ACT
              </div>
              <div className="gl-serif" style={{ fontSize: 18, color: "#0F172A", fontWeight: 500, marginBottom: 14 }}>
                Certificate of Offence
              </div>
              <div style={{ height: 2, background: "#0F172A", marginBottom: 14 }} />
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                <div>Section 128 — Speeding</div>
                <div>25 km/h over posted limit</div>
                <div>Set fine: $220.00</div>
              </div>
            </div>

            {/* Ticket 2 — main, DISMISSED */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "clamp(300px, 30vw, 440px)",
                background: "white",
                borderRadius: 4,
                padding: "clamp(24px, 2.2vw, 32px)",
                transform: "rotate(4deg) translateX(8%)",
                boxShadow: "0 24px 56px rgba(0,0,0,0.18)",
                border: "0.5px solid #e0e0e0",
              }}
            >
              <div style={{ fontSize: 11, color: "#777", letterSpacing: "0.14em", marginBottom: 8, fontWeight: 500 }}>
                PROVINCIAL OFFENCES ACT
              </div>
              <div className="gl-serif" style={{ fontSize: 20, color: "#0F172A", fontWeight: 500, marginBottom: 16 }}>
                Certificate of Offence
              </div>
              <div style={{ height: 2, background: "#0F172A", marginBottom: 16 }} />
              <div style={{ fontSize: 13, color: "#666", lineHeight: 2, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Offence</span><span style={{ color: "#0F172A", fontWeight: 500 }}>Speeding</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Section</span><span style={{ color: "#0F172A", fontWeight: 500 }}>HTA 128</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Set fine</span><span style={{ color: "#0F172A", fontWeight: 500 }}>$295.00</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Demerit points</span><span style={{ color: "#0F172A", fontWeight: 500 }}>4</span></div>
              </div>

              {/* DISMISSED stamp */}
              <div
                className="gl-serif"
                style={{
                  position: "absolute",
                  top: "38%",
                  right: "-8%",
                  transform: "rotate(-14deg)",
                  border: "4px solid #0d9488",
                  color: "#0d9488",
                  padding: "10px 28px",
                  fontSize: "clamp(28px, 2.6vw, 40px)",
                  fontWeight: 500,
                  letterSpacing: "3px",
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: 6,
                }}
              >
                DISMISSED
              </div>

              <div style={{ borderTop: "1px dashed #d5d5d5", paddingTop: 12, fontSize: 12, color: "#888" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Court date</span><span>—</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>You paid</span><span style={{ color: "#0d9488", fontWeight: 500 }}>$0</span></div>
              </div>
            </div>

            {/* Floating "cases won" callout */}
            <div
              style={{
                position: "absolute",
                bottom: "2%",
                right: "-2%",
                zIndex: 3,
                background: "#0F172A",
                color: "white",
                padding: "16px 22px",
                borderRadius: 14,
                boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                This month
              </div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>Cases won for drivers</div>
            </div>
          </div>
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; padding: 48px 0 !important; gap: 48px !important; min-height: 0 !important; }
            .hero-graphic { min-height: 420px !important; }
          }
        `}</style>
      </section>


      {/* ── PRACTICE AREAS ──────────────────────────────────────────── */}
      <section id="practice-areas" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              What We Handle
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
              We Fight All Ontario Traffic Tickets
            </h2>
            <p style={{ color: "var(--text-dim)", marginTop: 10, fontSize: 16, maxWidth: 520, margin: "10px auto 0" }}>
              From minor speeding to stunt driving — our team has seen it all and knows how to beat it.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
              {SEVERITY_LEGEND.map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-dim)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.tone, display: "inline-block" }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          <div className="svc-grid">
            {HOME_SERVICES.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/submit-ticket" className="btn-primary" style={{ padding: "14px 36px", fontSize: 15 }}>
              Get a Free Case Review
            </Link>
            <Link href="/services" style={{ fontSize: 15, fontWeight: 600, color: "#0d9488", textDecoration: "none" }}>
              All {SERVICES.length} charges we handle →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY GUIDLAW ─────────────────────────────────────────────── */}
      <section className="section-gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              Why Us
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
              Why GuidLaw?
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {([
              { icon: "spark", title: "Free Case Review", desc: "Submit your ticket and we'll review it at no charge. Know your options before you commit." },
              { icon: "gavel", title: "We Go to Court for You", desc: "Our paralegals make all court appearances on your behalf. You never have to take a day off." },
              { icon: "map-pin", title: "Ontario-Wide Coverage", desc: "We handle tickets from Windsor to Ottawa and everywhere in between." },
              { icon: "certificate", title: "LSO-Licensed Professionals", desc: "Every case is handled by a paralegal licensed with the Law Society of Ontario." },
              { icon: "tag", title: "Flat-Rate Pricing", desc: "Know exactly what you'll pay upfront. No surprises. No hourly billing." },
              { icon: "trophy", title: "Withdrawal or Reduction", desc: "The goal is a withdrawal. Where that's not realistic, a reduction that cuts your demerit points and keeps your record clean." },
            ] as const).map((b) => (
              <div
                key={b.title}
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: 14,
                  padding: "28px 24px",
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                }}
              >
                <IconBadge name={b.icon} size={46} iconSize={24} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 6 }}>{b.title}</div>
                  <div style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="section-gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              Simple. Fast. Effective.
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
              How GuidLaw Works
            </h2>
            <p style={{ color: "var(--text-dim)", marginTop: 10, fontSize: 16, maxWidth: 480, margin: "10px auto 0" }}>
              From the ticket to the courtroom, we handle everything. You never have to show up.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {STEPS.map((item) => (
              <div
                key={item.n}
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: 14,
                  padding: "28px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div className="gl-serif" style={{ position: "absolute", top: 18, right: 22, fontSize: 40, color: "#F1F3F7", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {item.n}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <IconBadge name={item.icon} size={44} iconSize={22} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: "var(--text)" }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>{item.short}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/submit-ticket" className="btn-primary" style={{ padding: "16px 40px", fontSize: 16 }}>
              Submit My Ticket — Free to Start
            </Link>
            <Link href="/how-it-works" style={{ fontSize: 15, fontWeight: 600, color: "#0d9488", textDecoration: "none" }}>
              See the full process →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" style={{ background: "#faf8f2", borderTop: "1px solid #eae7dd", borderBottom: "1px solid #eae7dd", padding: "80px 24px" }}>
        <div className="container">
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500 }}>
                <span style={{ width: 36, height: 1, background: "#0d9488", display: "inline-block" }} />
                <span style={{ color: "#0d9488" }}>Who we are</span>
              </div>

              <h2 className="gl-serif" style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-1.2px", lineHeight: 1.05, marginBottom: 22 }}>
                Built because the system<br />counts on you giving up.
              </h2>

              <p style={{ fontSize: 16.5, color: "#4a4a44", lineHeight: 1.75, marginBottom: 16, maxWidth: 520 }}>
                Most people pay their ticket. Not because they&apos;re guilty — because fighting it
                means a day off work, a courthouse you&apos;ve never been to, and rules nobody
                explained. The system runs on the assumption you won&apos;t bother.
              </p>
              <p style={{ fontSize: 16.5, color: "#4a4a44", lineHeight: 1.75, marginBottom: 24, maxWidth: 520 }}>
                GuidLaw removes every one of those excuses. Send a photo of your ticket. We assign an
                LSO-licensed paralegal, they handle the filings and the negotiation, and they appear
                in court so you don&apos;t have to.
              </p>

              <Link href="/about" style={{ fontSize: 15, fontWeight: 600, color: "#0d9488", textDecoration: "none" }}>
                More about GuidLaw →
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 26, marginTop: 30, borderTop: "1px solid #e5e1d5" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0d9488", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 15, flexShrink: 0 }}>
                  HS
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>Hassan Shah</div>
                  <div style={{ fontSize: 13.5, color: "#86867c" }}>Founder · GuidLaw Technologies Inc.</div>
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div style={{ background: "white", border: "1px solid #eae7dd", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#86867c", fontWeight: 600, marginBottom: 18 }}>
                Talk to a person
              </div>

              <a href="tel:+14379827146" style={{ textDecoration: "none", display: "block", marginBottom: 6 }}>
                <div className="gl-serif" style={{ fontSize: "clamp(26px, 3vw, 32px)", color: "#0F172A", letterSpacing: "-0.5px", lineHeight: 1.15 }}>
                  +1 437 982 7146
                </div>
              </a>
              <p style={{ fontSize: 14, color: "#86867c", lineHeight: 1.6, marginBottom: 22 }}>
                Call or text. If you&apos;re holding a ticket and don&apos;t know what it means, this
                is the fastest way to find out.
              </p>

              <a
                href="mailto:info@guidlaw.ca"
                style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: "#0F172A", textDecoration: "none", paddingBottom: 18, marginBottom: 18, borderBottom: "1px solid #f0ece0", fontWeight: 500 }}
              >
                info@guidlaw.ca
              </a>

              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {[
                  "LSO-licensed paralegals",
                  "All Ontario courts",
                  "Flat fee, quoted upfront",
                  "You never attend court",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#4a4a44" }}>
                    <span style={{ color: "#0d9488", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/submit-ticket"
                style={{ display: "block", textAlign: "center", background: "#0F172A", color: "white", fontSize: 14.5, fontWeight: 600, padding: "14px", borderRadius: 8, textDecoration: "none", marginTop: 24 }}
              >
                Get a free review
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          }
        `}</style>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
              Why GuidLaw vs. Going It Alone
            </h2>
            <p style={{ color: "var(--text-dim)", marginTop: 10, fontSize: 16, maxWidth: 560, margin: "10px auto 0" }}>
              What changes when someone who does this every week handles it instead of you.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
              <thead>
                <tr>
                  <th style={{ padding: "14px 20px", textAlign: "left", background: "#F8F9FB", border: "1.5px solid var(--border)", fontWeight: 600, color: "var(--text-dim)" }}>
                    &nbsp;
                  </th>
                  <th style={{ padding: "14px 20px", textAlign: "center", background: "#F8F9FB", border: "1.5px solid var(--border)", fontWeight: 600, color: "var(--text-dim)" }}>
                    Going Alone
                  </th>
                  <th style={{ padding: "14px 24px", textAlign: "center", background: "var(--accent)", border: "1.5px solid var(--accent)", fontWeight: 700, color: "white" }}>
                    ✦ With GuidLaw
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Who attends court", alone: "You, in person", guidlaw: "Your paralegal, as your agent", highlight: true },
                  { label: "Time off work", alone: "A day, sometimes more", guidlaw: "None", highlight: false },
                  { label: "Disclosure request", alone: "Yours to know about and file", guidlaw: "Filed and reviewed for you", highlight: true },
                  { label: "Officer's notes reviewed", alone: "Only if you know to ask", guidlaw: "Every file, as standard", highlight: false },
                  { label: "Negotiating with the prosecutor", alone: "On your own, unrepresented", guidlaw: "Done by someone who does it weekly", highlight: true },
                  { label: "Court procedure", alone: "Learn it yourself, quickly", guidlaw: "Already known", highlight: false },
                  { label: "What it costs", alone: "Fine, points, insurance, lost wages", guidlaw: "One flat fee, quoted upfront", highlight: true },
                ].map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: "14px 20px", background: row.highlight ? "#F8F9FB" : "white", border: "1.5px solid var(--border)", fontWeight: 600, color: "var(--text)" }}>
                      {row.label}
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "center", background: row.highlight ? "#F8F9FB" : "white", border: "1.5px solid var(--border)", color: "#DC2626" }}>
                      {row.alone}
                    </td>
                    <td style={{ padding: "14px 24px", textAlign: "center", background: row.highlight ? "#f0fdfa" : "#f7fefd", border: "1.5px solid #99e6dc", color: "#0f766e", fontWeight: 600 }}>
                      ✓ {row.guidlaw}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── GOT A TICKET CTA ────────────────────────────────────────── */}
      <section style={{ background: "#0d9488", padding: "72px 24px", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "white", letterSpacing: "-1px", marginBottom: 16 }}>
            Got a ticket? Don&apos;t want to go to court?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            Submit your ticket online in 2 minutes. Our team takes it from there.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/submit-ticket"
              style={{
                background: "white",
                color: "#0d9488",
                padding: "16px 40px",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 800,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Get a Free Case Review
            </Link>
            <Link
              href="tel:+16474177287"
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.6)",
                padding: "16px 40px",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              📞 Call Us Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────────────────── */}
      {/* Occupies the slot a reviews section will take once real client
          reviews exist. Everything stated here is verifiable today. */}
      <section id="how-we-work" className="section-gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              Our commitments
            </div>
            <h2 className="gl-serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              How we work
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--text-dim)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              We&apos;re new. Rather than tell you what past clients think, here is exactly what we
              commit to — hold us to it.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
            {COMMITMENTS.map((c) => (
              <div
                key={c.n}
                style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 14, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div className="gl-serif" style={{ fontSize: 22, color: "#0d9488", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {c.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", lineHeight: 1.35 }}>{c.title}</div>
                <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.7, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: 36, fontSize: 14, color: "var(--text-muted)", maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            Client reviews will appear here once we have them. We won&apos;t publish one we
            didn&apos;t earn.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              Questions
            </div>
            <h2 className="gl-serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-1px" }}>
              Straight answers
            </h2>
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {FAQS.slice(0, 5).map((f, i) => (
              <details
                key={f.q}
                className="faq-item"
                style={{ borderBottom: "1px solid var(--border)", paddingBottom: 2 }}
                open={i === 0}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    padding: "20px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    fontSize: 16.5,
                    fontWeight: 600,
                    color: "#0F172A",
                  }}
                >
                  <span>{f.q}</span>
                  <span className="faq-mark" style={{ color: "#0d9488", fontSize: 22, flexShrink: 0, lineHeight: 1, fontWeight: 400 }}>
                    +
                  </span>
                </summary>
                <p style={{ fontSize: 15.5, color: "var(--text-dim)", lineHeight: 1.8, padding: "0 0 22px", margin: 0, maxWidth: 640 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/faq" style={{ fontSize: 15, fontWeight: 600, color: "#0d9488", textDecoration: "none" }}>
              All {FAQS.length} questions →
            </Link>
            <p style={{ fontSize: 15, color: "var(--text-dim)", margin: "28px 0 18px" }}>
              Still not sure where you stand?
            </p>
            <a
              href="tel:+14379827146"
              className="btn-primary"
              style={{ padding: "14px 32px", fontSize: 15 }}
            >
              Call +1 437 982 7146
            </a>
          </div>
        </div>

        <style>{`
          .faq-item summary::-webkit-details-marker { display: none; }
          .faq-item[open] .faq-mark { transform: rotate(45deg); }
          .faq-item .faq-mark { transition: transform 0.18s ease; display: inline-block; }
          .faq-item summary:hover { color: #0d9488; }
        `}</style>
      </section>

      {/* ── BLOG ──────────────────────────────────────────────────────── */}
      <section className="section-gray">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 36, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
                Guides
              </div>
              <h2 className="gl-serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-1px", marginBottom: 8 }}>
                Know what you&apos;re charged with
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--text-dim)", maxWidth: 470, lineHeight: 1.65 }}>
                Plain explanations of the Highway Traffic Act charges Ontario drivers actually get.
              </p>
            </div>
            <Link href="/blog" style={{ fontSize: 14.5, fontWeight: 600, color: "#0d9488", textDecoration: "none", whiteSpace: "nowrap" }}>
              All guides →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 18 }}>
            {POSTS.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                <article className="card" style={{ padding: "24px 22px", height: "100%", display: "flex", flexDirection: "column", background: "white" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
                    <span className="pill pill-blue" style={{ fontSize: 11 }}>{p.category}</span>
                  </div>
                  <h3 className="gl-serif" style={{ fontSize: 20, fontWeight: 500, color: "#0F172A", lineHeight: 1.22, letterSpacing: "-0.4px", marginBottom: 10 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 18, flex: 1 }}>
                    {p.excerpt}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{p.section}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0d9488" }}>{p.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR PARALEGALS CTA ────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px", background: "white" }}>
        <div className="container">
          <div
            style={{
              background: "var(--navy)",
              borderRadius: 20,
              padding: "56px 48px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 32,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#5eead4", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
                Grow Your Practice
              </div>
              <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 12 }}>
                Are you a licensed paralegal?
              </h2>
              <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.6, maxWidth: 500 }}>
                Join GuidLaw&apos;s network of LSO-licensed paralegals. We send you cases — no cold outreach, no marketing overhead. Focus on the work, we handle the rest.
              </p>
              <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
                {["No cold outreach needed", "Flat fee agreed per file", "Take only the files that fit"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#CBD5E1" }}>
                    <span style={{ color: "#34D399" }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/lawyers"
              style={{
                background: "white",
                color: "var(--navy)",
                border: "none",
                padding: "16px 32px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              Apply to Join →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "var(--navy)", padding: "48px 24px 32px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <GuidLawLogo size={32} variant="dark" href="/" />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginTop: 12 }}>
                Ontario traffic ticket defence. LSO-licensed paralegals, flat fees, and we appear in
                court so you don&apos;t have to.
              </p>
            </div>
            {[
              {
                title: "For Drivers",
                links: [
                  { label: "Submit a Ticket", href: "/submit-ticket" },
                  { label: "Charges We Handle", href: "/services" },
                  { label: "How It Works", href: "/how-it-works" },
                  { label: "FAQ", href: "/faq" },
                ],
              },
              {
                title: "For Paralegals",
                links: [{ label: "Work With GuidLaw", href: "/lawyers" }],
              },
              {
                title: "Company",
                links: [
                  { label: "About Us", href: "/about" },
                  { label: "Guides", href: "/blog" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "info@guidlaw.ca", href: "mailto:info@guidlaw.ca" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 14 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} GuidLaw Technologies Inc. (1001699754 Ontario Inc.) ·
              Mississauga, ON ·{" "}
              <Link href="mailto:info@guidlaw.ca" style={{ color: "rgba(255,255,255,0.3)" }}>
                info@guidlaw.ca
              </Link>
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              GuidLaw is a technology platform, not a law firm. Paralegals are licensed with the Law Society of Ontario.
            </p>
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", marginTop: 14 }}>
            Photography by {PHOTO_CREDITS.join(", ")} via Unsplash.
          </p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          nav > div > div:nth-child(2) { display: none; }
        }
        @media (max-width: 640px) {
          footer div[style*="1fr auto"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
