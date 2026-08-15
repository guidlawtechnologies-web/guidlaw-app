// Shared nav + footer for pages outside the homepage (blog, etc.)
// so they don't drift from the homepage chrome.

import Link from "next/link";
import { GuidLawLogo } from "@/components/GuidLawLogo";

export const PHONE_DISPLAY = "+1 437 982 7146";
export const PHONE_HREF = "tel:+14379827146";

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

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <Link href="/#how-it-works" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            How It Works
          </Link>
          <Link href="/blog" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Blog
          </Link>
          <Link href="/#faq" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            FAQ
          </Link>
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
                <Link href="/#practice-areas" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>Practice Areas</Link>
                <Link href="/#faq" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>FAQ</Link>
                <Link href="/blog" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>Blog</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
                Company
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/#about" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>About</Link>
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
