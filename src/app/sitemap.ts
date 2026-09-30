import type { MetadataRoute } from "next";
import { getAllPublished } from "@/lib/posts";

const BASE = "https://janardan.xyz";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const posts = await getAllPublished();
    return [
      ...staticRoutes,
      ...posts.map((p) => ({
        url: `${BASE}/writing/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // A database hiccup should degrade the sitemap, not break it.
    return staticRoutes;
  }
}
