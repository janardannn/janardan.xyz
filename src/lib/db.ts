import type { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export async function getPrisma(): Promise<PrismaClient> {
  if (!globalForPrisma.prisma) {
    const mod = await import("@/generated/prisma/client");
    const Ctor = mod.PrismaClient as unknown as new (opts: { datasourceUrl: string }) => PrismaClient;
    globalForPrisma.prisma = new Ctor({
      datasourceUrl: process.env.DATABASE_URL!,
    });
  }
  return globalForPrisma.prisma;
}
