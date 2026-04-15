import type { MetadataRoute } from "next";
import { listSlugs } from "@/lib/content";

const BASE = "https://gsenergia.pl";
const now = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [uslugiSlugs, realizacjeSlugs, postSlugs] = await Promise.all([
    Promise.resolve(listSlugs("uslugi")),
    Promise.resolve(listSlugs("realizacje")),
    Promise.resolve(listSlugs("posts")),
  ]);

  const PRIMARY_SERVICES = [
    "audyt-energetyczny-przedsiebiorstwa",
    "audyt-efektywnosci-energetycznej",
    "audyt-chlodniczy",
    "audyt-wodorowy",
    "ems-telemetria",
    "magazyn-energii-bess",
    "dekarbonizacja",
  ];

  return [
    // ── Static pages ────────────────────────────────────────────────────────
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE}/uslugi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/realizacje`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE}/o-nas`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/kontakt`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    // ── Services — 7 primary (priority 0.9), rest 0.7 ───────────────────────
    ...uslugiSlugs.map((slug) => ({
      url: `${BASE}/uslugi/${slug}`,
      changeFrequency: "weekly" as const,
      priority: PRIMARY_SERVICES.includes(slug) ? 0.9 : 0.7,
    })),

    // ── Case studies ─────────────────────────────────────────────────────────
    ...realizacjeSlugs.map((slug) => ({
      url: `${BASE}/realizacje/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // ── Blog posts ───────────────────────────────────────────────────────────
    ...postSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
