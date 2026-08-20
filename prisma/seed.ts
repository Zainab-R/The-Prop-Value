import { PrismaClient } from "@prisma/client";
import { luxuryLevels, amenitiesList } from "../lib/propertyOptions";
import { computeMarketRates } from "./marketRateData";

const prisma = new PrismaClient();

async function main() {
  // Remove previous data
  await prisma.marketRate.deleteMany();
  await prisma.luxuryRate.deleteMany();
  await prisma.roadRate.deleteMany();
  await prisma.amenityRate.deleteMany();

  // ---------------- Market Rates ----------------

  await prisma.marketRate.createMany({
    data: computeMarketRates(),
  });

  // ---------------- Luxury ----------------
  // Levels come from lib/propertyOptions.ts (the same list the estimate
  // form offers) so a level can never be selectable without a priced row.

  const luxuryMultipliers: Record<string, number> = {
    Basic: 1,
    Medium: 1.08,
    Luxury: 1.15,
    "Ultra Luxury": 1.3,
  };

  await prisma.luxuryRate.createMany({
    data: luxuryLevels.map((level) => ({
      level,
      multiplier: luxuryMultipliers[level],
    })),
  });

  // ---------------- Road ----------------

  await prisma.roadRate.createMany({
    data: [
      {
        roadType: "40 ft",
        multiplier: 1,
      },
      {
        roadType: "60 ft",
        multiplier: 1.05,
      },
      {
        roadType: "80 ft",
        multiplier: 1.10,
      },
      {
        roadType: "100 ft",
        multiplier: 1.18,
      },
    ],
  });

  // ---------------- Amenities ----------------
  // Names come from lib/propertyOptions.ts (the same list the estimate
  // form offers) so a selected amenity can never fail to apply a value.

  const amenityValues: Record<string, number> = {
    Park: 100000,
    Mosque: 75000,
    School: 150000,
    "Commercial Area": 250000,
  };

  await prisma.amenityRate.createMany({
    data: amenitiesList.map((name) => ({
      name,
      value: amenityValues[name],
    })),
  });

  console.log("Database Seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
