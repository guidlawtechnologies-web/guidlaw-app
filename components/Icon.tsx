// Icon system for GuidLaw — wraps Lucide (MIT-licensed, professionally
// drawn) icons in a rounded-square badge. Badges are color-coded by
// severity for practice-area cards (teal = common/moderate, amber =
// serious, red = most severe/costly) and default to teal elsewhere.

import {
  Gauge,
  Siren,
  CarFront,
  Octagon,
  Smartphone,
  ShieldOff,
  IdCard,
  Shuffle,
  Sparkles,
  Gavel,
  MapPin,
  ScrollText,
  Tag,
  Trophy,
  type LucideIcon,
} from "lucide-react";

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

export type IconTone = "teal" | "amber" | "red";

const ICONS: Record<IconName, LucideIcon> = {
  speeding: Gauge, // speedometer — the violation is a measured number
  stunt: Siren, // stunt driving triggers an immediate roadside stop + impound
  careless: CarFront, // vehicle-handling offence
  signal: Octagon, // literal stop-sign shape doubles as red-light/stop-sign marker
  phone: Smartphone,
  shield: ShieldOff, // "no insurance" = missing protection
  "id-card": IdCard,
  shuffle: Shuffle, // catch-all / many offence types
  spark: Sparkles,
  gavel: Gavel,
  "map-pin": MapPin,
  certificate: ScrollText,
  tag: Tag,
  trophy: Trophy,
};

const TONES: Record<IconTone, { bg: string; border: string; fg: string }> = {
  teal: { bg: "#f0fdfa", border: "rgba(13,148,136,0.15)", fg: "#0d9488" },
  amber: { bg: "#FFFBEB", border: "rgba(180,83,9,0.18)", fg: "#92400E" },
  red: { bg: "#FEF2F2", border: "rgba(153,27,27,0.15)", fg: "#991B1B" },
};

export function Icon({
  name,
  size = 24,
}: {
  name: IconName;
  size?: number;
}) {
  const Component = ICONS[name];
  return <Component size={size} strokeWidth={1.75} aria-hidden="true" />;
}

/**
 * A rounded square wrapping the icon. Defaults to the teal brand tone;
 * pass tone="amber" or tone="red" to signal elevated severity/cost.
 */
export function IconBadge({
  name,
  tone = "teal",
  size = 44,
  iconSize = 22,
}: {
  name: IconName;
  tone?: IconTone;
  size?: number;
  iconSize?: number;
}) {
  const t = TONES[tone];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: t.bg,
        border: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: t.fg,
        flexShrink: 0,
      }}
    >
      <Icon name={name} size={iconSize} />
    </div>
  );
}
