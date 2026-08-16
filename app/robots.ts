import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Signed-in and transactional areas have nothing to index and
      // shouldn't show up in search results.
      disallow: [
        "/admin/",
        "/driver",
        "/lawyer",
        "/tickets",
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
        "/auth/",
        "/delete-account",
        "/api/",
      ],
    },
    sitemap: "https://www.guidlaw.ca/sitemap.xml",
  };
}
