import Link from "next/link";
import type { Service } from "@/content/services";
import { TONE_HEX } from "@/content/services";

/**
 * Charge card: dulled photo behind, severity stripe along the top, the
 * offence name set in a severity-coloured chip, and a panel of real
 * penalties that opens on hover.
 *
 * No JavaScript. On pointer devices the panel opens on hover; on touch,
 * where there is no hover to reward, it renders open — see the media
 * query at the foot of this file. That avoids the double-tap trap where
 * the first tap expands and the second navigates.
 */
export function ServiceCard({ s }: { s: Service }) {
  const sev = TONE_HEX[s.tone];

  return (
    <Link href={`/services/${s.slug}`} className="svc-card" style={{ ["--sev" as string]: sev }}>
      {s.photo ? (
        <img
          src={`/services/${s.photo}`}
          alt=""
          loading="lazy"
          decoding="async"
          width={640}
          height={480}
        />
      ) : (
        <span className="svc-pattern" aria-hidden="true" />
      )}
      <span className="svc-veil" aria-hidden="true" />

      <span className="svc-body">
        <span className="svc-chip">{s.title}</span>
        <span className="svc-meta">
          {s.section} · {s.points}
        </span>
        <span className="svc-blurb">{s.blurb}</span>

        <span className="svc-panel">
          {s.rows.map(([k, v]) => (
            <span className="svc-row" key={k}>
              <span>{k}</span>
              <span>{v}</span>
            </span>
          ))}
          <span className="svc-how">How we fight it →</span>
        </span>
      </span>
    </Link>
  );
}

/** Catch-all tile that closes the grid. */
export function ServiceCatchAll({ title, blurb }: { title: string; blurb: string }) {
  return (
    <Link href="/submit-ticket" className="svc-card svc-card--catch">
      <span className="svc-pattern" aria-hidden="true" />
      <span className="svc-veil" aria-hidden="true" />
      <span className="svc-body">
        <span className="gl-serif svc-catch-title">{title}</span>
        <span className="svc-blurb">{blurb}</span>
        <span className="svc-how" style={{ marginTop: 14 }}>
          Send it to us →
        </span>
      </span>
    </Link>
  );
}
