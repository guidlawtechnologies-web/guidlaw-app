// Process steps and service commitments. Shared between the homepage
// (condensed) and the dedicated pages (full) so the two can't drift.

export type Step = {
  n: string;
  icon: "upload" | "user-check" | "scale" | "check-circle";
  title: string;
  short: string;
  detail: string[];
  timing: string;
};

export const STEPS: Step[] = [
  {
    n: "01",
    icon: "upload",
    title: "Send us the ticket",
    short: "Photograph your ticket and send it. Two minutes, no account needed.",
    detail: [
      "Take a photo of the ticket and send it over. Everything we need at this stage is already printed on it — the offence, the section number, the court, and the date.",
      "You don't have to explain what happened yet, and you're not deciding anything. Nothing is charged for this.",
    ],
    timing: "2 minutes",
  },
  {
    n: "02",
    icon: "user-check",
    title: "We review it and quote you",
    short:
      "A free review of what you're actually facing, what your options are, and a flat fee.",
    detail: [
      "We read the charge properly and tell you what comes with it: the fine, the demerit points, and what it does to your licence and your insurance. Most people are surprised by at least one of those.",
      "You'll also get an honest read on how it's likely to go. Sometimes that means a good shot at a withdrawal. Sometimes it means getting six demerit points down to two. And sometimes it means the ticket isn't worth fighting, which we'll say plainly.",
      "The fee comes with all of that — one number, before you've committed to anything.",
    ],
    timing: "Within 1 business day",
  },
  {
    n: "03",
    icon: "scale",
    title: "Your paralegal takes over",
    short:
      "An LSO-licensed paralegal files, requests disclosure, and negotiates on your behalf.",
    detail: [
      "We match you with a paralegal licensed by the Law Society of Ontario, picked partly for the courthouse your matter is in. You'll get their name and licence number, so you know exactly who's handling it.",
      "From there they file your intention to dispute, request disclosure from the prosecutor, and go through the officer's notes looking for problems — the wrong plate recorded, missing calibration records, disclosure that never fully arrived. It isn't dramatic work, but it's where most tickets are actually won.",
      "They handle the negotiation with the prosecutor and show up in court. You stay at work.",
    ],
    timing: "3–8 months, court depending",
  },
  {
    n: "04",
    icon: "check-circle",
    title: "The matter resolves",
    short: "Withdrawn, reduced, or decided at trial. You hear the outcome from us.",
    detail: [
      "Most matters end in a withdrawal, or in the charge being reduced to something lesser. A reduction is worth more than it sounds: going from six demerit points to two keeps your licence out of trouble and gives your insurer far less to work with.",
      "And if the charge does stand, you're no worse off than if you'd paid it on day one. There's no separate penalty for having fought it, because insurers only ever look at convictions.",
    ],
    timing: "You're told either way",
  },
];

export type Commitment = { n: string; title: string; body: string };

export const COMMITMENTS: Commitment[] = [
  {
    n: "01",
    title: "We tell you if it's not worth fighting",
    body:
      "Some tickets genuinely aren't worth the fee, and if yours is one of them we'll say so during the free review and you'll keep your money. We'd rather lose the sale than take it for something we can't help with.",
  },
  {
    n: "02",
    title: "Licensed paralegals only",
    body:
      "Your case is handled by a paralegal licensed with the Law Society of Ontario who can appear in Provincial Offences Court. You'll get their name and licence number when we assign them, so you can look them up yourself.",
  },
  {
    n: "03",
    title: "The price doesn't move",
    body:
      "One flat fee, quoted before you commit to anything. No hourly billing, nothing extra for court appearances, and no invoice at the end that's bigger than the number we gave you at the start.",
  },
  {
    n: "04",
    title: "You don't go to court",
    body:
      "Your paralegal appears in your place. For almost every Highway Traffic Act charge that means you never take a day off work or set foot in a courthouse.",
  },
  {
    n: "05",
    title: "We answer within one business day",
    body:
      "Send us a ticket and you'll hear back within a business day, usually sooner than that. And if we're going to miss it for any reason, we'll tell you rather than leave you wondering.",
  },
  {
    n: "06",
    title: "Straight answers about outcomes",
    body:
      "Not every charge gets withdrawn, and often the real win is a reduction — six demerit points brought down to two. We'll tell you which of those is realistic for your ticket before you've paid us anything.",
  },
];
