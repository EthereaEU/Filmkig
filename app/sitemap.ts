import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = ["", "/search", "/watchlist", "/about"];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${base}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${path}`])
        ),
      },
    }))
  );
}
