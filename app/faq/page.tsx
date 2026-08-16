import Link from "next/link";
import type { Metadata } from "next";
import { FAQS, faqJsonLd } from "@/content/faqs";
import { POSTS } from "@/content/posts";
import { SiteNav, SiteFooter, PageHeader, CtaBand, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Traffic Ticket FAQ | GuidLaw Ontario",
  description:
    "Do you have to go to court? What does it cost? Is a paralegal as good as a lawyer? Straight answers about fighting Highway Traffic Act charges in Ontario.",
};

export default function FaqPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      {/* FAQPage schema lives here, on the canonical FAQ page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <SiteNav />

      <PageHeader
        eyebrow="Questions"
        title="Straight answers"
        lede="The things drivers ask us before they decide whether to fight a ticket. If yours isn't here, call and ask."
      />

      {/* ── Accordion ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          {FAQS.map((f, i) => (
            <details key={f.q} className="faq-item" style={{ borderBottom: "1px solid var(--border)" }} open={i === 0}>
              <summary
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  padding: "22px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                  fontSize: 17.5,
                  fontWeight: 600,
                  color: "#0F172A",
                }}
              >
                <span>{f.q}</span>
                <span className="faq-mark" style={{ color: "#0d9488", fontSize: 23, flexShrink: 0, lineHeight: 1, fontWeight: 400 }}>
                  +
                </span>
              </summary>
              <p style={{ fontSize: 16.5, color: "var(--text-dim)", lineHeight: 1.8, padding: "0 0 24px", margin: 0, maxWidth: 680 }}>
                {f.a}
              </p>
            </details>
          ))}

          {/* Still stuck */}
          <div
            style={{
              marginTop: 40,
              padding: "28px 26px",
              background: "#faf8f2",
              border: "1px solid #eae7dd",
              borderRadius: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="gl-serif" style={{ fontSize: 22, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.4px" }}>
                Question not answered here?
              </div>
              <p style={{ fontSize: 15, color: "var(--text-dim)", margin: 0, lineHeight: 1.6, maxWidth: 400 }}>
                Call and ask. You don&apos;t have to hire us to get a straight answer about your
                ticket.
              </p>
            </div>
            <a href={PHONE_HREF} className="btn-primary" style={{ padding: "14px 28px", fontSize: 15, whiteSpace: "nowrap" }}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ── Charge-specific guides ── */}
      <section className="section-gray">
        <div className="container">
          <div style={{ marginBottom: 30 }}>
            <h2 className="gl-serif" style={{ fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.7px", marginBottom: 10 }}>
              Questions about a specific charge
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--text-dim)", maxWidth: 520, lineHeight: 1.7 }}>
              These guides cover what individual Highway Traffic Act sections carry and what
              realistically happens when you fight them.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
            {POSTS.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                <article className="card" style={{ padding: "22px 20px", height: "100%", background: "white" }}>
                  <span className="pill pill-blue" style={{ fontSize: 11, marginBottom: 12, display: "inline-flex" }}>{p.section}</span>
                  <h3 className="gl-serif" style={{ fontSize: 18.5, fontWeight: 500, color: "#0F172A", lineHeight: 1.25, letterSpacing: "-0.3px", marginBottom: 8 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.6 }}>{p.excerpt.slice(0, 96)}…</p>
                </article>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 26 }}>
            <Link href="/blog" style={{ fontSize: 14.5, fontWeight: 600, color: "#0d9488", textDecoration: "none" }}>
              All guides →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Still deciding?"
        body="Send us the ticket. The review is free, and we'll tell you honestly whether fighting it is worth the fee."
      />

      <SiteFooter />

      <style>{`
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item[open] .faq-mark { transform: rotate(45deg); }
        .faq-item .faq-mark { transition: transform 0.18s ease; display: inline-block; }
        .faq-item summary:hover { color: #0d9488; }
      `}</style>
    </div>
  );
}
