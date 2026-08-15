// Small line-icon set for GuidLaw. Each icon renders inside a rounded
// teal-tinted square badge so the whole set feels like one visual system.

import type { CSSProperties, ReactNode } from "react";

type IconName =
  // Practice areas
  | "speeding"
  | "stunt"
  | "careless"
  | "signal"
  | "phone"
  | "shield"
  | "id-card"
  | "shuffle"
  // Why GuidLaw
  | "spark"
  | "gavel"
  | "map-pin"
  | "certificate"
  | "tag"
  | "trophy";

const PATHS: Record<IconName, ReactNode> = {
  // ── Practice areas ────────────────────────────────────────────
  // Speedometer
  speeding: (
    <>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M12 15 16 9" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
      <path d="M4 15h1M19 15h1M12 8v1" />
    </>
  ),
  // Warning triangle for stunt driving
  stunt: (
    <>
      <path d="M12 4 3 19h18L12 4Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="16.5" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  // Car with swerve line — careless
  careless: (
    <>
      <path d="M4 15h16v-2l-2-4H6l-2 4v2Z" />
      <path d="M4 15v2m16-2v2" />
      <circle cx="7.5" cy="17" r="1.4" />
      <circle cx="16.5" cy="17" r="1.4" />
      <path d="M3 6c1.5 1 3-1 4.5 0S9 8 10.5 7" strokeLinecap="round" />
    </>
  ),
  // Traffic signal
  signal: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <circle cx="12" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.3" />
      <circle cx="12" cy="16.5" r="1.3" />
      <path d="M8 7.5H6M8 16.5H6" />
    </>
  ),
  // Phone
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
      <path d="M9 6h6" />
    </>
  ),
  // Shield (no insurance)
  shield: (
    <>
      <path d="M12 3 5 5v6c0 4 3 7 7 9 4-2 7-5 7-9V5l-7-2Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // ID card
  "id-card": (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M13 11h5M13 14h4" />
    </>
  ),
  // Shuffle / all violations
  shuffle: (
    <>
      <path d="M3 7h3l4 5-4 5H3" />
      <path d="M3 17h3l4-5-4-5H3" />
      <path d="M14 7h4l3 3-3 3M14 17h4l3-3" />
    </>
  ),

  // ── Why GuidLaw ────────────────────────────────────────────
  // Spark / free
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeLinecap="round" />
      <path d="M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // Gavel — we go to court
  gavel: (
    <>
      <path d="M14 6l4 4-6 6-4-4 6-6Z" />
      <path d="M11 3l4 4M17 9l4 4" />
      <path d="M4 21h10" />
      <path d="M8 16l-3 3" />
    </>
  ),
  // Map pin — Ontario coverage
  "map-pin": (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  // Certificate / scroll — LSO
  certificate: (
    <>
      <rect x="4" y="4" width="16" height="13" rx="1.5" />
      <path d="M7 9h10M7 12h7" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="M10 19l-1 3 3-1 3 1-1-3" />
    </>
  ),
  // Price tag — flat-rate
  tag: (
    <>
      <path d="M12 3H5v7l9 9 7-7-9-9Z" />
      <circle cx="9" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  // Trophy — proven results
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
      <path d="M10 15h4v3h-4zM8 20h8" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  style,
}: {
  name: IconName;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

/**
 * A rounded teal-tinted square wrapping the icon — matches the FREE / CA
 * badge style already on the "Why GuidLaw" cards, extended to the full set.
 */
export function IconBadge({
  name,
  size = 44,
  iconSize = 22,
}: {
  name: IconName;
  size?: number;
  iconSize?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: "#f0fdfa",
        border: "1px solid rgba(13,148,136,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#0d9488",
        flexShrink: 0,
      }}
    >
      <Icon name={name} size={iconSize} />
    </div>
  );
}
