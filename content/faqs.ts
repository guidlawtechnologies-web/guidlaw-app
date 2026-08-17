// FAQ content. Also feeds FAQPage JSON-LD so Google can surface these
// directly in search results. Keep answers factual and specific — vague
// answers don't get picked up and don't help anyone.

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Do I have to go to court?",
    a: "No. Your paralegal goes for you, and for almost every Highway Traffic Act charge you'll never see the inside of a courthouse. The one exception is a full trial where you're needed as a witness, and you'd know about that months ahead of time.",
  },
  {
    q: "How much does it cost to fight a traffic ticket in Ontario?",
    a: "One flat fee, and you'll know it before you commit to anything. There's no hourly billing and nothing extra per court appearance. What it costs depends on the offence and which court you're in — a minor speeding charge sits at the low end, while careless driving, stunt driving, and anything that goes to trial costs more because there's simply more work in them. Send us the ticket and we'll give you the exact number.",
  },
  {
    q: "Is a paralegal as good as a lawyer for a traffic ticket?",
    a: "For traffic tickets, yes. Ontario paralegals are licensed and regulated by the Law Society of Ontario, and they can appear in Provincial Offences Court — which is where your ticket is actually heard. Many of them are in that courtroom several times a week and know the local prosecutors and justices far better than a general-practice lawyer would. They also cost less.",
  },
  {
    q: "What happens if I just pay the ticket?",
    a: "Paying is pleading guilty. The conviction goes on your record, the demerit points land on your licence, and your insurer finds it at renewal. The fine is usually the smallest part of what it costs you — that conviction can sit on your premium for three years, and the extra you pay over that time often comes to several times the fine itself.",
  },
  {
    q: "How long do I have to fight a ticket in Ontario?",
    a: "Usually 15 days from the date on the ticket. If you don't file in that window, the court can treat the charge as undisputed and register a conviction without ever hearing from you. If your 15 days have already gone by, there may still be a way back in through a reopening application — but call us now rather than next week.",
  },
  {
    q: "Will fighting my ticket make my insurance go up?",
    a: "No. Insurers look at convictions, not at charges you disputed. If you fight and win, there's nothing on your record for them to find. If you fight and lose, you end up exactly where you'd have been by paying it. Either way, disputing a ticket costs you nothing with your insurer.",
  },
  {
    q: "How long does the whole process take?",
    a: "Usually three to eight months from the day you file, though it varies a lot by courthouse — some Ontario jurisdictions are running much longer backlogs than others. You don't have to do anything while you wait. Your paralegal handles the filings, the disclosure request, and the negotiation, and gets in touch whenever something actually changes.",
  },
  {
    q: "What happens if we lose?",
    a: "You pay the fine and the conviction goes on your record, which is where you'd have been if you'd never fought it at all. It's worth saying that outright dismissal isn't always the goal. Getting a careless driving charge knocked down to a lesser offence takes you from six demerit points to two or three and takes the suspension off the table — not a withdrawal, but a genuinely good result.",
  },
  {
    q: "Do you handle tickets outside Toronto?",
    a: "Yes, anywhere in Ontario — Windsor to Ottawa and everywhere north. We pick your paralegal partly based on which courthouse you're dealing with, because knowing the local court and the people in it makes a real difference to how a matter goes.",
  },
  {
    q: "Do I need to create an account to send you my ticket?",
    a: "No. Send us the ticket and we'll review it — there's nothing to sign up for and nothing to pay. Accounts only come later: if you decide to go ahead and retain us, we'll set you up with a login so you can follow your case, see your paralegal's updates, and check your court date. Until then there's no reason for you to have one.",
  },
  {
    q: "How do I get started?",
    a: "Send us a photo of your ticket. We'll look at it for free and tell you what you're really facing, what your options are, and what it would cost to fight. If you want to go ahead, we'll assign an LSO-licensed paralegal, usually within a day. And if we don't think it's worth your money, we'll tell you that instead.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
