// Offences GuidLaw handles.
//
// Section numbers, set fines, and demerit points were verified against
// published Ontario set-fine schedules in August 2026. Set fines are the
// out-of-court amount and exclude the victim fine surcharge and court
// costs; several offences have no set fine and are at the court's
// discretion. Re-check before changing any figure — this is the kind of
// detail people rely on.

import type { IconTone } from "@/components/Icon";

export type Service = {
  slug: string;
  title: string;
  section: string;
  fine: string;
  points: string;
  tone: IconTone;
  icon:
    | "speeding" | "stunt" | "careless" | "signal" | "phone" | "shield"
    | "id-card" | "shuffle" | "seatbelt" | "no-licence" | "leave-scene"
    | "tailgate" | "yield" | "pedestrian" | "school-bus" | "hov"
    | "turn" | "sign";
  blurb: string;
};

export const SERVICES: Service[] = [
  // ── Most severe ────────────────────────────────────────────────
  {
    slug: "stunt-driving",
    title: "Stunt driving",
    section: "HTA 172",
    fine: "$2,000 – $10,000",
    points: "6 points",
    tone: "red",
    icon: "stunt",
    blurb: "Roadside licence suspension and vehicle impoundment on the spot. Fight it properly.",
  },
  {
    slug: "no-insurance",
    title: "No insurance",
    section: "CAIA 2(1)",
    fine: "From $5,000",
    points: "—",
    tone: "red",
    icon: "shield",
    blurb: "One of the costliest driving convictions in Ontario, and insurers treat it severely.",
  },
  {
    slug: "failing-to-remain",
    title: "Failing to remain",
    section: "HTA 200(1)",
    fine: "Court's discretion",
    points: "7 points",
    tone: "red",
    icon: "leave-scene",
    blurb: "Leaving the scene carries the highest demerit total of any HTA offence.",
  },
  {
    slug: "driving-under-suspension",
    title: "Driving under suspension",
    section: "HTA 53(1)",
    fine: "Court's discretion",
    points: "—",
    tone: "red",
    icon: "id-card",
    blurb: "Further suspension, vehicle impoundment, and possible jail. Serious defence required.",
  },
  {
    slug: "school-bus",
    title: "Failing to stop for a school bus",
    section: "HTA 175(11)",
    fine: "$400 – $2,000",
    points: "6 points",
    tone: "red",
    icon: "school-bus",
    blurb: "Six points on a first offence, and subsequent convictions can carry jail time.",
  },

  // ── Serious ────────────────────────────────────────────────────
  {
    slug: "careless-driving",
    title: "Careless driving",
    section: "HTA 130",
    fine: "$400 – $2,000",
    points: "6 points",
    tone: "orange",
    icon: "careless",
    blurb: "Often laid at collision scenes. The Crown has to prove it — that's where these are won.",
  },
  {
    slug: "distracted-driving",
    title: "Distracted driving",
    section: "HTA 78.1(1)",
    fine: "From $500",
    points: "3 points",
    tone: "orange",
    icon: "phone",
    blurb: "Hand-held device charges also carry a three-day licence suspension on a first conviction.",
  },
  {
    slug: "driving-without-a-licence",
    title: "Driving without a licence",
    section: "HTA 32(1)",
    fine: "$260",
    points: "—",
    tone: "orange",
    icon: "no-licence",
    blurb: "Includes driving outside the conditions of a G1 or G2 novice licence.",
  },
  {
    slug: "failure-to-yield-pedestrian",
    title: "Failing to yield to a pedestrian",
    section: "HTA 144(7)",
    fine: "$300",
    points: "3 points",
    tone: "orange",
    icon: "pedestrian",
    blurb: "Enforced heavily at crosswalks and school zones, where fines are doubled.",
  },

  // ── Standard ───────────────────────────────────────────────────
  {
    slug: "speeding",
    title: "Speeding",
    section: "HTA 128",
    fine: "$95 – $10,000",
    points: "0 – 6 points",
    tone: "yellow",
    icon: "speeding",
    blurb: "The most common charge we handle, from minor to major over the posted limit.",
  },
  {
    slug: "red-light",
    title: "Red light",
    section: "HTA 144(18)",
    fine: "$260",
    points: "3 points",
    tone: "yellow",
    icon: "signal",
    blurb: "Camera-issued and officer-issued tickets are both contestable, on different grounds.",
  },
  {
    slug: "failing-to-stop",
    title: "Failing to stop at a stop sign",
    section: "HTA 136(1)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    icon: "signal",
    blurb: "Turns on what the officer actually observed — and what their notes record.",
  },
  {
    slug: "following-too-closely",
    title: "Following too closely",
    section: "HTA 158(1)",
    fine: "$85",
    points: "4 points",
    tone: "yellow",
    icon: "tailgate",
    blurb: "A small fine carrying four points — more than a red light. Often laid after rear-end collisions.",
  },
  {
    slug: "failure-to-yield",
    title: "Failure to yield",
    section: "HTA 135(2)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    icon: "yield",
    blurb: "Right-of-way charges at intersections and uncontrolled junctions.",
  },
  {
    slug: "disobeying-a-sign",
    title: "Disobeying a sign",
    section: "HTA 182(2)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    icon: "sign",
    blurb: "Covers no-turn, one-way, and other posted restrictions. Signage placement is often arguable.",
  },
  {
    slug: "unsafe-turn",
    title: "Unsafe or improper turn",
    section: "HTA 142(1)",
    fine: "$85",
    points: "2 points",
    tone: "yellow",
    icon: "turn",
    blurb: "Includes turning without signalling and turns made when it wasn't safe to do so.",
  },
  {
    slug: "seatbelt",
    title: "Seatbelt violations",
    section: "HTA 106(2)",
    fine: "$200",
    points: "2 points",
    tone: "yellow",
    icon: "seatbelt",
    blurb: "Applies to the driver and to passengers under sixteen.",
  },
  {
    slug: "hov-lane",
    title: "HOV lane",
    section: "HTA 154.1(3)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    icon: "hov",
    blurb: "High-occupancy vehicle lane charges on the 400-series and municipal routes.",
  },
];

/** Everything else — the catch-all shown at the end of the grid. */
export const CATCH_ALL = {
  title: "Any other HTA charge",
  blurb:
    "Lane changes, defective equipment, plate and permit offences, commercial vehicle charges. If it's a Highway Traffic Act ticket, send it to us.",
};

export const SEVERITY_LEGEND = [
  { tone: "#CA8A04", label: "Standard" },
  { tone: "#EA580C", label: "Serious" },
  { tone: "#DC2626", label: "Most severe" },
];
