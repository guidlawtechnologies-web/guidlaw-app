import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/content/posts";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Ontario Traffic Ticket Guides | GuidLaw Blog",
  description:
    "Plain-language guides to Ontario Highway Traffic Act charges — winter driving offences, careless driving, speeding, and what actually gets tickets dropped.",
};

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const [lead, ...rest] = POSTS;

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <SiteNav />

      {/* ── Header ── */}
      <section style={{ background: "#faf8f2", borderBottom: "1px solid #eae7dd", padding: "72px 24px 60px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500 }}>
            <span style={{ width: 36, height: 1, background: "#0d9488", display: "inline-block" }} />
            <span style={{ color: "#0d9488" }}>Guides</span>
          </div>
          <h1
            className="gl-serif"
            style={{ fontWeight: 500, lineHeight: 1.02, letterSpacing: "-1.5px", color: "#0F172A", fontSize: "clamp(38px, 6vw, 64px)", margin: "0 0 20px", maxWidth: 760 }}
          >
            What the Highway Traffic Act actually says
          </h1>
          <p style={{ fontSize: 17, color: "#4a4a44", lineHeight: 1.65, maxWidth: 560 }}>
            Straight explanations of the charges Ontario drivers get, what they cost, and what
            realistically happens when you fight them.
          </p>
        </div>
      </section>

      {/* ── Lead post ── */}
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Link href={`/blog/${lead.slug}`} style={{ textDecoration: "none", display: "block" }}>
            <article
              style={{
                border: "1.5px solid var(--border)",
                borderRadius: 16,
                padding: "clamp(28px, 4vw, 48px)",
                background: "white",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 40,
                alignItems: "center",
              }}
              className="lead-post"
            >
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
                  <span className="pill pill-blue" style={{ fontSize: 11 }}>{lead.category}</span>
                  <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{formatDate(lead.date)} · {lead.readTime}</span>
                </div>
                <h2 className="gl-serif" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.8px", lineHeight: 1.12, marginBottom: 14 }}>
                  {lead.title}
                </h2>
                <p style={{ fontSize: 15.5, color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 560, marginBottom: 20 }}>
                  {lead.excerpt}
                </p>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0d9488" }}>Read the guide →</span>
              </div>

              <div
                style={{
                  background: "#faf8f2",
                  border: "1px solid #eae7dd",
                  borderRadius: 12,
                  padding: "22px 26px",
                  minWidth: 190,
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: 4 }}>Section</div>
                  <div className="gl-serif" style={{ fontSize: 20, color: "#0F172A" }}>{lead.section}</div>
                </div>
                <div style={{ height: 1, background: "#eae7dd" }} />
                <div>
                  <div style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: 4 }}>Penalty</div>
                  <div className="gl-serif" style={{ fontSize: 20, color: "#0F172A" }}>{lead.fine}</div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* ── Remaining posts ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                <article
                  className="card"
                  style={{ padding: "26px 24px", height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                    <span className="pill pill-blue" style={{ fontSize: 11 }}>{p.category}</span>
                  </div>
                  <h3 className="gl-serif" style={{ fontSize: 21, fontWeight: 500, color: "#0F172A", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: 10 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 18, flex: 1 }}>
                    {p.excerpt}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{p.section}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0d9488" }}>{p.fine}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#0d9488", padding: "64px 24px", textAlign: "center" }}>
        <div className="container">
          <h2 className="gl-serif" style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 500, color: "white", letterSpacing: "-0.8px", marginBottom: 14 }}>
            Got one of these tickets?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.65 }}>
            Send it to us. We&apos;ll tell you what you&apos;re actually facing and what it costs to fight — free.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/submit-ticket"
              style={{ background: "white", color: "var(--navy)", fontSize: 15, fontWeight: 600, padding: "14px 30px", borderRadius: 8, textDecoration: "none" }}
            >
              Get a free review
            </Link>
            <a
              href="tel:+14379827146"
              style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white", fontSize: 15, fontWeight: 600, padding: "14px 30px", borderRadius: 8, textDecoration: "none" }}
            >
              Call +1 437 982 7146
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        @media (max-width: 820px) {
          .lead-post { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
