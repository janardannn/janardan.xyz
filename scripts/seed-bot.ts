import dotenv from "dotenv";
dotenv.config();

import { getPrisma } from "../src/lib/db";

async function seedBot() {
  const prisma = await getPrisma();

  // Create a fake bot visitor
  const botVisitor = await prisma.visitor.create({
    data: {
      fingerprint: "bot_test_fingerprint_001",
      isBot: true,
      userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      browser: "Googlebot",
      os: "Linux",
      device: "desktop",
      screenWidth: 1024,
      screenHeight: 768,
      language: "en-US",
      timezone: "America/New_York",
      country: "US",
      region: "CA",
      city: "Mountain View",
      ip: "66.249.66.1",
      colorDepth: 24,
      pixelRatio: 1,
      deviceMemory: null,
      maxTouchPoints: 0,
      platform: "Linux x86_64",
      cpuCores: 8,
      connectionType: "4g",
    },
  });

  console.log("Created bot visitor:", botVisitor.id);

  // Create a session for the bot
  const session = await prisma.session.create({
    data: {
      id: "bot_session_001",
      visitorId: botVisitor.id,
      entryPage: "/",
      referrer: "https://google.com",
      pageCount: 3,
      eventCount: 2,
      duration: 45,
    },
  });

  console.log("Created bot session:", session.id);

  // Create page views
  await prisma.pageView.createMany({
    data: [
      {
        sessionId: session.id,
        path: "/",
        title: "Janardan Hazarika — Software Engineer",
        duration: 15,
        scrollDepth: 25,
      },
      {
        sessionId: session.id,
        path: "/writing",
        title: "Writing",
        duration: 20,
        scrollDepth: 50,
      },
      {
        sessionId: session.id,
        path: "/projects",
        title: "Projects",
        duration: 10,
        scrollDepth: 10,
      },
    ],
  });

  console.log("Created bot page views");

  // Create events
  await prisma.trackingEvent.createMany({
    data: [
      {
        sessionId: session.id,
        name: "page_view",
        category: "navigation",
        path: "/",
      },
      {
        sessionId: session.id,
        name: "page_view",
        category: "navigation",
        path: "/writing",
      },
    ],
  });

  console.log("Created bot events");
  console.log("\nDone! Bot entry seeded successfully.");
}

seedBot().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
