// Blog content. Plain data — no CMS, no markdown parser.
// Every fine amount and HTA section here was verified before publishing.
// If you change a number, check it against the current Act first.

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string; cite?: string }
  | { t: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  section: string;
  fine: string;
  date: string;
  readTime: string;
  body: Block[];
};

export const POSTS: Post[] = [
  // ─────────────────────────────────────────────────────────────
  {
    slug: "snow-covered-licence-plate-ontario",
    title: "Snow on your licence plate is an $85 ticket",
    excerpt:
      "Section 13 doesn't care how the snow got there. Your plate has to be readable, and road slush covers it faster than most drivers expect.",
    category: "Winter driving",
    section: "HTA s.13",
    fine: "From $85",
    date: "2026-08-04",
    readTime: "3 min read",
    body: [
      { t: "p", text: "Your plate has to be readable. Snow counts as an obstruction." },
      {
        t: "p",
        text: "Section 13 of the Highway Traffic Act requires plates to be kept clean and free of anything that obscures them. Police enforce it through the winter. The minimum fine is $85.",
      },
      { t: "p", text: "No demerit points. That part is fine." },
      {
        t: "p",
        text: "The problem is how easily you get one. You clear the windshield, get in, and drive. Nobody thinks about the rear plate. Two kilometres of highway slush later it's unreadable, and the cruiser behind you can't run it.",
      },
      { t: "h2", text: "How it got there doesn't matter" },
      {
        t: "p",
        text: "Drivers assume there's a defence in this. There usually isn't. The offence is driving with an obscured plate. Not causing it, not intending it. You can leave a clean driveway and be in violation by the next intersection.",
      },
      {
        t: "p",
        text: "Officers know road spray does this. It rarely changes the outcome at the roadside.",
      },
      { t: "h2", text: "What actually gets these dropped" },
      {
        t: "p",
        text: "Most section 13 tickets that go away go away on the paperwork, not the story. Common problems with the ticket itself:",
      },
      {
        t: "ul",
        items: [
          "The plate number on the certificate doesn't match the vehicle",
          "The officer's notes don't describe what was obscured or how",
          "Location or time is recorded wrong",
          "Disclosure never arrives, or arrives incomplete",
        ],
      },
      {
        t: "p",
        text: "That's the work. Request disclosure, read the officer's notes, find the defect. It's unglamorous and it's how most minor charges end.",
      },
      { t: "h2", text: "Is it worth fighting an $85 ticket" },
      {
        t: "p",
        text: "On its own, for most people, no. Pay it and move on.",
      },
      {
        t: "p",
        text: "It changes if you already have convictions on your record, if you're a new driver, or if you drive for a living. Minor convictions accumulate, and insurers look at the count, not the severity. Three small ones can cost you more at renewal than a single moderate one.",
      },
      {
        t: "callout",
        title: "If you were stopped for something else",
        text: "Plate tickets are often written alongside a bigger charge from the same stop. Deal with them together. The plate charge is sometimes what gets traded away in a resolution on the serious count.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: "snow-on-roof-windshield-ontario-charges",
    title: "Driving with snow on your car: two charges, not one",
    excerpt:
      "Snow on the windshield and snow on the roof are different offences under different sections. One is about what you can see. The other is about what you throw at the car behind you.",
    category: "Winter driving",
    section: "HTA s.74 & s.111(2)",
    fine: "$85 – $310",
    date: "2026-07-28",
    readTime: "4 min read",
    body: [
      {
        t: "p",
        text: "Most drivers clear a porthole in the windshield and go. That exposes you to two separate charges.",
      },
      { t: "h2", text: "Section 74: you can't see out" },
      {
        t: "p",
        text: "Section 74 requires the windshield and the front side windows to be in a condition that gives the driver a clear view to the front and side. Snow, ice, and fog all qualify as failing that.",
      },
      {
        t: "p",
        text: "Set fine is $85 plus a $25 surcharge. On conviction the maximum runs to $1,000, though that's rare on a first offence with no collision.",
      },
      {
        t: "p",
        text: "Side mirrors can substitute for a blocked rear window. They can't substitute for the windshield.",
      },
      { t: "h2", text: "Section 111(2): you're a hazard to everyone behind you" },
      {
        t: "p",
        text: "This is the one drivers don't know about. Snow and ice left on the roof or hood can be treated as an insecure load under section 111(2), the same provision that covers unsecured cargo.",
      },
      {
        t: "quote",
        text: "No person shall operate ... a motor vehicle that carries a load ... unless the load is loaded, bound, secured, contained or covered so that no portion of the load may become dislodged or fall, leak, spill or blow from the vehicle.",
        cite: "Highway Traffic Act, s.111(2)",
      },
      {
        t: "p",
        text: "Minimum $130. For a commercial vehicle it's $310.",
      },
      {
        t: "p",
        text: "A sheet of roof ice coming off at highway speed can go through a windshield. When it does, the charge escalates. OPP have laid careless driving in those cases, which is a different order of problem.",
      },
      { t: "h2", text: "Why this matters more than the fine" },
      {
        t: "p",
        text: "If your ice hits another vehicle, you're not just facing a ticket. You're facing a civil claim, and the conviction is evidence of fault in it. That's the real exposure.",
      },
      {
        t: "p",
        text: "The same goes at insurance renewal. A $130 fine is not the cost. Three years of a loaded premium is the cost.",
      },
      { t: "h2", text: "Defences that work" },
      {
        t: "ul",
        items: [
          "Snow accumulated during the drive, not before it — genuinely arguable on a long trip in falling snow",
          "The officer never observed anything dislodge, and the notes say so",
          "The vehicle was cleared and photographs from that morning exist",
          "Disclosure fails to establish what part of the vehicle was covered",
        ],
      },
      {
        t: "callout",
        title: "Clear the whole car",
        text: "Roof, hood, trunk, all glass, all lights, both plates. It takes four minutes. Both of these charges disappear entirely if you do it.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: "black-ice-careless-driving-ontario",
    title: "You hit black ice and got charged with careless driving",
    excerpt:
      "Losing control is not automatically careless driving. The Crown has to prove you fell below the standard of a reasonable driver in those conditions. That's a real burden, and it's where these cases get won.",
    category: "Careless driving",
    section: "HTA s.130",
    fine: "$400 – $2,000",
    date: "2026-08-11",
    readTime: "5 min read",
    body: [
      {
        t: "p",
        text: "This is the most serious ticket in this list by a wide margin. Treat it that way.",
      },
      {
        t: "p",
        text: "Careless driving under section 130 carries a fine of $400 to $2,000, six demerit points, a possible licence suspension of up to two years, and up to six months in jail. Convictions routinely double an insurance premium and can get a policy cancelled outright.",
      },
      { t: "h2", text: "What happens at the scene" },
      {
        t: "p",
        text: "You slide on ice. You end up in a ditch or into the car ahead. Police arrive, see a single-vehicle collision or a rear-end impact, and write careless driving.",
      },
      {
        t: "p",
        text: "It's close to reflexive. An officer attending a winter collision has a damaged vehicle in front of them and a driver who lost control. Section 130 is the charge that fits without further investigation.",
      },
      {
        t: "p",
        text: "That does not mean it will stand up.",
      },
      { t: "h2", text: "The standard is not 'you crashed'" },
      {
        t: "p",
        text: "Section 130 requires driving without due care and attention, or without reasonable consideration for others using the highway. The Crown has to prove that. A collision by itself doesn't establish it.",
      },
      {
        t: "p",
        text: "The comparison is a reasonable, prudent driver in the same conditions. Black ice is, by definition, not visible. A driver who was at or under the limit, in the right lane, with proper following distance, who lost traction on ice they could not have seen, has an argument that they met the standard and the road defeated them.",
      },
      {
        t: "p",
        text: "That argument has to be made properly. It does not make itself, and it will not be made for you by the officer.",
      },
      { t: "h2", text: "What the file needs to show" },
      {
        t: "ul",
        items: [
          "Your speed relative to the posted limit and to conditions",
          "Environment Canada records for that location and hour",
          "Whether the road had been salted or sanded, and when",
          "Whether other collisions occurred on the same stretch that day",
          "Your following distance and lane position",
          "Vehicle condition, including tires",
        ],
      },
      {
        t: "p",
        text: "Several of those come from disclosure. Some come from third-party records that have to be requested before they're purged. The window on that is not long.",
      },
      { t: "h2", text: "Reduction is often the realistic outcome" },
      {
        t: "p",
        text: "Not every careless driving charge gets withdrawn. A common result is a plea to a lesser offence, typically an unsafe move or a following-too-closely charge. That drops you from six demerit points to two or three, cuts the fine substantially, and takes the suspension and jail exposure off the table.",
      },
      {
        t: "p",
        text: "For most drivers that outcome is worth far more than the fee it costs to get there.",
      },
      {
        t: "callout",
        title: "Do not plead guilty by mail",
        text: "Paying a careless driving ticket is a guilty plea to a six-point offence. It goes on your record for three years and your insurer will find it. If you have been charged under section 130, speak to someone before the response deadline.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: "winter-tires-not-required-ontario",
    title: "Winter tires are not required by law in Ontario",
    excerpt:
      "Quebec mandates them. British Columbia mandates them on designated highways. Ontario does not. But there's a financial reason to run them anyway, and a legal one you won't see coming.",
    category: "Myths",
    section: "No HTA requirement",
    fine: "No fine",
    date: "2026-07-21",
    readTime: "3 min read",
    body: [
      {
        t: "p",
        text: "There is no section of the Highway Traffic Act requiring winter tires. You cannot be ticketed for running all-seasons in February.",
      },
      {
        t: "p",
        text: "Quebec requires them from December 1 to March 15. British Columbia requires them on designated highways. Ontario has no equivalent. Neither do the other provinces.",
      },
      { t: "h2", text: "The discount is mandatory even though the tires aren't" },
      {
        t: "p",
        text: "Since January 1, 2016, every insurer writing auto policies in Ontario has been required to offer a discount to drivers who install winter tires. It typically runs 3 to 5 percent.",
      },
      {
        t: "p",
        text: "Insurers set their own rules on dates and proof. Most want all four installed and want to see the invoice. Ask yours directly — it is not always applied automatically.",
      },
      { t: "h2", text: "Where tires become a legal problem anyway" },
      {
        t: "p",
        text: "This is the part drivers miss. You can't be charged for not having winter tires. You can absolutely have your tire choice used against you after a collision.",
      },
      {
        t: "p",
        text: "In a careless driving prosecution, the question is whether you drove reasonably in the conditions. Worn all-seasons on packed snow are part of that picture. So is tread depth. The Crown does not need a tire regulation to point at them — it only needs to argue that a reasonable driver in those conditions would have done something differently.",
      },
      {
        t: "p",
        text: "The same logic shows up in civil claims for the collision itself.",
      },
      { t: "h2", text: "All-season is a marketing word" },
      {
        t: "p",
        text: "All-season rubber hardens near 7°C and loses grip well before there's any snow on the ground. The relevant marking is the three-peak mountain snowflake. M+S alone is not the same thing and does not meet the same test.",
      },
      {
        t: "callout",
        title: "Short version",
        text: "No ticket for skipping winter tires. A discount you're owed if you fit them. And a weaker position if you're ever charged after a winter collision.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: "speeding-in-snow-ontario-limit-does-not-change",
    title: "The speed limit doesn't drop when it snows",
    excerpt:
      "Drivers assume conditions lower the limit. They don't. What conditions do is expose you to a second, heavier charge on top of the speeding ticket.",
    category: "Speeding",
    section: "HTA s.128 & s.130",
    fine: "$95 – $2,000",
    date: "2026-08-15",
    readTime: "4 min read",
    body: [
      {
        t: "p",
        text: "The posted limit is the limit. Snow does not lower it, and driving under it does not protect you.",
      },
      {
        t: "p",
        text: "Section 128 is an absolute-liability offence. Radar says 118 in a 100 zone, that's the case. Weather is not a defence to speeding. It never has been.",
      },
      { t: "h2", text: "The trap runs the other way" },
      {
        t: "p",
        text: "Conditions don't help you on the speeding charge. They can hurt you on a second one.",
      },
      {
        t: "p",
        text: "Doing 90 in a 100 zone is legal. Doing 90 in a 100 zone during a whiteout, with cars in the ditch on either side, is where careless driving under section 130 gets laid. Too fast for conditions is not a speeding charge in Ontario. It is prosecuted as careless driving, and that carries six demerit points and a fine starting at $400.",
      },
      {
        t: "p",
        text: "Drivers are genuinely surprised by this. They were under the limit. They still got the heavier charge.",
      },
      { t: "h2", text: "Stunt driving still applies in winter" },
      {
        t: "p",
        text: "Nothing about the stunt driving threshold changes in a storm. Forty over on a road posted under 80, or fifty over anywhere else, still means roadside licence suspension and vehicle impoundment on the spot.",
      },
      {
        t: "p",
        text: "Winter adds one thing: the conditions become an aggravating factor at sentencing rather than an excuse.",
      },
      { t: "h2", text: "Fighting a winter speeding ticket" },
      {
        t: "p",
        text: "The defences are the same ones that work in July. Weather isn't among them. What matters is the enforcement:",
      },
      {
        t: "ul",
        items: [
          "Radar or lidar calibration records, and when the device was last tested",
          "The officer's training and certification on that specific device",
          "Whether your vehicle was properly identified and tracked",
          "Disclosure delivered late, incomplete, or not at all",
          "Signage — whether the limit was actually posted where the reading was taken",
        ],
      },
      {
        t: "p",
        text: "Snow does add one wrinkle worth checking. If the posted sign was obscured by snow or a plow bank at the point of the reading, the sign's adequacy is a live question.",
      },
      {
        t: "callout",
        title: "If you got two tickets from one stop",
        text: "Speeding plus careless from the same collision is common in winter. They are handled together. Resolving the careless charge is the priority — that's where the six points and the insurance damage sit.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
