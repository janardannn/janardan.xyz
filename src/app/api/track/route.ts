import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";

interface IncomingEvent {
  type: "pageview" | "event" | "pageupdate";
  name: string;
  category: string;
  path: string;
  title?: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}

interface TrackingPayload {
  fingerprint: string;
  sessionId: string;
  device: {
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    language: string;
    timezone: string;
    // Enhanced hardware signals
    colorDepth?: number;
    pixelRatio?: number;
    deviceMemory?: number | null;
    maxTouchPoints?: number;
    platform?: string;
    cpuCores?: number | null;
    connectionType?: string | null;
    // Advanced fingerprint signals (raw)
    canvasData?: string;
    webglVendor?: string;
    webglRenderer?: string;
    audioData?: string;
  };
  acquisition: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
  };
  events: IncomingEvent[];
}

function extractGeoData(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") || undefined;
  const region = req.headers.get("x-vercel-ip-country-region") || undefined;
  const rawCity = req.headers.get("x-vercel-ip-city");
  const city = rawCity ? decodeURIComponent(rawCity) : undefined;

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : undefined;

  return { country, region, city, ip };
}

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";
  let device = "desktop";

  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";

  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux") && !ua.includes("Android")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  if (ua.includes("Mobile") || ua.includes("Android")) device = "mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device = "tablet";

  return { browser, os, device };
}

export async function POST(req: NextRequest) {
  try {
    const payload: TrackingPayload = await req.json();
    const { fingerprint, sessionId, device, acquisition, events } = payload;

    if (!fingerprint || !sessionId || !events?.length) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const prisma = await getPrisma();
    const { browser, os, device: deviceType } = parseUserAgent(
      device.userAgent || ""
    );
    const geo = extractGeoData(req);

    // 1. Upsert visitor
    const visitor = await prisma.visitor.upsert({
      where: { fingerprint },
      create: {
        fingerprint,
        userAgent: device.userAgent,
        browser,
        os,
        device: deviceType,
        screenWidth: device.screenWidth,
        screenHeight: device.screenHeight,
        language: device.language,
        timezone: device.timezone,
        // Geo
        country: geo.country,
        region: geo.region,
        city: geo.city,
        ip: geo.ip,
        // Hardware
        colorDepth: device.colorDepth ?? null,
        pixelRatio: device.pixelRatio ?? null,
        deviceMemory: device.deviceMemory ?? null,
        maxTouchPoints: device.maxTouchPoints ?? null,
        platform: device.platform ?? null,
        cpuCores: device.cpuCores ?? null,
        connectionType: device.connectionType ?? null,
        // Advanced fingerprints
        canvasData: device.canvasData || null,
        webglVendor: device.webglVendor || null,
        webglRenderer: device.webglRenderer || null,
        audioData: device.audioData || null,
      },
      update: {
        lastSeenAt: new Date(),
        userAgent: device.userAgent,
        browser,
        os,
        device: deviceType,
        // Geo (update on every request — location can change)
        country: geo.country ?? undefined,
        region: geo.region ?? undefined,
        city: geo.city ?? undefined,
        ip: geo.ip ?? undefined,
        // Hardware
        colorDepth: device.colorDepth ?? undefined,
        pixelRatio: device.pixelRatio ?? undefined,
        deviceMemory: device.deviceMemory ?? undefined,
        maxTouchPoints: device.maxTouchPoints ?? undefined,
        platform: device.platform ?? undefined,
        cpuCores: device.cpuCores ?? undefined,
        connectionType: device.connectionType ?? undefined,
        // Advanced fingerprints
        canvasData: device.canvasData || undefined,
        webglVendor: device.webglVendor || undefined,
        webglRenderer: device.webglRenderer || undefined,
        audioData: device.audioData || undefined,
      },
    });

    // 2. Upsert session
    const firstPageView = events.find((e) => e.type === "pageview");
    const entryPage = firstPageView?.path || events[0]?.path || "/";

    let session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      session = await prisma.session.create({
        data: {
          id: sessionId,
          visitorId: visitor.id,
          entryPage,
          referrer: acquisition.referrer || null,
          utmSource: acquisition.utmSource || null,
          utmMedium: acquisition.utmMedium || null,
          utmCampaign: acquisition.utmCampaign || null,
          utmTerm: acquisition.utmTerm || null,
          utmContent: acquisition.utmContent || null,
        },
      });
    }

    // 3. Process events in transaction
    const pageViews: Array<{
      sessionId: string;
      path: string;
      title: string | null;
      timestamp: Date;
    }> = [];

    const trackingEvents: Prisma.TrackingEventCreateManyInput[] = [];

    const pageUpdates: Array<{
      path: string;
      duration: number;
      scrollDepth: number;
    }> = [];

    for (const evt of events) {
      const ts = new Date(evt.timestamp);
      if (evt.type === "pageview") {
        pageViews.push({
          sessionId: session.id,
          path: evt.path,
          title: evt.title || null,
          timestamp: ts,
        });
      } else if (evt.type === "pageupdate") {
        pageUpdates.push({
          path: evt.path,
          duration: (evt.properties?.duration as number) || 0,
          scrollDepth: (evt.properties?.scrollDepth as number) || 0,
        });
      } else if (evt.type === "event") {
        trackingEvents.push({
          sessionId: session.id,
          name: evt.name,
          category: evt.category,
          path: evt.path,
          properties: (evt.properties as Prisma.InputJsonValue) ?? undefined,
          timestamp: ts,
        });
      }
    }

    await prisma.$transaction(async (tx) => {
      if (pageViews.length > 0) {
        await tx.pageView.createMany({ data: pageViews });
      }

      if (trackingEvents.length > 0) {
        await tx.trackingEvent.createMany({ data: trackingEvents });
      }

      for (const upd of pageUpdates) {
        const existing = await tx.pageView.findFirst({
          where: { sessionId: session!.id, path: upd.path },
          orderBy: { timestamp: "desc" },
        });
        if (existing) {
          await tx.pageView.update({
            where: { id: existing.id },
            data: {
              duration: upd.duration,
              scrollDepth: Math.max(existing.scrollDepth ?? 0, upd.scrollDepth),
            },
          });
        }
      }

      await tx.session.update({
        where: { id: session!.id },
        data: {
          pageCount: { increment: pageViews.length },
          eventCount: { increment: trackingEvents.length },
          endedAt: new Date(),
          duration: Math.round(
            (Date.now() - new Date(session!.startedAt).getTime()) / 1000
          ),
        },
      });
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[GTS] Track error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
