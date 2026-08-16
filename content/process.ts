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
      "Take a photo of the ticket and submit it. We need the offence, the section number, the court location, and the date — all of which are printed on the certificate.",
      "You don't need to explain what happened yet, and you don't need to decide anything. Nothing is charged at this stage.",
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
      "We read the charge and tell you what it carries — the fine, the demerit points, the licence and insurance consequences. Most drivers are surprised by at least one of them.",
      "You get a realistic view of outcomes. Sometimes that's a likely withdrawal. Sometimes it's a reduction from six demerit points to two. Occasionally it's that the ticket isn't worth fighting, and we'll tell you that too.",
      "The fee comes with it, as one flat number, before you commit to anything.",
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
      "We assign a paralegal licensed with the Law Society of Ontario, chosen partly on which court your matter sits in. You get their name and licence number.",
      "They file your intention to dispute, request disclosure from the prosecutor, and review the officer's notes for defects — wrong plate, missing calibration records, incomplete disclosure. That paperwork is where most tickets are won.",
      "They negotiate with the prosecutor and appear in court. You don't attend.",
    ],
    timing: "3–8 months, court depending",
  },
  {
    n: "04",
    icon: "check-circle",
    title: "The matter resolves",
    short: "Withdrawn, reduced, or decided at trial. You hear the outcome from us.",
    detail: [
      "Most matters end in a withdrawal or a reduction to a lesser offence. A reduction still matters: dropping from six demerit points to two keeps your licence clear and limits what your insurer sees.",
      "If the charge stands, you're where you would have been had you paid it at the start. Disputing a ticket carries no separate insurance penalty — insurers rate on convictions, not on charges you fought.",
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
      "Some tickets aren't worth the fee. If yours is one of them, we say so during the free review and you keep your money. We'd rather lose the sale than take it for nothing.",
  },
  {
    n: "02",
    title: "Licensed paralegals only",
    body:
      "Every case is handled by a paralegal licensed with the Law Society of Ontario, with full rights of appearance in Provincial Offences Court. You get their name and licence number when we assign them.",
  },
  {
    n: "03",
    title: "The price doesn't move",
    body:
      "One flat fee, quoted before you commit. No hourly billing, no charge per court appearance, no invoice at the end that's bigger than the number we gave you.",
  },
  {
    n: "04",
    title: "You don't go to court",
    body:
      "Your paralegal appears for you. For the vast majority of Highway Traffic Act charges you never take a day off work or enter a courthouse.",
  },
  {
    n: "05",
    title: "We answer within one business day",
    body:
      "Submit a ticket and you hear back within one business day, usually sooner. If we're going to miss that, we tell you rather than leave you waiting.",
  },
  {
    n: "06",
    title: "Straight answers about outcomes",
    body:
      "Not every charge gets withdrawn. Often the real win is a reduction — six demerit points down to two. We'll tell you which one is realistic for your ticket before you pay us anything.",
  },
];
