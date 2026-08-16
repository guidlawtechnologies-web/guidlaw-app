import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES, CATCH_ALL, SEVERITY_LEGEND } from "@/content/services";
import { IconBadge } from "@/components/Icon";
import { SiteNav, SiteFooter, PageHeader, CtaBand } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Traffic Ticket Services | Every Ontario HTA Charge | GuidLaw",
  description:
    "Speeding, careless driving, stunt driving, distracted driving, suspended licence, no insurance, school bus, HOV, following too closely and more. Every Highway Traffic Act charge, with the real fines and demerit points.",
};

export default function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <SiteNav />

      <PageHeader
        eyebrow="What we handle"
        title="Every Highway Traffic Act charge"
        lede="The fines and demerit points below are the real ones. Find your charge, or send us the ticket and we'll tell you exactly what it carries."
      />

      {/* ── Legend ── */}
      <div style={{ background: "#faf8f2", borderBottom: "1px solid #eae7dd", padding: "0 24px 28px" }}>
        <div className="container" style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          {SEVERITY_LEGEND.map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#86867c" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: l.tone, display: "inline-block" }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))", gap: 18 }}>
            {SERVICES.map((s) => (
              <article
                key={s.slug}
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: 14,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <IconBadge name={s.icon} tone={s.tone} size={44} iconSize={22} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", lineHeight: 1.3, marginBottom: 3 }}>
                      {s.title}
                    </h2>
                    <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{s.section}</div>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 18, flex: 1 }}>
                  {s.blurb}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "var(--text)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{s.fine}</span>
                  <span style={{ color: "var(--text-muted)" }}>{s.points}</span>
                </div>
              </article>
            ))}

            {/* Catch-all */}
            <article
              style={{
                background: "#faf8f2",
                border: "1.5px dashed #d8d4c6",
                borderRadius: 14,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2 className="gl-serif" style={{ fontSize: 19, fontWeight: 500, color: "#0F172A", marginBottom: 10, letterSpacing: "-0.3px" }}>
                {CATCH_ALL.title}
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 16 }}>
                {CATCH_ALL.blurb}
              </p>
              <Link href="/submit-ticket" style={{ fontSize: 13.5, fontWeight: 600, color: "#0d9488", textDecoration: "none" }}>
                Send it to us →
              </Link>
            </article>
          </div>

          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 32, maxWidth: 700 }}>
            Fines shown are set fines — the out-of-court amount — and exclude the victim fine
            surcharge and court costs. Several offences carry no set fine and are left to the
            court&apos;s discretion. Figures reflect the Highway Traffic Act at the time of writing
            and can change.
          </p>
        </div>
      </section>

      <CtaBand
        title="Not sure which one you've got?"
        body="Send us a photo of the ticket. We'll identify the charge, tell you what it carries, and quote you — free."
      />

      <SiteFooter />
    </div>
  );
}
