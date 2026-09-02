import type { MetadataRoute } from "next";
import { genreCatalog } from "@/config/genres";

const staticRoutes = [
  "",
  "/movies",
  "/tv",
  "/trending",
  "/popular",
  "/top-rated",
  "/genres",
  "/search",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cineverse.example.com";

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })),
    ...genreCatalog.map((genre) => ({
      url: `${baseUrl}/genres/${genre.slug}`,
      lastModified: new Date(),
    })),
  ];
}
