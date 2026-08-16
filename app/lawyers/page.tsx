import Link from "next/link";
import type { Metadata } from "next";
import { IconBadge } from "@/components/Icon";
import { SiteNav, SiteFooter, PageHeader, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "For Paralegals — Work With Us",
  description:
    "GuidLaw sends Ontario paralegals pre-screened Highway Traffic Act files. No marketing spend, no intake, no chasing payment. Licensed P1 paralegals only.",
};

const POINTS = [
  {
    icon: "upload" as const,
    title: "Files arrive screened",
    body:
      "We handle intake. You receive the ticket, the offence details, the court, and the client's account of what happened — already collected and organised before it reaches you.",
  },
  {
    icon: "tag" as const,
    title: "You're paid a flat fee per file",
    body:
      "Agreed before you accept the matter. GuidLaw collects from the client, so you're not invoicing individuals or chasing anyone for payment.",
  },
  {
    icon: "user-check" as const,
    title: "Take what fits your calendar",
    body:
      "Files are offered based on the court and the offence type. You accept the ones that work with your schedule and decline the rest. No minimum volume.",
  },
  {
    icon: "scale" as const,
    title: "You run the matter",
    body:
      "It's your file and your professional judgment. GuidLaw handles intake, payment, and client communication. Disclosure, strategy, and the appearance are yours.",
  },
];

export default function ForParalegalsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <SiteNav />

      <PageHeader
        eyebrow="For paralegals"
        title="You do the legal work. We do everything around it."
        lede="GuidLaw finds the clients, screens the files, and collects the fees. You take the matters that fit your practice and appear on them."
      />

      {/* ── Value points ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 22 }}>
            {POINTS.map((p) => (
              <div key={p.title} className="card" style={{ padding: "28px 26px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                <IconBadge name={p.icon} size={46} iconSize={23} />
                <div>
                  <h2 style={{ fontWeight: 700, fontSize: 17, color: "var(--text)", marginBottom: 8 }}>{p.title}</h2>
                  <p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.7, margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ── */}
      <section className="section-gray">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="req-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 className="gl-serif" style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.7px", marginBottom: 16 }}>
                Who we&apos;re looking for
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {[
                  "Licensed P1 paralegal in good standing with the Law Society of Ontario",
                  "Current professional liability insurance",
                  "Experience in Provincial Offences Court",
                  "Able to appear in at least one Ontario court region",
                ].map((r) => (
                  <div key={r} style={{ display: "flex", gap: 11, fontSize: 15.5, color: "var(--text-dim)", lineHeight: 1.65 }}>
                    <span style={{ color: "#0d9488", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="gl-serif" style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.7px", marginBottom: 16 }}>
                What we&apos;re straight about
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--text-dim)", lineHeight: 1.75, marginBottom: 14 }}>
                GuidLaw launched in 2026. We are building the client side now, which means early
                volume will be modest and will grow as we do.
              </p>
              <p style={{ fontSize: 15.5, color: "var(--text-dim)", lineHeight: 1.75 }}>
                If you want a firm promising you a full calendar from day one, that isn&apos;t us. If
                you want to be first in a network being built deliberately, get in touch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
          <h2 className="gl-serif" style={{ fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.8px", marginBottom: 14 }}>
            Get in touch
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 30 }}>
            Send your licence number and the court regions you cover. We&apos;ll follow up with fee
            structure and how files are assigned.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 30 }}>
            <a href="mailto:info@guidlaw.ca?subject=Paralegal%20application" className="btn-primary" style={{ padding: "14px 30px", fontSize: 15 }}>
              info@guidlaw.ca
            </a>
            <a
              href={PHONE_HREF}
              style={{ border: "1.5px solid var(--border)", color: "var(--text)", fontSize: 15, fontWeight: 600, padding: "13px 30px", borderRadius: 8, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
            Looking to fight your own ticket instead?{" "}
            <Link href="/submit-ticket" style={{ color: "#0d9488", textDecoration: "none", fontWeight: 600 }}>
              Submit it here
            </Link>
            .
          </p>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        @media (max-width: 760px) {
          .req-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
