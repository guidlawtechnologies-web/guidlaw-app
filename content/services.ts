// Offences GuidLaw handles.
//
// Section numbers, set fines, and demerit points were verified against
// published Ontario set-fine schedules in August 2026. Set fines are the
// out-of-court amount and exclude the victim fine surcharge and court
// costs; several offences have no set fine and are at the court's
// discretion. Re-check before changing any figure — this is the kind of
// detail people rely on.
//
// `photo` names a file in /public/services (640x480 WebP). Ten charges
// have one; the rest fall back to a patterned ground in the card.
// Photos are free-licence from Unsplash — `credit` drives the footer line.

export type Tone = "yellow" | "orange" | "red";

export type Service = {
  slug: string;
  title: string;
  section: string;
  fine: string;
  points: string;
  tone: Tone;
  blurb: string;
  /** Rows shown in the card's hover panel and at the top of the detail page. */
  rows: [string, string][];
  /** How the charge is actually defended. Shown on the detail page. */
  defence: string[];
  photo?: string;
  credit?: string;
};

export const SERVICES: Service[] = [
  // ── Standard ───────────────────────────────────────────────────
  {
    slug: "speeding",
    title: "Speeding",
    section: "HTA 128",
    fine: "$95 – $10,000",
    points: "0 – 6 points",
    tone: "yellow",
    blurb: "The most common charge we handle, from minor to major over the posted limit.",
    rows: [
      ["Set fine", "$95 – $10,000"],
      ["Demerit points", "0 – 6"],
      ["Insurance impact", "Up to 3 years"],
    ],
    defence: [
      "Speeding is an absolute-liability offence, so weather, traffic, and your reason for speeding are not defences. What matters is whether the Crown can prove the reading.",
      "That means the enforcement gets examined: calibration and testing records for the radar or lidar unit, the officer's certification on that specific device, and whether your vehicle was properly identified and tracked among others on the road.",
      "Disclosure is where most of these turn. If it arrives late, incomplete, or missing the calibration records, that is a live issue.",
      "Where the reading holds up, the realistic goal shifts to a reduction — a lower speed count that carries fewer demerit points and a smaller insurance consequence.",
    ],
    photo: "speeding.webp",
    credit: "Harley-Davidson",
  },
  {
    slug: "red-light",
    title: "Red light",
    section: "HTA 144(18)",
    fine: "$260",
    points: "3 points",
    tone: "yellow",
    blurb: "Camera-issued and officer-issued tickets are both contestable, on different grounds.",
    rows: [
      ["Set fine", "$260"],
      ["Demerit points", "3"],
      ["Camera-issued", "No demerit points"],
    ],
    defence: [
      "Camera tickets and officer-issued tickets are fought differently. A red light camera charge attaches to the plate holder and carries no demerit points; an officer-issued charge attaches to the driver and carries three.",
      "For camera charges, the questions are the certification of the equipment, the timing of the images, and whether the required signage was posted at that intersection.",
      "For officer-issued charges, it comes down to sightline and position — where the officer was, what they could actually see, and whether their notes record it.",
      "Amber-phase duration is a recurring issue. Where the yellow interval falls short of the standard for the posted speed, entering on the red becomes considerably harder for the Crown to establish.",
    ],
    photo: "red-light.webp",
    credit: "Erwan Hesry",
  },
  {
    slug: "following-too-closely",
    title: "Following too closely",
    section: "HTA 158(1)",
    fine: "$85",
    points: "4 points",
    tone: "yellow",
    blurb: "A small fine carrying four points — more than a red light. Often laid after rear-end collisions.",
    rows: [
      ["Set fine", "$85"],
      ["Demerit points", "4"],
      ["More than a red light", "Yes"],
    ],
    defence: [
      "Drivers pay this one because the fine is small, and it is a mistake. Four demerit points is more than a red light or a stop sign carries, and insurers notice it.",
      "The offence requires following more closely than is reasonable and prudent given speed, traffic, and road conditions. That is a judgment call, not a measurement, which gives it more room to argue than a radar reading.",
      "Where it follows a rear-end collision, the charge is often laid on the assumption that the following driver is at fault. Sudden stops, brake lights that were not working, and vehicles cutting in are all relevant and rarely in the officer's notes.",
    ],
    photo: "following-too-closely.webp",
    credit: "Musa Haef",
  },
  {
    slug: "failing-to-stop",
    title: "Failing to stop at a stop sign",
    section: "HTA 136(1)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    blurb: "Turns on what the officer actually observed — and what their notes record.",
    rows: [
      ["Set fine", "$85"],
      ["Demerit points", "3"],
      ["Turns on", "Officer's observation"],
    ],
    defence: [
      "There is no device here. The entire case is one officer's observation, which makes their notes the centre of the file.",
      "Position and sightline matter: where the cruiser was, the angle to the intersection, what was between them and your vehicle, and how long they observed.",
      "The legal requirement is a complete stop at the marked line or, absent a line, before entering the crosswalk or intersection. Where you stopped and whether that satisfied the section is frequently arguable.",
    ],
  },
  {
    slug: "disobeying-a-sign",
    title: "Disobeying a sign",
    section: "HTA 182(2)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    blurb: "Covers no-turn, one-way, and other posted restrictions. Signage placement is often arguable.",
    rows: [
      ["Set fine", "$85"],
      ["Demerit points", "3"],
      ["Common issue", "Sign visibility"],
    ],
    defence: [
      "This section only bites where the sign was lawfully erected and adequately visible. Both are open to challenge.",
      "Obstruction is the usual angle — foliage, a parked truck, a snow bank, glare, or a sign turned out of position. If a reasonable driver could not have seen it, the case weakens considerably.",
      "Municipal records showing when the sign was installed or last inspected can matter, and those have to be requested before they age out.",
    ],
  },
  {
    slug: "unsafe-turn",
    title: "Unsafe or improper turn",
    section: "HTA 142(1)",
    fine: "$85",
    points: "2 points",
    tone: "yellow",
    blurb: "Includes turning without signalling and turns made when it wasn't safe to do so.",
    rows: [
      ["Set fine", "$85"],
      ["Demerit points", "2"],
      ["Turns on", "Whether it was safe"],
    ],
    defence: [
      "The section requires that the turn be made in safety and that a signal be given where another vehicle may be affected. Both parts are open to argument.",
      "Where no other vehicle was affected, the signalling requirement may not have been engaged at all.",
      "Like most observation-based charges, this stands or falls on the officer's vantage point and the detail in their notes.",
    ],
  },
  {
    slug: "seatbelt",
    title: "Seatbelt violations",
    section: "HTA 106(2)",
    fine: "$200",
    points: "2 points",
    tone: "yellow",
    blurb: "Applies to the driver and to passengers under sixteen.",
    rows: [
      ["Set fine", "$200"],
      ["Demerit points", "2"],
      ["Also covers", "Passengers under 16"],
    ],
    defence: [
      "The charge depends on an officer seeing, usually through glass and often in moving traffic, that a belt was not properly worn. Tinting, glare, weather, and a dark belt against dark clothing all bear on that.",
      "A belt worn but positioned incorrectly is treated differently from no belt at all, and the notes rarely distinguish.",
      "Drivers are also charged for passengers under sixteen. Where the passenger unfastened the belt while the vehicle was moving, that is worth raising.",
    ],
    photo: "seatbelt.webp",
    credit: "Maxim Hopman",
  },
  {
    slug: "hov-lane",
    title: "HOV lane",
    section: "HTA 154.1(3)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    blurb: "High-occupancy vehicle lane charges on the 400-series and municipal routes.",
    rows: [
      ["Set fine", "$85"],
      ["Demerit points", "3"],
      ["Common issue", "Occupant count"],
    ],
    defence: [
      "The case rests on an officer counting occupants in a moving vehicle, frequently at highway speed and through tinted glass. Children in rear seats and passengers who were reclined are routinely missed.",
      "Entry and exit points are the other angle. Where the permitted crossing area was unclear or the signage inadequate, that goes to whether the offence was made out.",
      "Vehicles carrying a valid Green plate or otherwise exempt are sometimes charged in error.",
    ],
  },
  {
    slug: "failure-to-yield",
    title: "Failure to yield",
    section: "HTA 135(2)",
    fine: "$85",
    points: "3 points",
    tone: "yellow",
    blurb: "Right-of-way charges at intersections and uncontrolled junctions.",
    rows: [
      ["Set fine", "$85"],
      ["Demerit points", "3"],
      ["Often follows", "A collision"],
    ],
    defence: [
      "Right-of-way charges usually follow a collision, which means the officer is reconstructing an event they did not see, from two accounts that disagree.",
      "Who arrived first, who was already in the intersection, and the approach speed of the other vehicle are all central and rarely established with any precision at the roadside.",
      "Where the other driver was speeding, the right-of-way analysis can change entirely.",
    ],
  },

  // ── Serious ────────────────────────────────────────────────────
  {
    slug: "careless-driving",
    title: "Careless driving",
    section: "HTA 130",
    fine: "$400 – $2,000",
    points: "6 points",
    tone: "orange",
    blurb: "Often laid at collision scenes. The Crown has to prove it — that's where these are won.",
    rows: [
      ["Set fine", "$400 – $2,000"],
      ["Demerit points", "6"],
      ["Licence suspension", "Up to 2 years"],
    ],
    defence: [
      "A collision does not establish careless driving. The Crown must prove driving without due care and attention, or without reasonable consideration for others — measured against a reasonable, prudent driver in the same conditions.",
      "That standard is the defence. Weather records, road treatment and salting logs, and whether other collisions occurred on the same stretch that day all speak to what a reasonable driver would have faced.",
      "Several of those records come from third parties and are purged on a schedule. They have to be requested early.",
      "Where the charge holds, a negotiated reduction to a lesser offence takes you from six demerit points to two or three and removes the suspension and jail exposure entirely. For most drivers that outcome is worth far more than the fee.",
    ],
    photo: "careless-driving.webp",
    credit: "kimi lee",
  },
  {
    slug: "distracted-driving",
    title: "Distracted driving",
    section: "HTA 78.1(1)",
    fine: "From $500",
    points: "3 points",
    tone: "orange",
    blurb: "Hand-held device charges also carry a three-day licence suspension on a first conviction.",
    rows: [
      ["Set fine", "From $500"],
      ["Demerit points", "3"],
      ["Licence suspension", "3 days"],
    ],
    defence: [
      "The suspension is what people miss. A first conviction carries three days off the road on top of the fine and the points, and it escalates sharply on repeat.",
      "The section prohibits holding or using a hand-held device. A phone mounted in a cradle, or one being used hands-free, is not caught — and officers do misread which is which from outside the vehicle.",
      "What the officer actually saw is the whole case: the distance, the angle, the duration of the observation, and whether they could distinguish a phone from a coffee cup, a wallet, or a hand at the side of the face.",
    ],
    photo: "distracted-driving.webp",
    credit: "Alexandre Boucher",
  },
  {
    slug: "driving-without-a-licence",
    title: "Driving without a licence",
    section: "HTA 32(1)",
    fine: "$260",
    points: "—",
    tone: "orange",
    blurb: "Includes driving outside the conditions of a G1 or G2 novice licence.",
    rows: [
      ["Set fine", "$260"],
      ["Demerit points", "—"],
      ["Also covers", "G1 / G2 conditions"],
    ],
    defence: [
      "Most of these are not unlicensed drivers. They are novice drivers charged for breaching a G1 or G2 condition — an accompanying driver who did not meet the requirement, a prohibited highway, or the overnight restriction.",
      "Whether the condition was actually breached is often arguable, particularly where the accompanying driver's licence class or blood alcohol is in question.",
      "Where a valid licence existed but was not produced at the roadside, that is a different and much less serious matter, and it should not be pleaded as this charge.",
    ],
  },
  {
    slug: "failure-to-yield-pedestrian",
    title: "Failing to yield to a pedestrian",
    section: "HTA 144(7)",
    fine: "$300",
    points: "3 points",
    tone: "orange",
    blurb: "Enforced heavily at crosswalks and school zones, where fines are doubled.",
    rows: [
      ["Set fine", "$300"],
      ["Demerit points", "3"],
      ["Community safety zone", "Fines doubled"],
    ],
    defence: [
      "Fines double in community safety zones and school zones, which is where most of this enforcement happens.",
      "The requirement is to yield to a pedestrian within a crossover or crosswalk. Where the pedestrian was — in the crossing, approaching it, or outside it — is the central question and is frequently unclear in the officer's notes.",
      "Enforcement blitzes often use plainclothes officers acting as pedestrians. How the crossing was initiated, and whether a reasonable driver had time to stop safely, both matter.",
    ],
    photo: "failure-to-yield-pedestrian.webp",
    credit: "Wesley Tingey",
  },

  // ── Most severe ────────────────────────────────────────────────
  {
    slug: "stunt-driving",
    title: "Stunt driving",
    section: "HTA 172",
    fine: "$2,000 – $10,000",
    points: "6 points",
    tone: "red",
    blurb: "Roadside licence suspension and vehicle impoundment on the spot. Fight it properly.",
    rows: [
      ["Set fine", "$2,000 – $10,000"],
      ["Licence", "30-day suspension"],
      ["Vehicle", "14-day impound"],
    ],
    defence: [
      "The penalties begin before any court date. Your licence is suspended for 30 days and your vehicle impounded for 14 at the roadside, on the officer's grounds alone.",
      "The threshold is 40 km/h or more over on a road posted under 80, or 50 km/h or more over anywhere else. Because a single kilometre either side of that line changes the charge entirely, the accuracy of the measurement carries more weight here than in an ordinary speeding case.",
      "Everything that applies to speeding applies with more force: device calibration, officer certification, vehicle identification, and the completeness of disclosure.",
      "Reduction to a speeding count below the stunt threshold is a common and valuable outcome. It removes the conviction that follows you and the licence consequences that come with it.",
    ],
    photo: "stunt-driving.webp",
    credit: "Christopher John",
  },
  {
    slug: "no-insurance",
    title: "No insurance",
    section: "CAIA 2(1)",
    fine: "From $5,000",
    points: "—",
    tone: "red",
    blurb: "One of the costliest driving convictions in Ontario, and insurers treat it severely.",
    rows: [
      ["Minimum fine", "$5,000"],
      ["Second offence", "From $10,000"],
      ["Vehicle", "Impoundment possible"],
    ],
    defence: [
      "This is prosecuted under the Compulsory Automobile Insurance Act, not the Highway Traffic Act, and the minimum fine on a first conviction is $5,000 before the surcharge. A second conviction starts at $10,000.",
      "The most common answer is that the vehicle was in fact insured and the driver could not produce proof at the roadside. Obtaining the policy documentation and confirming coverage was in force on that date resolves a substantial share of these outright.",
      "Where a policy lapsed for non-payment or was cancelled without the driver's knowledge, the section provides for a due-diligence argument that has to be raised properly.",
      "Given the size of the minimum fine, this is not a charge to pay without advice.",
    ],
  },
  {
    slug: "failing-to-remain",
    title: "Failing to remain",
    section: "HTA 200(1)",
    fine: "Court's discretion",
    points: "7 points",
    tone: "red",
    blurb: "Leaving the scene carries the highest demerit total of any HTA offence.",
    rows: [
      ["Demerit points", "7 — the highest"],
      ["Set fine", "Court's discretion"],
      ["Also possible", "Criminal charge"],
    ],
    defence: [
      "Seven demerit points is the highest any Highway Traffic Act offence carries. Nine points triggers a licence review, so a single conviction puts most drivers close to the edge.",
      "The section requires knowledge that a collision occurred. Minor contact in a parking lot, or an impact a driver genuinely did not feel or notice, goes directly to that element.",
      "Where the driver stopped, provided information, and left afterward, the requirements may well have been satisfied — the notes often do not capture what was exchanged.",
      "A parallel Criminal Code charge is possible in serious cases. If that applies to you, say so when you call, because it changes how the matter has to be handled.",
    ],
  },
  {
    slug: "driving-under-suspension",
    title: "Driving under suspension",
    section: "HTA 53(1)",
    fine: "Court's discretion",
    points: "—",
    tone: "red",
    blurb: "Further suspension, vehicle impoundment, and possible jail. Serious defence required.",
    rows: [
      ["Fine", "Court's discretion"],
      ["Vehicle", "Impoundment"],
      ["Jail", "Possible"],
    ],
    defence: [
      "A conviction carries a further suspension on top of the one you were already serving, vehicle impoundment, and a real possibility of jail. It is among the most serious charges in the Act.",
      "The Crown must prove you knew, or ought to have known, that your licence was suspended. Notice sent to an old address, or an administrative suspension a driver was never told about, goes straight to that element.",
      "Ministry records establishing when and how notice was given are central, and obtaining them takes time.",
      "Do not respond to this charge without advice. The consequences of a guilty plea here are considerably worse than the ticket suggests.",
    ],
    photo: "driving-under-suspension.webp",
    credit: "Erik Mclean",
  },
  {
    slug: "school-bus",
    title: "Failing to stop for a school bus",
    section: "HTA 175(11)",
    fine: "$400 – $2,000",
    points: "6 points",
    tone: "red",
    blurb: "Six points on a first offence, and subsequent convictions can carry jail time.",
    rows: [
      ["Set fine", "$400 – $2,000"],
      ["Demerit points", "6"],
      ["Repeat offence", "Jail possible"],
    ],
    defence: [
      "Six demerit points on a first conviction, and a second can carry up to six months in jail. Courts treat these unsympathetically, which makes the defence work matter more.",
      "The requirement is triggered by the upper red signals flashing. Whether they were actually activated, and at what point, is the central question — the amber warning phase precedes the red and does not carry the same obligation.",
      "Drivers on the opposite side of a road divided by a median are not required to stop. Whether the roadway was in fact divided is a recurring and winnable issue.",
      "Many of these are laid days later on a bus driver's report or camera footage rather than by an officer at the scene, which raises identification questions.",
    ],
    photo: "school-bus.webp",
    credit: "Robin Jonathan Deutsch",
  },
];

/** Charges with a photo lead the grid so the section reads as illustrated. */
export const SERVICES_ORDERED = [
  ...SERVICES.filter((s) => s.photo),
  ...SERVICES.filter((s) => !s.photo),
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/** Photographer credits for the footer. Unsplash doesn't require it. */
export const PHOTO_CREDITS = SERVICES.filter((s) => s.credit).map((s) => s.credit!);

export const CATCH_ALL = {
  title: "Any other HTA charge",
  blurb:
    "Lane changes, defective equipment, plate and permit offences, commercial vehicle charges. If it's a Highway Traffic Act ticket, send it to us.",
};

export const SEVERITY_LEGEND: { tone: string; label: string }[] = [
  { tone: "#CA8A04", label: "Standard" },
  { tone: "#EA580C", label: "Serious" },
  { tone: "#DC2626", label: "Most severe" },
];

export const TONE_HEX: Record<Tone, string> = {
  yellow: "#CA8A04",
  orange: "#EA580C",
  red: "#DC2626",
};
