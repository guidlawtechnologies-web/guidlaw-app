"use client";

import { useState, useRef } from "react";
import { SERVICES } from "@/content/services";

/**
 * Public intake form. Deliberately requires no account — a cold visitor
 * can submit a ticket without signing up. Posts to /api/intake, which
 * emails the lead and stores the photo.
 *
 * `compact` drops the heading block so the form can sit inside a section
 * that already has its own headline.
 */
export function IntakeForm({ compact = false }: { compact?: boolean }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [offence, setOffence] = useState("");
  const [courtDate, setCourtDate] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "We need a name to call you back";
    if (phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number we can reach you on";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "That email doesn't look right";
    if (!offence) e.offence = "Pick the closest one — \"I'm not sure\" is fine";
    if (!consent) e.consent = "Please tick this so we're allowed to reply";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setFailed("");
    if (!validate()) return;

    setSending(true);
    try {
      const fd = new FormData();
      fd.append("firstName", firstName);
      fd.append("lastName", lastName);
      fd.append("phone", phone);
      fd.append("email", email);
      fd.append("offence", offence);
      fd.append("courtDate", courtDate);
      fd.append("notes", notes);
      fd.append("consent", String(consent));
      if (photo) fd.append("photo", photo);

      const res = await fetch("/api/intake", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setFailed(
        "Something went wrong sending that. Please call or text +1 437 982 7146 and we'll take the details that way."
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div
        style={{
          background: "#f0fdfa",
          border: "1px solid rgba(13,148,136,0.28)",
          borderRadius: 14,
          padding: "36px 30px",
          textAlign: "center",
        }}
      >
        <div className="gl-serif" style={{ fontSize: 26, color: "#0F172A", marginBottom: 10, letterSpacing: "-0.4px" }}>
          Got it — we&apos;ll be in touch
        </div>
        <p style={{ fontSize: 15.5, color: "#4a4a44", lineHeight: 1.7, margin: "0 auto", maxWidth: 420 }}>
          We&apos;ll review your charge and get back to you within a day, usually sooner, with what
          you&apos;re actually facing and what it costs to fight.
        </p>
        <p style={{ fontSize: 14, color: "#86867c", marginTop: 18 }}>
          In a hurry? Call{" "}
          <a href="tel:+14379827146" style={{ color: "#0d9488", fontWeight: 600, textDecoration: "none" }}>
            +1 437 982 7146
          </a>
          .
        </p>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <div style={{ color: "#DC2626", fontSize: 12.5, marginTop: 5 }}>{errors[k]}</div>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="intake">
      {!compact && (
        <>
          <div className="gl-serif" style={{ fontSize: 23, color: "#0F172A", marginBottom: 5, letterSpacing: "-0.3px" }}>
            Get your free review
          </div>
          <p style={{ fontSize: 13.5, color: "#86867c", marginBottom: 20, lineHeight: 1.6 }}>
            No account, no payment, no obligation. We&apos;ll tell you honestly whether fighting it is
            worth your money.
          </p>
        </>
      )}

      {/* Photo — the highest-value field, so it leads */}
      <div className="intake-photo">
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#0F172A", letterSpacing: "0.04em", marginBottom: 10 }}>
          FASTEST WAY
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="intake-drop"
        >
          <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#0F172A", marginBottom: 3 }}>
            {photo ? `✓ ${photo.name}` : "Photograph your ticket"}
          </span>
          <span style={{ display: "block", fontSize: 12, color: "#86867c" }}>
            {photo ? "Tap to choose a different photo" : "One photo gives us the offence, court, date and fine"}
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
        />
        <div style={{ textAlign: "center", fontSize: 12, color: "#86867c", marginTop: 10 }}>
          or fill it in below
        </div>
      </div>

      <div className="intake-row">
        <div className="intake-fld">
          <label>First name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First" autoComplete="given-name" />
          {err("firstName")}
        </div>
        <div className="intake-fld">
          <label>Last name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last" autoComplete="family-name" />
        </div>
      </div>

      <div className="intake-row">
        <div className="intake-fld">
          <label>Phone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(416) 555-0142" autoComplete="tel" />
          {err("phone")}
        </div>
        <div className="intake-fld">
          <label>
            Email <span style={{ color: "#86867c", fontWeight: 400 }}>(optional)</span>
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          {err("email")}
        </div>
      </div>

      <div className="intake-row">
        <div className="intake-fld">
          <label>What&apos;s the charge?</label>
          <select value={offence} onChange={(e) => setOffence(e.target.value)}>
            <option value="">Select your offence</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other HTA offence">Other HTA offence</option>
            <option value="Not sure">I&apos;m not sure</option>
          </select>
          {err("offence")}
        </div>
        <div className="intake-fld">
          <label>
            Court date <span style={{ color: "#86867c", fontWeight: 400 }}>(if you know it)</span>
          </label>
          <input type="date" value={courtDate} onChange={(e) => setCourtDate(e.target.value)} />
        </div>
      </div>

      <div className="intake-fld">
        <label>
          Anything we should know? <span style={{ color: "#86867c", fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What happened, or anything unusual about the stop" />
      </div>

      {/* CASL — express consent has to be recorded, not just shown */}
      <div className="intake-fld" style={{ marginTop: 14 }}>
        <label className="intake-chk">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>
            Yes, GuidLaw can contact me by phone, text or email about my ticket. You can opt out any
            time.
          </span>
        </label>
        {err("consent")}
      </div>

      {failed && (
        <div
          style={{
            background: "#FEF2F2",
            border: "1px solid rgba(220,38,38,0.25)",
            borderRadius: 9,
            padding: "12px 14px",
            fontSize: 13.5,
            color: "#991B1B",
            marginTop: 14,
            lineHeight: 1.6,
          }}
        >
          {failed}
        </div>
      )}

      <button type="submit" className="intake-btn" disabled={sending} style={{ marginTop: 18 }}>
        {sending ? "Sending…" : "Get my free review"}
      </button>

      <p style={{ fontSize: 11.5, color: "#86867c", lineHeight: 1.55, marginTop: 12, textAlign: "center" }}>
        Prefer to talk? Call{" "}
        <a href="tel:+14379827146" style={{ color: "#0F172A", fontWeight: 600, textDecoration: "none" }}>
          +1 437 982 7146
        </a>{" "}
        — weekends included. We never share your details.
      </p>
    </form>
  );
}
