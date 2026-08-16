import type { Metadata } from "next";
import { SERVICES, SERVICES_ORDERED, CATCH_ALL, SEVERITY_LEGEND } from "@/content/services";
import { ServiceCard, ServiceCatchAll } from "@/components/ServiceCard";
import { SiteNav, SiteFooter, PageHeader, CtaBand } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Every Ontario HTA Charge We Handle",
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
          <div className="svc-grid">
            {SERVICES_ORDERED.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
            <ServiceCatchAll title={CATCH_ALL.title} blurb={CATCH_ALL.blurb} />
          </div>

          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 32, maxWidth: 700 }}>
            Fines shown are set fines — the out-of-court amount — and exclude the victim fine
            surcharge and court costs. Several offences carry no set fine and are left to the
            court&apos;s discretion. Figures reflect the Highway Traffic Act at the time of writing
            and can change. {SERVICES.length} charges listed.
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
