import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService, TONE_HEX } from "@/content/services";
import { ServiceCard } from "@/components/ServiceCard";
import { SiteNav, SiteFooter, CtaBand, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteChrome";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} Ticket Ontario (${s.section}) — Fines & Defence`,
    description: `${s.title} under ${s.section} carries ${s.fine} and ${s.points}. ${s.blurb} Free case review from LSO-licensed paralegals.`,
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const sev = TONE_HEX[s.tone];
  const related = SERVICES.filter((x) => x.slug !== slug && x.tone === s.tone).slice(0, 3);
  const others = related.length
    ? related
    : SERVICES.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <SiteNav />

      {/* ── Header ── */}
      <section
        style={{
          position: "relative",
          background: "#0b1420",
          overflow: "hidden",
          borderBottom: `3px solid ${sev}`,
        }}
      >
        {s.photo && (
          <img
            src={`/services/${s.photo}`}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(62%) brightness(0.34) contrast(1.05)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,13,22,0.95) 0%, rgba(7,13,22,0.78) 50%, rgba(7,13,22,0.62) 100%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "56px 24px 52px" }}>
          <Link
            href="/services"
            style={{ fontSize: 13.5, color: "#5eead4", textDecoration: "none", fontWeight: 600, display: "inline-block", marginBottom: 22 }}
          >
            ← All charges
          </Link>

          <div
            style={{
              display: "inline-block",
              padding: "9px 16px",
              borderRadius: 9,
              marginBottom: 16,
              fontSize: "clamp(20px, 3vw, 27px)",
              fontWeight: 700,
              color: "#fff",
              background: `color-mix(in srgb, ${sev} 30%, transparent)`,
              border: `1px solid color-mix(in srgb, ${sev} 62%, transparent)`,
            }}
          >
            {s.title}
          </div>

          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>
            {s.section} · Ontario
          </div>

          <p style={{ fontSize: 17.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, maxWidth: 620, margin: "0 0 30px" }}>
            {s.blurb}
          </p>

          {/* Penalty strip */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
            {s.rows.map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 600, marginBottom: 5 }}>
                  {k}
                </div>
                <div className="gl-serif" style={{ fontSize: 21, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Defence ── */}
      <article style={{ padding: "56px 24px 64px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500 }}>
            <span style={{ width: 36, height: 1, background: "#0d9488", display: "inline-block" }} />
            <span style={{ color: "#0d9488" }}>How we fight it</span>
          </div>

          {s.defence.map((p, i) => (
            <p key={i} style={{ fontSize: 16.5, color: "var(--text-dim)", lineHeight: 1.8, margin: "0 0 20px" }}>
              {p}
            </p>
          ))}

          <div
            style={{
              marginTop: 40,
              padding: 32,
              background: "#0F172A",
              borderRadius: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="gl-serif" style={{ fontSize: 24, color: "white", marginBottom: 6, letterSpacing: "-0.4px" }}>
                Charged under {s.section}?
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6, maxWidth: 380 }}>
                Send us the ticket. We&apos;ll tell you what you&apos;re facing and what it costs to
                fight it — free.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/submit-ticket" style={{ background: "#0d9488", color: "white", fontSize: 14, fontWeight: 600, padding: "13px 24px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
                Free review
              </Link>
              <a href={PHONE_HREF} style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "white", fontSize: 14, fontWeight: 600, padding: "13px 24px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            General information about Ontario law, not legal advice for your situation. Set fines
            exclude the victim fine surcharge and court costs, and reflect the Highway Traffic Act
            at the time of writing. Speak to a licensed paralegal about your specific charge.
          </p>
        </div>
      </article>

      {/* ── Related ── */}
      <section className="section-gray">
        <div className="container">
          <h2 className="gl-serif" style={{ fontSize: 26, fontWeight: 500, color: "#0F172A", letterSpacing: "-0.5px", marginBottom: 24 }}>
            Related charges
          </h2>
          <div className="svc-grid">
            {others.map((x) => (
              <ServiceCard key={x.slug} s={x} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure what you're facing?"
        body="Send us a photo of the ticket. The review is free, and we'll tell you honestly whether fighting it is worth the fee."
      />

      <SiteFooter />
    </div>
  );
}
