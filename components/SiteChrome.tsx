// Shared nav + footer for pages outside the homepage (blog, etc.)
// so they don't drift from the homepage chrome.

import Link from "next/link";
import { GuidLawLogo } from "@/components/GuidLawLogo";

export const PHONE_DISPLAY = "+1 437 982 7146";
export const PHONE_HREF = "tel:+14379827146";

// Single source of truth for the header. Every entry is a real page.
export const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

/** Cream page header used by every interior page. */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <section style={{ background: "#faf8f2", borderBottom: "1px solid #eae7dd", padding: "72px 24px 60px" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500 }}>
          <span style={{ width: 36, height: 1, background: "#0d9488", display: "inline-block" }} />
          <span style={{ color: "#0d9488" }}>{eyebrow}</span>
        </div>
        <h1
          className="gl-serif"
          style={{ fontWeight: 500, lineHeight: 1.02, letterSpacing: "-1.5px", color: "#0F172A", fontSize: "clamp(36px, 5.6vw, 60px)", margin: "0 0 20px", maxWidth: 800 }}
        >
          {title}
        </h1>
        {lede && (
          <p style={{ fontSize: 17.5, color: "#4a4a44", lineHeight: 1.65, maxWidth: 580, margin: 0 }}>{lede}</p>
        )}
      </div>
    </section>
  );
}

/** Teal call-to-action band used at the foot of interior pages. */
export function CtaBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section style={{ background: "#0d9488", padding: "64px 24px", textAlign: "center" }}>
      <div className="container">
        <h2 className="gl-serif" style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 500, color: "white", letterSpacing: "-0.8px", marginBottom: 14 }}>
          {title}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.65 }}>
          {body}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/submit-ticket"
            style={{ background: "white", color: "var(--navy)", fontSize: 15, fontWeight: 600, padding: "14px 30px", borderRadius: 8, textDecoration: "none" }}
          >
            Get a free review
          </Link>
          <a
            href={PHONE_HREF}
            style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white", fontSize: 15, fontWeight: 600, padding: "14px 30px", borderRadius: 8, textDecoration: "none" }}
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteNav() {
  return (
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
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}
      >
        <GuidLawLogo size={38} variant="dark" />

        <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href={PHONE_HREF} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            {PHONE_DISPLAY}
          </a>
          <Link href="/submit-ticket" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
            Fight My Ticket
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--navy)", padding: "56px 24px 32px", color: "rgba(255,255,255,0.7)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginBottom: 40 }}>
          <div style={{ maxWidth: 300 }}>
            <GuidLawLogo size={34} variant="dark" />
            <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 14, color: "rgba(255,255,255,0.55)" }}>
              Ontario traffic ticket defence. Submit your ticket and an LSO-licensed paralegal handles
              it from start to finish.
            </p>
            <a
              href={PHONE_HREF}
              style={{ display: "inline-block", marginTop: 14, color: "#5eead4", textDecoration: "none", fontSize: 15, fontWeight: 600 }}
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
                For Drivers
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/submit-ticket" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>Submit a Ticket</Link>
                <Link href="/how-it-works" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>How It Works</Link>
                <Link href="/#practice-areas" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>Practice Areas</Link>
                <Link href="/faq" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>FAQ</Link>
                <Link href="/blog" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>Blog</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
                Company
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/about" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>About</Link>
                <Link href="/privacy" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>Privacy</Link>
                <a href="mailto:info@guidlaw.ca" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>info@guidlaw.ca</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            © {new Date().getFullYear()} GuidLaw Technologies Inc. All rights reserved.
          </p>
          <p>
            Information on this site is general and is not legal advice. Reading it does not create a
            paralegal-client relationship. Fines and penalties cited reflect the Highway Traffic Act
            at the time of writing and can change.
          </p>
        </div>
      </div>
    </footer>
  );
}
