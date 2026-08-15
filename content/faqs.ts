// FAQ content. Also feeds FAQPage JSON-LD so Google can surface these
// directly in search results. Keep answers factual and specific — vague
// answers don't get picked up and don't help anyone.

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Do I have to go to court?",
    a: "No. Your paralegal attends on your behalf. For the large majority of Highway Traffic Act charges you never set foot in a courthouse. The exception is a full trial where you are needed as a witness, and you would know about that well in advance.",
  },
  {
    q: "How much does it cost to fight a traffic ticket in Ontario?",
    a: "GuidLaw charges a flat fee quoted before you commit — no hourly billing and no per-appearance charges. The amount depends on the offence and the court. Minor charges sit at the low end; careless driving, stunt driving, and trials cost more because they take substantially more work. Send us the ticket and you get the exact number before you decide anything.",
  },
  {
    q: "Is a paralegal as good as a lawyer for a traffic ticket?",
    a: "For Highway Traffic Act matters, yes. Licensed paralegals in Ontario are regulated by the Law Society of Ontario and have full rights of appearance in Provincial Offences Court, which is where traffic tickets are heard. Many paralegals appear there daily and know the local prosecutors and justices better than a general-practice lawyer would. They also cost less.",
  },
  {
    q: "What happens if I just pay the ticket?",
    a: "Paying is a guilty plea. The conviction goes on your driving record, any demerit points are applied, and your insurer sees it at renewal. The fine is usually the smallest part of the cost. A single conviction can raise premiums for three years, which routinely exceeds the fine several times over.",
  },
  {
    q: "How long do I have to fight a ticket in Ontario?",
    a: "You generally have 15 days from the date on the ticket to file your intention to fight it. Miss that window and you can be deemed to have not disputed the charge, which results in a conviction being registered. If your 15 days have passed, you may still have options through a reopening application, but act immediately.",
  },
  {
    q: "Will fighting my ticket make my insurance go up?",
    a: "No. Insurers rate on convictions, not on charges you disputed. Fighting a ticket and winning leaves nothing on your record for them to see. Fighting and losing puts you where you would have been if you had simply paid it. There is no insurance penalty for disputing a charge.",
  },
  {
    q: "How long does the whole process take?",
    a: "Most matters resolve in three to eight months from the date you file. Timelines depend heavily on the court — some Ontario jurisdictions have significantly longer backlogs than others. You do not need to do anything during that period. Your paralegal handles filings, disclosure, and negotiations, and updates you when something changes.",
  },
  {
    q: "What happens if we lose?",
    a: "You pay the fine and the conviction is registered, the same outcome as if you had never fought it. In many cases the realistic goal is not outright dismissal but reduction — a careless driving charge negotiated down to a lesser offence takes you from six demerit points to two or three and removes the suspension exposure. That is a win even though it is not a withdrawal.",
  },
  {
    q: "Do you handle tickets outside Toronto?",
    a: "Yes. We cover Provincial Offences courts across Ontario, from Windsor to Ottawa and north. Your paralegal is assigned partly on the basis of which court your matter is in, because familiarity with the local court matters to the outcome.",
  },
  {
    q: "How do I get started?",
    a: "Send us a photo of your ticket. We review it at no charge and tell you what you are actually facing, what your realistic options are, and what it costs to fight. If you decide to proceed we assign an LSO-licensed paralegal, usually within 24 hours. If we do not think fighting it is worth your money, we will say so.",
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
