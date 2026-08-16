import Link from "next/link";
import type { Metadata } from "next";
import { COMMITMENTS } from "@/content/process";
import { SiteNav, SiteFooter, PageHeader, CtaBand, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "About GuidLaw | Ontario Traffic Ticket Defence",
  description:
    "GuidLaw is an Ontario company connecting drivers with LSO-licensed paralegals to fight Highway Traffic Act charges. Founded by Hassan Shah. Here's what we commit to.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <SiteNav />

      <PageHeader
        eyebrow="Who we are"
        title={
          <>
            Built because the system
            <br />
            counts on you giving up.
          </>
        }
      />

      {/* ── Story + contact ── */}
      <section className="section">
        <div className="container">
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 17, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 20 }}>
                Most people pay their ticket. Not because they&apos;re guilty — because fighting it
                means a day off work, a courthouse you&apos;ve never been to, and rules nobody
                explained. The system runs on the assumption you won&apos;t bother.
              </p>
              <p style={{ fontSize: 17, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 20 }}>
                That assumption is usually right, and it&apos;s expensive. A conviction you never
                contested follows you for three years. The fine is the small part; the insurance
                increase behind it is the real cost, and most drivers never do that math.
              </p>
              <p style={{ fontSize: 17, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 20 }}>
                GuidLaw removes every excuse not to fight. Send a photo of your ticket. We tell you
                what you&apos;re actually facing, quote you one flat fee, and assign a paralegal
                licensed with the Law Society of Ontario. They file, they request disclosure, they
                negotiate, and they appear in court. You do none of it.
              </p>

              <h2 className="gl-serif" style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.5px", margin: "38px 0 14px" }}>
                We&apos;re new, and we&apos;d rather say so
              </h2>
              <p style={{ fontSize: 17, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 20 }}>
                GuidLaw Technologies Inc. is an Ontario corporation. We don&apos;t have a decade of
                case history to point at, and we&apos;re not going to invent one. What we have is a
                clear process, licensed paralegals doing the actual work, and prices we&apos;ll tell
                you before you commit.
              </p>
              <p style={{ fontSize: 17, color: "var(--text-dim)", lineHeight: 1.8 }}>
                If that&apos;s not enough for you yet, that&apos;s fair. Call and ask whatever you
                want first.
              </p>

              {/* Founder */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 38, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#0d9488", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 17, flexShrink: 0 }}>
                  HS
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 16.5 }}>Hassan Shah</div>
                  <div style={{ fontSize: 14, color: "var(--text-dim)" }}>Founder · GuidLaw Technologies Inc.</div>
                </div>
              </div>
            </div>

            {/* Contact card */}
            <aside style={{ background: "#faf8f2", border: "1px solid #eae7dd", borderRadius: 16, padding: "32px 28px", position: "sticky", top: 88 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#86867c", fontWeight: 600, marginBottom: 18 }}>
                Talk to a person
              </div>

              <a href={PHONE_HREF} style={{ textDecoration: "none", display: "block", marginBottom: 8 }}>
                <div className="gl-serif" style={{ fontSize: "clamp(25px, 2.6vw, 30px)", color: "#0F172A", letterSpacing: "-0.5px", lineHeight: 1.15 }}>
                  {PHONE_DISPLAY}
                </div>
              </a>
              <p style={{ fontSize: 14, color: "#86867c", lineHeight: 1.6, marginBottom: 22 }}>
                Call or text. If you&apos;re holding a ticket and don&apos;t know what it means, this
                is the fastest way to find out.
              </p>

              <a
                href="mailto:info@guidlaw.ca"
                style={{ display: "block", fontSize: 14.5, color: "#0F172A", textDecoration: "none", paddingBottom: 18, marginBottom: 18, borderBottom: "1px solid #eae7dd", fontWeight: 500 }}
              >
                info@guidlaw.ca
              </a>

              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {["LSO-licensed paralegals", "All Ontario courts", "Flat fee, quoted upfront", "You never attend court"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#4a4a44" }}>
                    <span style={{ color: "#0d9488", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/submit-ticket"
                style={{ display: "block", textAlign: "center", background: "#0F172A", color: "white", fontSize: 14.5, fontWeight: 600, padding: "14px", borderRadius: 8, textDecoration: "none", marginTop: 24 }}
              >
                Get a free review
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Commitments ── */}
      <section className="section-gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
              Our commitments
            </div>
            <h2 className="gl-serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              How we work
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--text-dim)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Rather than tell you what past clients think, here is exactly what we commit to — hold
              us to it.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
            {COMMITMENTS.map((c) => (
              <div key={c.n} style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 14, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="gl-serif" style={{ fontSize: 22, color: "#0d9488", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {c.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", lineHeight: 1.35 }}>{c.title}</div>
                <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.7, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: 36, fontSize: 14, color: "var(--text-muted)", maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            Client reviews will appear here once we have them. We won&apos;t publish one we
            didn&apos;t earn.
          </p>
        </div>
      </section>

      <CtaBand
        title="Got a ticket?"
        body="Send it over. The review is free and you'll get a straight answer about whether fighting it is worth your money."
      />

      <SiteFooter />

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .about-grid aside { position: static !important; }
        }
      `}</style>
    </div>
  );
}
