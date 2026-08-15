import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { POSTS, getPost, type Block } from "@/content/posts";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | GuidLaw`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "h2") {
          return (
            <h2
              key={i}
              className="gl-serif"
              style={{
                fontSize: "clamp(22px, 2.8vw, 28px)",
                fontWeight: 500,
                color: "#0F172A",
                letterSpacing: "-0.5px",
                lineHeight: 1.25,
                margin: "44px 0 14px",
              }}
            >
              {b.text}
            </h2>
          );
        }
        if (b.t === "ul") {
          return (
            <ul key={i} style={{ margin: "0 0 22px", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {b.items.map((item, j) => (
                <li key={j} style={{ display: "flex", gap: 12, fontSize: 16.5, color: "var(--text-dim)", lineHeight: 1.7 }}>
                  <span style={{ color: "#0d9488", flexShrink: 0, marginTop: 1 }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.t === "quote") {
          return (
            <blockquote
              key={i}
              style={{
                margin: "26px 0",
                padding: "20px 24px",
                background: "#faf8f2",
                borderLeft: "3px solid #0d9488",
                borderRadius: "0 8px 8px 0",
              }}
            >
              <p style={{ fontSize: 16, color: "#4a4a44", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
                {b.text}
              </p>
              {b.cite && (
                <cite style={{ display: "block", marginTop: 10, fontSize: 13, color: "var(--text-muted)", fontStyle: "normal" }}>
                  {b.cite}
                </cite>
              )}
            </blockquote>
          );
        }
        if (b.t === "callout") {
          return (
            <div
              key={i}
              style={{
                margin: "32px 0",
                padding: "22px 24px",
                background: "#f0fdfa",
                border: "1px solid rgba(13,148,136,0.2)",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f766e", marginBottom: 8 }}>{b.title}</div>
              <p style={{ fontSize: 15.5, color: "#4a4a44", lineHeight: 1.7, margin: 0 }}>{b.text}</p>
            </div>
          );
        }
        return (
          <p key={i} style={{ fontSize: 16.5, color: "var(--text-dim)", lineHeight: 1.8, margin: "0 0 20px" }}>
            {b.text}
          </p>
        );
      })}
    </>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "GuidLaw Technologies Inc." },
    publisher: { "@type": "Organization", name: "GuidLaw" },
  };

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />

      {/* ── Article header ── */}
      <section style={{ background: "#faf8f2", borderBottom: "1px solid #eae7dd", padding: "48px 24px 52px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Link href="/blog" style={{ fontSize: 13.5, color: "#0d9488", textDecoration: "none", fontWeight: 600, display: "inline-block", marginBottom: 24 }}>
            ← All guides
          </Link>

          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
            <span className="pill pill-blue" style={{ fontSize: 11 }}>{post.category}</span>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {formatDate(post.date)} · {post.readTime}
            </span>
          </div>

          <h1
            className="gl-serif"
            style={{
              fontWeight: 500,
              lineHeight: 1.06,
              letterSpacing: "-1.4px",
              color: "#0F172A",
              fontSize: "clamp(32px, 5.2vw, 52px)",
              margin: "0 0 20px",
            }}
          >
            {post.title}
          </h1>

          <p style={{ fontSize: 18, color: "#4a4a44", lineHeight: 1.65, margin: 0 }}>{post.excerpt}</p>

          <div style={{ display: "flex", gap: 28, marginTop: 28, paddingTop: 24, borderTop: "1px solid #eae7dd", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: 3 }}>Section</div>
              <div className="gl-serif" style={{ fontSize: 19, color: "#0F172A" }}>{post.section}</div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, marginBottom: 3 }}>Penalty</div>
              <div className="gl-serif" style={{ fontSize: 19, color: "#0F172A" }}>{post.fine}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <article style={{ padding: "52px 24px 64px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Body blocks={post.body} />

          {/* Inline CTA */}
          <div
            style={{
              marginTop: 48,
              padding: "32px",
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
                Charged under {post.section}?
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6, maxWidth: 380 }}>
                Send us the ticket. We&apos;ll tell you what you&apos;re facing and what it costs to fight it — free.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/submit-ticket" style={{ background: "#0d9488", color: "white", fontSize: 14, fontWeight: 600, padding: "13px 24px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
                Free review
              </Link>
              <a href="tel:+14379827146" style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "white", fontSize: 14, fontWeight: 600, padding: "13px 24px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
                Call us
              </a>
            </div>
          </div>

          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            This article is general information about Ontario law, not legal advice for your situation.
            Fines and penalties reflect the Highway Traffic Act at the time of writing. Speak to a
            licensed paralegal about your specific charge.
          </p>
        </div>
      </article>

      {/* ── More guides ── */}
      <section className="section-gray">
        <div className="container">
          <h2 className="gl-serif" style={{ fontSize: 26, fontWeight: 500, color: "#0F172A", letterSpacing: "-0.5px", marginBottom: 24 }}>
            More guides
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                <article className="card" style={{ padding: "22px 20px", height: "100%", background: "white" }}>
                  <span className="pill pill-blue" style={{ fontSize: 11, marginBottom: 12, display: "inline-flex" }}>{p.category}</span>
                  <h3 className="gl-serif" style={{ fontSize: 18.5, fontWeight: 500, color: "#0F172A", lineHeight: 1.25, letterSpacing: "-0.3px", marginBottom: 8 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.6 }}>{p.excerpt.slice(0, 100)}…</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
