"use client";

import Link from "next/link";
import { useState } from "react";
import { GuidLawLogo } from "@/components/GuidLawLogo";
import { IconBadge } from "@/components/Icon";
import { FAQS, faqJsonLd } from "@/content/faqs";
import { POSTS } from "@/content/posts";

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
      {/* FAQPage schema — lets Google surface these answers directly in search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
            <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              How It Works
            </a>
            <a href="#about" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              About
            </a>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              Blog
            </Link>
            <a href="#faq" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              FAQ
            </a>
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

            {/* Hidden violation select — keep for form flow, invisible on desktop */}
            <div style={{ display: "none" }}>
              <select value={violation} onChange={(e) => setViolation(e.target.value)}>
                <option value="">All</option>
                {VIOLATION_TYPES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
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
              {[
                { tone: "#CA8A04", label: "Standard" },
                { tone: "#EA580C", label: "Serious" },
                { tone: "#DC2626", label: "Most severe" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-dim)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.tone, display: "inline-block" }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {([
              // Ordered standard → most severe, tone follows the same scale.
              { icon: "speeding", tone: "yellow", title: "Speeding", desc: "Minor to major speeding charges on any Ontario road." },
              { icon: "signal", tone: "yellow", title: "Red Light & Stop Sign", desc: "Camera-issued or officer-issued. Both are contestable." },
              { icon: "phone", tone: "yellow", title: "Distracted Driving", desc: "Cellphone charges — 3 demerit points and steep fines." },
              { icon: "shuffle", tone: "yellow", title: "All HTA Violations", desc: "Lane changes, following too close, failing to yield, and more." },
              { icon: "careless", tone: "orange", title: "Careless Driving", desc: "6 demerit points and major insurance impact. Fight it seriously." },
              { icon: "id-card", tone: "orange", title: "Suspended Licence", desc: "Serious penalties. Proper legal defence matters here." },
              { icon: "stunt", tone: "red", title: "Stunt Driving", desc: "50+ km/h over the limit. Immediate impoundment. We've beaten it." },
              { icon: "shield", tone: "red", title: "No Insurance", desc: "Minimum $5,000 fine. One of the most costly HTA violations." },
            ] as const).map((t) => (
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
                <div style={{ marginBottom: 14 }}><IconBadge name={t.icon} tone={t.tone} size={40} iconSize={20} /></div>
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
            {([
              { icon: "spark", title: "Free Case Review", desc: "Submit your ticket and we'll review it at no charge. Know your options before you commit." },
              { icon: "gavel", title: "We Go to Court for You", desc: "Our paralegals make all court appearances on your behalf. You never have to take a day off." },
              { icon: "map-pin", title: "Ontario-Wide Coverage", desc: "We handle tickets from Windsor to Ottawa and everywhere in between." },
              { icon: "certificate", title: "LSO-Licensed Professionals", desc: "Every case is handled by a paralegal licensed with the Law Society of Ontario." },
              { icon: "tag", title: "Flat-Rate Pricing", desc: "Know exactly what you'll pay upfront. No surprises. No hourly billing." },
              { icon: "trophy", title: "Proven Results", desc: "Most of our cases result in a withdrawal, reduction, or dismissal." },
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
              <p style={{ fontSize: 16.5, color: "#4a4a44", lineHeight: 1.75, marginBottom: 30, maxWidth: 520 }}>
                GuidLaw removes every one of those excuses. Send a photo of your ticket. We assign an
                LSO-licensed paralegal, they handle the filings and the negotiation, and they appear
                in court so you don&apos;t have to.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 26, borderTop: "1px solid #e5e1d5" }}>
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
            {FAQS.map((f, i) => (
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

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 18 }}>
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
