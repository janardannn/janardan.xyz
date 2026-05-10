import { getPrisma } from "@/lib/db";

type DateRange = { from: Date | undefined; to: Date | undefined };

function getDateRange(range: string): DateRange {
  if (range === "all") {
    return { from: undefined, to: undefined };
  }
  const to = new Date();
  const from = new Date();
  switch (range) {
    case "90d":
      from.setDate(from.getDate() - 90);
      break;
    case "30d":
      from.setDate(from.getDate() - 30);
      break;
    case "7d":
    default:
      from.setDate(from.getDate() - 7);
      break;
  }
  return { from, to };
}

function dateFilter(range: string, field: string = "timestamp") {
  const { from, to } = getDateRange(range);
  if (!from || !to) return undefined;
  return { [field]: { gte: from, lte: to } };
}

export async function getOverviewStats(range: string = "7d") {
  const prisma = await getPrisma();
  const df = dateFilter(range);
  const sessionDf = dateFilter(range, "startedAt");
  const visitorDf = dateFilter(range, "lastSeenAt");

  const [visitors, bots, sessions, pageViews, events] = await Promise.all([
    prisma.visitor.count({ where: { ...visitorDf } }),
    prisma.visitor.count({ where: { ...visitorDf, isBot: true } }),
    prisma.session.count({ where: { ...sessionDf } }),
    prisma.pageView.count({ where: { ...df } }),
    prisma.trackingEvent.count({ where: { ...df } }),
  ]);

  const durationAgg = await prisma.session.aggregate({
    where: { ...sessionDf },
    _avg: { duration: true },
  });

  const bounceSessions = await prisma.session.count({
    where: { ...sessionDf, pageCount: { lte: 1 } },
  });

  const avgDuration = Math.round(durationAgg._avg.duration ?? 0);
  const bounceRate = sessions > 0 ? Math.round((bounceSessions / sessions) * 100) : 0;

  return { visitors, bots, sessions, pageViews, events, avgDuration, bounceRate };
}

export async function getTopPages(range: string = "7d", limit: number = 10) {
  const prisma = await getPrisma();
  const df = dateFilter(range);

  const pages = await prisma.pageView.groupBy({
    by: ["path"],
    where: { ...df },
    _count: { id: true },
    _avg: { duration: true, scrollDepth: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });

  return pages.map((p) => ({
    path: p.path,
    views: p._count.id,
    avgDuration: Math.round(p._avg.duration ?? 0),
    avgScrollDepth: Math.round(p._avg.scrollDepth ?? 0),
  }));
}

export async function getTopReferrers(range: string = "7d", limit: number = 10) {
  const prisma = await getPrisma();
  const sessionDf = dateFilter(range, "startedAt");

  const referrers = await prisma.session.groupBy({
    by: ["referrer"],
    where: { ...sessionDf, referrer: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });

  return referrers.map((r) => ({
    referrer: r.referrer ?? "Direct",
    count: r._count.id,
  }));
}

export async function getDeviceBreakdown(range: string = "7d") {
  const prisma = await getPrisma();
  const visitorDf = dateFilter(range, "lastSeenAt");

  const [browsers, oses, devices] = await Promise.all([
    prisma.visitor.groupBy({
      by: ["browser"],
      where: { ...visitorDf },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
    prisma.visitor.groupBy({
      by: ["os"],
      where: { ...visitorDf },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
    prisma.visitor.groupBy({
      by: ["device"],
      where: { ...visitorDf },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
  ]);

  return {
    browsers: browsers.map((b) => ({ name: b.browser ?? "Unknown", count: b._count.id })),
    oses: oses.map((o) => ({ name: o.os ?? "Unknown", count: o._count.id })),
    devices: devices.map((d) => ({ name: d.device ?? "Unknown", count: d._count.id })),
  };
}

export async function getTopEvents(range: string = "7d", limit: number = 10) {
  const prisma = await getPrisma();
  const df = dateFilter(range);

  const events = await prisma.trackingEvent.groupBy({
    by: ["name"],
    where: { ...df },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });

  return events.map((e) => ({ name: e.name, count: e._count.id }));
}

export async function getVisitors(
  page: number = 1,
  perPage: number = 20
) {
  const prisma = await getPrisma();
  const skip = (page - 1) * perPage;

  const [visitors, total] = await Promise.all([
    prisma.visitor.findMany({
      orderBy: { lastSeenAt: "desc" },
      skip,
      take: perPage,
      include: { _count: { select: { sessions: true } } },
    }),
    prisma.visitor.count(),
  ]);

  return {
    visitors: visitors.map((v) => ({
      id: v.id,
      fingerprint: v.fingerprint,
      isBot: v.isBot,
      browser: v.browser,
      os: v.os,
      device: v.device,
      country: v.country,
      city: v.city,
      sessionCount: v._count.sessions,
      firstSeenAt: v.firstSeenAt,
      lastSeenAt: v.lastSeenAt,
    })),
    total,
    pages: Math.ceil(total / perPage),
  };
}

export async function getVisitorDetail(id: string) {
  const prisma = await getPrisma();

  const visitor = await prisma.visitor.findUnique({
    where: { id },
    include: {
      sessions: {
        orderBy: { startedAt: "desc" },
        include: {
          pageViews: { orderBy: { timestamp: "asc" } },
          events: { orderBy: { timestamp: "asc" } },
        },
      },
    },
  });

  return visitor;
}

export async function getEventStream(
  page: number = 1,
  perPage: number = 50,
  filters?: { name?: string; category?: string; path?: string }
) {
  const prisma = await getPrisma();
  const skip = (page - 1) * perPage;

  const where: Record<string, unknown> = {};
  if (filters?.name) where.name = filters.name;
  if (filters?.category) where.category = filters.category;
  if (filters?.path) where.path = { contains: filters.path };

  const [events, total] = await Promise.all([
    prisma.trackingEvent.findMany({
      where,
      orderBy: { timestamp: "desc" },
      skip,
      take: perPage,
      include: { session: { select: { visitor: { select: { fingerprint: true } } } } },
    }),
    prisma.trackingEvent.count({ where }),
  ]);

  return {
    events: events.map((e) => ({
      id: e.id,
      name: e.name,
      category: e.category,
      path: e.path,
      properties: e.properties,
      timestamp: e.timestamp,
      fingerprint: e.session.visitor.fingerprint,
    })),
    total,
    pages: Math.ceil(total / perPage),
  };
}

export async function getGeoBreakdown(range: string = "7d") {
  const prisma = await getPrisma();
  const visitorDf = dateFilter(range, "lastSeenAt");
  const where = { ...visitorDf, country: { not: null } };

  const [countries, cities] = await Promise.all([
    prisma.visitor.groupBy({
      by: ["country"],
      where,
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["city", "country"],
      where: { ...where, city: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
  ]);

  return {
    countries: countries.map((c) => ({
      name: c.country ?? "Unknown",
      count: c._count.id,
    })),
    cities: cities.map((c) => ({
      name: c.city ?? "Unknown",
      country: c.country ?? "",
      count: c._count.id,
    })),
  };
}

export async function getHardwareBreakdown(range: string = "7d") {
  const prisma = await getPrisma();
  const visitorDf = dateFilter(range, "lastSeenAt");

  const [gpuRenderers, memoryTiers, connectionTypes] = await Promise.all([
    prisma.visitor.groupBy({
      by: ["webglRenderer"],
      where: { ...visitorDf, webglRenderer: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["deviceMemory"],
      where: { ...visitorDf, deviceMemory: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["connectionType"],
      where: { ...visitorDf, connectionType: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
  ]);

  return {
    gpuRenderers: gpuRenderers.map((g) => ({
      name: g.webglRenderer ?? "Unknown",
      count: g._count.id,
    })),
    memoryTiers: memoryTiers.map((m) => ({
      name: m.deviceMemory ? `${m.deviceMemory} GB` : "Unknown",
      count: m._count.id,
    })),
    connectionTypes: connectionTypes.map((c) => ({
      name: c.connectionType ?? "Unknown",
      count: c._count.id,
    })),
  };
}

export async function getDailyPageViews(range: string = "7d") {
  const prisma = await getPrisma();
  const df = dateFilter(range);

  const views = await prisma.pageView.findMany({
    where: { ...df },
    select: { timestamp: true },
    orderBy: { timestamp: "asc" },
  });

  const daily: Record<string, number> = {};
  for (const v of views) {
    const day = v.timestamp.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    daily[day] = (daily[day] || 0) + 1;
  }

  return Object.entries(daily).map(([date, count]) => ({ date, count }));
}
