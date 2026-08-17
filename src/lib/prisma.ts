import { PrismaClient } from "@prisma/client";

// Singleton perezoso: evita agotar conexiones en dev (hot reload) y no
// instancia el cliente durante el build de Next (donde no hay DATABASE_URL).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}
