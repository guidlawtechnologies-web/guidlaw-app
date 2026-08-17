import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Public intake endpoint. Deliberately unauthenticated — this is how a
 * cold visitor reaches us, so requiring a session here would defeat the
 * point.
 *
 * The lead is emailed to info@guidlaw.ca, which is the reliable path and
 * works today. The database insert is best-effort: it only succeeds once
 * a `leads` table exists, and a failure there must never lose the lead.
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const TO = "info@guidlaw.ca";
const FROM = "GuidLaw <notifications@guidlaw.ca>";

function esc(s: string) {
  return String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const offence = String(form.get("offence") || "").trim();
    const courtDate = String(form.get("courtDate") || "").trim();
    const notes = String(form.get("notes") || "").trim();
    const consent = String(form.get("consent") || "") === "true";
    const photo = form.get("photo") as File | null;

    // Server-side validation — never trust the client alone
    if (!firstName || phone.replace(/\D/g, "").length < 10 || !offence) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }

    // ── Photo → Supabase storage ────────────────────────────────────
    let photoUrl: string | null = null;
    if (photo && photo.size > 0) {
      try {
        const ext = photo.name.split(".").pop() || "jpg";
        const fileName = `intake-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const buffer = Buffer.from(await photo.arrayBuffer());
        const { error: upErr } = await supabase.storage
          .from("tickets")
          .upload(fileName, buffer, { contentType: photo.type });
        if (!upErr) {
          photoUrl = supabase.storage.from("tickets").getPublicUrl(fileName).data.publicUrl;
        }
      } catch (e) {
        console.error("intake: photo upload failed", e);
      }
    }

    const name = [firstName, lastName].filter(Boolean).join(" ");
    const submittedAt = new Date().toISOString();

    // ── Email the lead — this is the path that must not fail ────────
    const rows: [string, string][] = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email || "—"],
      ["Offence", offence],
      ["Court date", courtDate || "not provided"],
      ["Photo", photoUrl ? photoUrl : "none attached"],
      ["Notes", notes || "—"],
      ["Consent given", consent ? `Yes — ${submittedAt}` : "No"],
    ];

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px">
        <h2 style="color:#0F172A;margin:0 0 4px">New free-review request</h2>
        <p style="color:#6B7280;font-size:14px;margin:0 0 20px">Submitted from guidlaw.ca</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr>
                   <td style="padding:8px 0;color:#6B7280;width:130px;vertical-align:top">${esc(k)}</td>
                   <td style="padding:8px 0;color:#0F172A;font-weight:600">${esc(v)}</td>
                 </tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:24px">
          <a href="tel:${esc(phone.replace(/\D/g, ""))}"
             style="background:#0d9488;color:#fff;padding:11px 20px;border-radius:8px;
                    text-decoration:none;font-weight:600;font-size:14px">Call ${esc(name)}</a>
        </p>
      </div>`;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: email || undefined,
        subject: `New ticket enquiry — ${name} (${offence})`,
        html,
      }),
    });

    if (!emailRes.ok) {
      const detail = await emailRes.text();
      console.error("intake: resend failed", emailRes.status, detail);
      return NextResponse.json({ error: "Could not send" }, { status: 502 });
    }

    // ── Best-effort persistence ─────────────────────────────────────
    // Only succeeds once a `leads` table exists. Never blocks the lead.
    try {
      await supabase.from("leads").insert({
        first_name: firstName,
        last_name: lastName || null,
        phone,
        email: email || null,
        offence_type: offence,
        court_date: courtDate || null,
        notes: notes || null,
        photo_url: photoUrl,
        consent_given: consent,
        consent_at: submittedAt,
        source: "website",
        status: "new",
      });
    } catch (e) {
      console.error("intake: leads insert skipped", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("intake: unhandled", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
