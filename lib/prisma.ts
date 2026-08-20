import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Logging every query's full SQL text adds real overhead once a
    // page fires more than a couple of queries (several pages here run
    // 8-12 in parallel) — keep it to warnings/errors only.
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}