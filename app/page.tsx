"use client";

import Link from "next/link";
import { useState } from "react";
import { GuidLawLogo } from "@/components/GuidLawLogo";

// ── Paralegal sample data (will come from Supabase later) ──────────────────
const PARALEGALS = [
  {
    id: "1",
    name: "Sarah Mitchell",
    firm: "Mitchell Paralegal Services",
    location: "Toronto, ON",
    specialties: ["Speeding", "Red Light", "Careless Driving"],
    successRate: 94,
    casesWon: 312,
    rating: 4.9,
    reviews: 87,
    price: 299,
    responseTime: "< 2 hours",
    badge: "Top Rated",
  },
  {
    id: "2",
    name: "James Okafor",
    firm: "Okafor Legal",
    location: "Mississauga, ON",
    specialties: ["Stunt Driving", "Speeding", "HTA Violations"],
    successRate: 91,
    casesWon: 198,
    rating: 4.8,
    reviews: 54,
    price: 249,
    responseTime: "< 4 hours",
    badge: "Fast Responder",
  },
  {
    id: "3",
    name: "Priya Sharma",
    firm: "Sharma Law Office",
    location: "Brampton, ON",
    specialties: ["Distracted Driving", "Failure to Stop", "Speeding"],
    successRate: 89,
    casesWon: 143,
    rating: 4.7,
    reviews: 41,
    price: 199,
    responseTime: "< 6 hours",
    badge: null,
  },
  {
    id: "4",
    name: "David Chen",
    firm: "Chen Paralegal Group",
    location: "Scarborough, ON",
    specialties: ["All HTA Violations", "Commercial Vehicles", "Speeding"],
    successRate: 96,
    casesWon: 489,
    rating: 5.0,
    reviews: 112,
    price: 349,
    responseTime: "< 1 hour",
    badge: "Elite",
  },
  {
    id: "5",
    name: "Aisha Browne",
    firm: "Browne Legal Services",
    location: "North York, ON",
    specialties: ["Speeding", "Fail to Yield", "Stop Sign"],
    successRate: 88,
    casesWon: 97,
    rating: 4.6,
    reviews: 29,
    price: 179,
    responseTime: "< 8 hours",
    badge: null,
  },
  {
    id: "6",
    name: "Michael Torres",
    firm: "Torres & Associates",
    location: "Etobicoke, ON",
    specialties: ["Stunt Driving", "Racing", "Speeding 50+"],
    successRate: 93,
    casesWon: 261,
    rating: 4.9,
    reviews: 73,
    price: 399,
    responseTime: "< 2 hours",
    badge: "Specialist",
  },
];

const VIOLATION_TYPES = [
  "Speeding",
  "Red Light",
  "Stop Sign",
  "Stunt Driving",
  "Distracted Driving",
  "Careless Driving",
  "Fail to Yield",
  "Other",
];

const TESTIMONIALS = [
  {
    name: "Marcus J.",
    city: "Toronto",
    text: "Got a $500 speeding ticket on the 401. GuidLaw matched me with Sarah in under an hour. She got it completely dismissed — zero demerit points. Worth every penny.",
    violation: "Speeding 30km/h over",
    outcome: "Dismissed",
  },
  {
    name: "Tanya R.",
    city: "Mississauga",
    text: "I was terrified about my stunt driving charge — 6 demerit points and a $2,000 fine. James got it reduced to a minor speeding ticket. I can't believe how easy the process was.",
    violation: "Stunt Driving",
    outcome: "Reduced to minor offence",
  },
  {
    name: "Kevin P.",
    city: "Brampton",
    text: "Submitted my ticket on a Sunday night. Priya responded within 3 hours. She handled everything — I didn't have to take a single day off work. Case won.",
    violation: "Red Light Camera",
    outcome: "Dismissed",
  },
];

// ── Star rating component ──────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#F59E0B", fontSize: 14 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span style={{ color: "#D1D5DB" }}>
        {"★".repeat(5 - Math.ceil(rating))}
      </span>
    </span>
  );
}

// ── Paralegal card ────────────────────────────────────────────────────────
function ParalegalCard({ p }: { p: (typeof PARALEGALS)[0] }) {
  return (
    <div
      className="card"
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "all 0.2s",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Badge */}
      {p.badge && (
        <span
          className="pill pill-blue"
          style={{ position: "absolute", top: 16, right: 16, fontSize: 11 }}
        >
          {p.badge}
        </span>
      )}

      {/* Header */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Avatar */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1B4FD8, #6366F1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {p.name.split(" ").map((n) => n[0]).join("")}
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>
            {p.name}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 1 }}>
            {p.firm}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>📍</span> {p.location}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Stars rating={p.rating} />
        <span style={{ fontSize: 12, color: "var(--text-dim)", marginLeft: 6 }}>
          {p.rating} ({p.reviews} reviews)
        </span>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 8,
            padding: "10px 12px",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: "#065F46" }}>
            {p.successRate}%
          </div>
          <div style={{ fontSize: 11, color: "#047857" }}>Success Rate</div>
        </div>
        <div
          style={{
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: 8,
            padding: "10px 12px",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1E40AF" }}>
            {p.casesWon}
          </div>
          <div style={{ fontSize: 11, color: "#1D4ED8" }}>Cases Won</div>
        </div>
      </div>

      {/* Specialties */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.specialties.map((s) => (
          <span key={s} className="pill pill-gray">
            {s}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--border)",
          paddingTop: 14,
          marginTop: 4,
        }}
      >
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>
            From ${p.price}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
            ⚡ Responds {p.responseTime}
          </div>
        </div>
        <Link
          href={`/paralegals/${p.id}`}
          className="btn-primary"
          style={{ padding: "10px 20px", fontSize: 14 }}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

// ── Main homepage ──────────────────────────────────────────────────────────
export default function Home() {
  const [violation, setViolation] = useState("");

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

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <Link href="/how-it-works" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              How It Works
            </Link>
            <Link href="/paralegals/join" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              For Paralegals
            </Link>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/login" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              Sign In
            </Link>
            <Link href="/submit" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
              Fight My Ticket
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(160deg, #EEF2FF 0%, #FFFFFF 50%)",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <span className="pill pill-blue" style={{ fontSize: 13, padding: "6px 16px" }}>
              🇨🇦 Ontario&apos;s Traffic Ticket Experts
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              maxWidth: 800,
              margin: "0 auto 20px",
            }}
          >
            Got a ticket?
            <br />
            <span style={{ color: "#0d9488" }}>We&apos;ll fight it for you.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "var(--text-dim)",
              maxWidth: 580,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            GuidLaw&apos;s team of LSO-licensed paralegals handles your case from start to finish — court appearances included. You don&apos;t lift a finger.
          </p>

          {/* Search bar */}
          <div
            style={{
              maxWidth: 620,
              margin: "0 auto 40px",
              background: "white",
              border: "2px solid var(--border)",
              borderRadius: 14,
              padding: "8px 8px 8px 20px",
              display: "flex",
              gap: 8,
              alignItems: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <span style={{ fontSize: 20 }}>🔍</span>
            <select
              value={violation}
              onChange={(e) => setViolation(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 16,
                color: violation ? "var(--text)" : "var(--text-muted)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <option value="" disabled>
                What&apos;s your violation type?
              </option>
              {VIOLATION_TYPES.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <Link
              href={violation ? `/submit-ticket?violation=${encodeURIComponent(violation)}` : "/submit-ticket"}
              className="btn-primary"
              style={{ whiteSpace: "nowrap", borderRadius: 10, padding: "12px 24px" }}
            >
              Get a Free Review
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {[
              { icon: "✓", text: "Free case review" },
              { icon: "⚖️", text: "We appear in court for you" },
              { icon: "🔒", text: "No win? Explore options free" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text-dim)" }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── PRACTICE AREAS ──────────────────────────────────────────── */}
      <section className="section">
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
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "⚡", title: "Speeding", desc: "Minor to major speeding charges on any Ontario road." },
              { icon: "🚨", title: "Stunt Driving", desc: "50+ km/h over the limit. Immediate impoundment. We've beaten it." },
              { icon: "🔴", title: "Careless Driving", desc: "6 demerit points and major insurance impact. Fight it seriously." },
              { icon: "🚦", title: "Red Light & Stop Sign", desc: "Camera-issued or officer-issued. Both are contestable." },
              { icon: "📱", title: "Distracted Driving", desc: "Cellphone charges — 3 demerit points and steep fines." },
              { icon: "🛡️", title: "No Insurance", desc: "Minimum $5,000 fine. One of the most costly HTA violations." },
              { icon: "🪪", title: "Suspended Licence", desc: "Serious penalties. Proper legal defence matters here." },
              { icon: "🔀", title: "All HTA Violations", desc: "Lane changes, following too close, failing to yield, and more." },
            ].map((t) => (
              <div
                key={t.title}
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: 12,
                  padding: "22px 20px",
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 6 }}>{t.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/submit-ticket" className="btn-primary" style={{ padding: "14px 36px", fontSize: 15 }}>
              Get a Free Case Review
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
            {[
              { icon: "🆓", title: "Free Case Review", desc: "Submit your ticket and we'll review it at no charge. Know your options before you commit." },
              { icon: "🏛️", title: "We Go to Court for You", desc: "Our paralegals make all court appearances on your behalf. You never have to take a day off." },
              { icon: "🇨🇦", title: "Ontario-Wide Coverage", desc: "We handle tickets from Windsor to Ottawa and everywhere in between." },
              { icon: "📜", title: "LSO-Licensed Professionals", desc: "Every case is handled by a paralegal licensed with the Law Society of Ontario." },
              { icon: "💰", title: "Flat-Rate Pricing", desc: "Know exactly what you'll pay upfront. No surprises. No hourly billing." },
              { icon: "🏆", title: "Proven Results", desc: "Most of our cases result in a withdrawal, reduction, or dismissal." },
            ].map((b) => (
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
                <div style={{ fontSize: 32, flexShrink: 0 }}>{b.icon}</div>
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
      <section className="section-gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              Simple. Fast. Effective.
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
              How GuidLaw Works
            </h2>
            <p style={{ color: "var(--text-dim)", marginTop: 10, fontSize: 16, maxWidth: 480, margin: "10px auto 0" }}>
              From ticket to tribunal — we handle everything. You just show up to pay less.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { step: "01", icon: "📋", title: "Submit Your Ticket", desc: "Enter your violation details — type of offence, date, fine amount. Takes 2 minutes." },
              { step: "02", icon: "🤝", title: "We Match You", desc: "GuidLaw reviews your case and assigns the best available LSO-licensed paralegal for your violation type." },
              { step: "03", icon: "⚖️", title: "They Fight It", desc: "Your paralegal represents you at the tribunal. You don't have to take a day off or step into a courtroom." },
              { step: "04", icon: "🎉", title: "Case Closed", desc: "Most tickets are dismissed or significantly reduced. You pay only through GuidLaw — secure and protected." },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: 14,
                  padding: "28px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: 40, fontWeight: 900, color: "#F3F4F6", lineHeight: 1 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: "var(--text)" }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/submit" className="btn-primary" style={{ padding: "16px 40px", fontSize: 16 }}>
              Submit My Ticket — Free to Start
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
              Why GuidLaw vs. Going It Alone
            </h2>
            <p style={{ color: "var(--text-dim)", marginTop: 10, fontSize: 16 }}>
              The average Canadian who contests their ticket without help loses 70% of the time.
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
                  { label: "Success rate", alone: "~30%", guidlaw: "Significantly higher", highlight: true },
                  { label: "Time to find help", alone: "Days of research", guidlaw: "Under 2 hours", highlight: false },
                  { label: "Day off work needed?", alone: "Yes — mandatory", guidlaw: "No — we go for you", highlight: true },
                  { label: "Demerit point risk", alone: "High", guidlaw: "Minimized", highlight: false },
                  { label: "Insurance impact", alone: "Full impact if guilty", guidlaw: "Often fully avoided", highlight: true },
                  { label: "Cost", alone: "Fine + lost wages", guidlaw: "From $179 flat rate", highlight: false },
                  { label: "Payment protection", alone: "None", guidlaw: "Secure escrow via Stripe", highlight: true },
                ].map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: "14px 20px", background: row.highlight ? "#F8F9FB" : "white", border: "1.5px solid var(--border)", fontWeight: 600, color: "var(--text)" }}>
                      {row.label}
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "center", background: row.highlight ? "#F8F9FB" : "white", border: "1.5px solid var(--border)", color: "#DC2626" }}>
                      {row.alone}
                    </td>
                    <td style={{ padding: "14px 24px", textAlign: "center", background: row.highlight ? "#EEF2FF" : "#F8FBFF", border: "1.5px solid #C7D7FD", color: "#1D4ED8", fontWeight: 600 }}>
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

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="section-gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              Real Results
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
              Drivers Love GuidLaw
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div style={{ fontSize: 24, color: "#F59E0B" }}>★★★★★</div>
                <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{t.city}, ON</div>
                  </div>
                  <span className="pill pill-green" style={{ fontSize: 11 }}>
                    ✓ {t.outcome}
                  </span>
                </div>
              </div>
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
              <div style={{ fontSize: 12, fontWeight: 600, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
                Grow Your Practice
              </div>
              <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 12 }}>
                Are you a licensed paralegal?
              </h2>
              <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.6, maxWidth: 500 }}>
                Join GuidLaw&apos;s network of LSO-licensed paralegals. We send you cases — no cold outreach, no marketing overhead. Focus on the work, we handle the rest.
              </p>
              <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
                {["No cold outreach needed", "Paid securely through platform", "Build your reputation with reviews"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#CBD5E1" }}>
                    <span style={{ color: "#34D399" }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/paralegals/join"
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
                Ontario&apos;s traffic ticket defence team. Licensed. Trusted.
              </p>
            </div>
            {[
              { title: "For Drivers", links: ["Submit a Ticket", "How It Works", "Practice Areas", "Pricing"] },
              { title: "For Paralegals", links: ["Apply to Join", "How It Works", "Pricing", "Support"] },
              { title: "Company", links: ["About Us", "Blog", "Privacy Policy", "Terms of Service"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 14 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((l) => (
                    <Link key={l} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>{l}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              © 2026 GuidLaw Technologies Inc. (1001699754 Ontario Inc.) · Mississauga, ON ·{" "}
              <Link href="mailto:guidlawtechnologies@gmail.com" style={{ color: "rgba(255,255,255,0.3)" }}>
                guidlawtechnologies@gmail.com
              </Link>
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              GuidLaw is a technology platform, not a law firm. Paralegals are licensed with the Law Society of Ontario.
            </p>
          </div>
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
