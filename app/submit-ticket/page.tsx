import type { Metadata } from "next";
import { IntakeForm } from "@/components/IntakeForm";
import { SiteNav, SiteFooter, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Submit Your Ticket — Free Case Review",
  description:
    "Send us your Ontario traffic ticket for a free review. No account needed. An LSO-licensed paralegal will tell you what you're facing and what it costs to fight.",
};

/**
 * Public submission page. This used to require a Supabase session and
 * redirected anonymous visitors to /login — which meant every cold
 * visitor hit a wall before telling us anything. It's now open.
 */
export default function SubmitTicketPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <SiteNav />

      <section style={{ background: "#faf8f2", borderBottom: "1px solid #eae7dd", padding: "56px 24px 52px" }}>
        <div className="container" style={{ maxWidth: 620, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20, fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600 }}>
            <span style={{ width: 30, height: 1, background: "#0d9488", display: "inline-block" }} />
            <span style={{ color: "#0d9488" }}>Free case review</span>
          </div>

          <h1 className="gl-serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 500, color: "#0F172A", letterSpacing: "-1.3px", lineHeight: 1.05, margin: "0 0 18px" }}>
            Send us your ticket
          </h1>

          <p style={{ fontSize: 17, color: "#4a4a44", lineHeight: 1.7, margin: 0 }}>
            Takes about two minutes. You&apos;re not committing to anything and there&apos;s no charge
            for the review — if we don&apos;t think it&apos;s worth fighting, we&apos;ll tell you that.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 620 }}>
          <div style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 16, padding: "32px 30px" }}>
            <IntakeForm compact />
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <p style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.7 }}>
              Court date coming up fast? Call{" "}
              <a href={PHONE_HREF} style={{ color: "#0d9488", fontWeight: 600, textDecoration: "none" }}>
                {PHONE_DISPLAY}
              </a>{" "}
              instead — you generally have 15 days from the date on the ticket to file.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
