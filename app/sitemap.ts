import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
import { POSTS } from "@/content/posts";

const BASE = "https://www.guidlaw.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/submit-ticket`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/lawyers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // One entry per charge — these are the pages meant to rank for
  // "<offence> ticket Ontario" searches.
  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...core, ...services, ...posts];
}
