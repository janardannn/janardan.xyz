import { unstable_cache } from "next/cache";
import { getPrisma } from "@/lib/db";

export type DailyPoint = { date: string; count: number };

export type SiteStats = {
  totalViews: number;
  dailyViews: DailyPoint[];
  regions: number;
  posts: number;
  build: string;
};

const SERIES_DAYS = 14;
const TZ = "Asia/Kolkata";

/** Only visitors the bot scorer cleared. Traverses PageView -> Session -> Visitor. */
const humanPageViews = { session: { visitor: { isBot: false } } } as const;

function dayKey(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

/**
 * Builds a dense series: every day in the window gets a point, including the
 * zeroes. A sparse series makes a sparkline silently compress quiet days into
 * what looks like continuous activity.
 */
function zeroFilledSeries(timestamps: Date[], days: number): DailyPoint[] {
  const counts = new Map<string, number>();
  for (const ts of timestamps) {
    const key = dayKey(ts);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const series: DailyPoint[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - (days - 1));

  for (let i = 0; i < days; i++) {
    const key = dayKey(cursor);
    series.push({ date: key, count: counts.get(key) ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  return series;
}

async function querySiteStats(): Promise<SiteStats> {
  const prisma = await getPrisma();

  const since = new Date();
  since.setDate(since.getDate() - (SERIES_DAYS - 1));
  since.setHours(0, 0, 0, 0);

  const [totalViews, recent, countries, posts] = await Promise.all([
    prisma.pageView.count({ where: humanPageViews }),
    prisma.pageView.findMany({
      where: { ...humanPageViews, timestamp: { gte: since } },
      select: { timestamp: true },
    }),
    prisma.visitor.findMany({
      where: { isBot: false, country: { not: null } },
      select: { country: true },
      distinct: ["country"],
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  return {
    totalViews,
    dailyViews: zeroFilledSeries(
      recent.map((r) => r.timestamp),
      SERIES_DAYS
    ),
    regions: countries.length,
    posts,
    build: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev",
  };
}

const cachedSiteStats = unstable_cache(querySiteStats, ["site-stats"], {
  revalidate: 60,
});

/**
 * Aggregates only — no fingerprint, IP, city, timestamp or concurrent-visitor
 * count ever reaches the client.
 *
 * Returns null on any failure. The telemetry strip renders nothing in that
 * case rather than showing partial or stale-looking numbers; losing the
 * database must never take the homepage down with it.
 */
export async function getSiteStats(): Promise<SiteStats | null> {
  try {
    return await cachedSiteStats();
  } catch (error) {
    console.error("[stats] site stats unavailable:", error);
    return null;
  }
}
