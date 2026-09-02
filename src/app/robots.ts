import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile", "/watchlist", "/favorites", "/watched"],
    },
    sitemap: "https://cineverse.example.com/sitemap.xml",
  };
}
