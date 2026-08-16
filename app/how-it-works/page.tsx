import Link from "next/link";
import type { Metadata } from "next";
import { STEPS } from "@/content/process";
import { IconBadge } from "@/components/Icon";
import { SiteNav, SiteFooter, PageHeader, CtaBand } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "How It Works | GuidLaw Ontario Traffic Ticket Defence",
  description:
    "Send us your ticket, get a free review and a flat-fee quote, and an LSO-licensed paralegal handles the filings, disclosure, and court appearance. Here's each step.",
};

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <SiteNav />

      <PageHeader
        eyebrow="The process"
        title="Four steps, and you attend none of them"
        lede="From the moment you send us the ticket to the day it resolves, here is exactly what happens and who does what."
      />

      {/* ── Steps ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 28,
                paddingBottom: i === STEPS.length - 1 ? 0 : 44,
                marginBottom: i === STEPS.length - 1 ? 0 : 44,
                borderBottom: i === STEPS.length - 1 ? "none" : "1px solid var(--border)",
              }}
              className="step-row"
            >
              {/* Rail */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <IconBadge name={s.icon} size={52} iconSize={24} />
                <div className="gl-serif" style={{ fontSize: 15, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
                  {s.n}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                  <h2 className="gl-serif" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.6px", margin: 0 }}>
                    {s.title}
                  </h2>
                  <span className="pill pill-blue" style={{ fontSize: 11.5 }}>{s.timing}</span>
                </div>
                {s.detail.map((d, j) => (
                  <p key={j} style={{ fontSize: 16.5, color: "var(--text-dim)", lineHeight: 1.8, margin: "0 0 14px" }}>
                    {d}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What you actually do ── */}
      <section className="section-gray">
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 className="gl-serif" style={{ fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.7px", marginBottom: 10 }}>
            What you actually have to do
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 28, maxWidth: 560 }}>
            The whole point is that this list is short.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            {[
              { t: "Send a photo of the ticket", d: "That's the only thing we genuinely need from you." },
              { t: "Answer a few questions", d: "Only if your paralegal needs detail about what happened." },
              { t: "Approve the quote", d: "One flat number. Say yes or don't — no pressure either way." },
            ].map((x) => (
              <div key={x.t} className="card" style={{ padding: "24px 22px", background: "white" }}>
                <div style={{ fontWeight: 700, fontSize: 15.5, color: "var(--text)", marginBottom: 8 }}>{x.t}</div>
                <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, margin: 0 }}>{x.d}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 26,
              padding: "22px 24px",
              background: "#f0fdfa",
              border: "1px solid rgba(13,148,136,0.2)",
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f766e", marginBottom: 8 }}>
              Watch the 15-day deadline
            </div>
            <p style={{ fontSize: 15.5, color: "#4a4a44", lineHeight: 1.7, margin: 0 }}>
              You generally have 15 days from the date on the ticket to file your intention to
              dispute. Miss it and a conviction can be registered against you. If your 15 days have
              already passed there may still be options, but contact us immediately rather than
              waiting.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Start with the free review"
        body="Send us the ticket. You'll know what you're facing and what it costs before you commit to anything."
      />

      <SiteFooter />

      <style>{`
        @media (max-width: 640px) {
          .step-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  );
}
