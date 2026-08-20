import { PrismaClient } from "@prisma/client";
import { computeMarketRates } from "./marketRateData";

const prisma = new PrismaClient();

function keyOf(row: { propertyType: string; sector: string; propertySize: string; villaType?: string | null }) {
  return `${row.propertyType}|${row.sector}|${row.propertySize}|${row.villaType ?? ""}`;
}

/**
 * Additive-only sync: inserts any MarketRate combination that
 * `computeMarketRates()` says should exist but doesn't yet (e.g. a
 * newly added sector, or a newly modeled housing society). Never
 * deletes or modifies an existing row — safe to run against a
 * database that already has real, manually curated data in it.
 * Run with: npx tsx prisma/sync-market-rates.ts
 */
async function main() {
  const desired = computeMarketRates();

  const existing = await prisma.marketRate.findMany({
    select: { propertyType: true, sector: true, propertySize: true, villaType: true },
  });

  const existingKeys = new Set(existing.map(keyOf));

  const missing = desired.filter((row) => !existingKeys.has(keyOf(row)));

  if (missing.length === 0) {
    console.log("No missing MarketRate rows — nothing to do.");
    return;
  }

  await prisma.marketRate.createMany({ data: missing });

  console.log(`Inserted ${missing.length} missing MarketRate row(s):`);
  for (const row of missing) {
    const label = row.villaType ? `${row.villaType}, Sector ${row.sector}` : `Sector ${row.sector}`;
    console.log(
      `  + ${row.propertyType} / ${row.propertySize} / ${label} → PKR ${row.basePrice.toLocaleString()}`
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
