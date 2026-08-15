// Icon system for GuidLaw — wraps Lucide (MIT-licensed, professionally
// drawn) icons in a consistent teal-tinted rounded-square badge so the
// whole set reads as one visual system.

import {
  Gauge,
  TriangleAlert,
  CarFront,
  TrafficCone,
  Smartphone,
  ShieldCheck,
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

const ICONS: Record<IconName, LucideIcon> = {
  speeding: Gauge,
  stunt: TriangleAlert,
  careless: CarFront,
  signal: TrafficCone,
  phone: Smartphone,
  shield: ShieldCheck,
  "id-card": IdCard,
  shuffle: Shuffle,
  spark: Sparkles,
  gavel: Gavel,
  "map-pin": MapPin,
  certificate: ScrollText,
  tag: Tag,
  trophy: Trophy,
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
