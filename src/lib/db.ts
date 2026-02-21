import type { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export async function getPrisma(): Promise<PrismaClient> {
  if (!globalForPrisma.prisma) {
    const { PrismaNeon } = await import("@prisma/adapter-neon");
    const { PrismaClient } = await import("@/generated/prisma/client");

    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

    globalForPrisma.prisma = new (PrismaClient as unknown as new (opts: { adapter: typeof adapter }) => PrismaClient)({ adapter });
  }
  return globalForPrisma.prisma;
}
