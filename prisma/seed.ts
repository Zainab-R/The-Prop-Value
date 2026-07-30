import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Remove previous data
  await prisma.marketRate.deleteMany();
  await prisma.luxuryRate.deleteMany();
  await prisma.roadRate.deleteMany();
  await prisma.amenityRate.deleteMany();

  // ---------------- Market Rates ----------------

const sectors = [
  "A",
  "B1",
  "C",
  "D",
  "E1",
  "E2",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W1",
  "W2",
  "X",
  "Y",
];

const sectorMultiplier: Record<string, number> = {
  A: 1.20,
  B1: 1.15,
  C: 1.12,
  D: 1.08,
  E1: 1.15,
  E2: 1.14,
  F: 1.10,
  G: 1.06,
  H: 1.04,
  I: 1.03,
  K: 1.08,
  L: 1.02,
  M: 1.01,
  N: 1.00,
  O: 0.98,
  P: 0.97,
  Q: 0.96,
  R: 0.95,
  S: 0.94,
  T: 0.93,
  U: 0.92,
  V: 0.91,
  W1: 0.90,
  W2: 0.89,
  X: 0.88,
  Y: 0.87,
};

const baseRates = {
  "Residential Plot": {
    "2 Marla": 4500000,
    "4 Marla": 7000000,
    "5 Marla": 9500000,
    "8 Marla": 14500000,
    "10 Marla": 18500000,
    "1 Kanal": 33000000,
    "2 Kanal": 62000000,
    "4 Kanal": 120000000,
  },

  "Commercial Plot": {
    "2 Marla": 15000000,
    "4 Marla": 26000000,
    "5 Marla": 32000000,
    "8 Marla": 50000000,
  },

  House: {
    "5 Marla": 25000000,
    "10 Marla": 42000000,
    "1 Kanal": 70000000,
    "2 Kanal": 130000000,
  },

  Shop: {
    "2 Marla": 12000000,
    "4 Marla": 20000000,
    "5 Marla": 26000000,
  },
};

const marketRates = [];

for (const propertyType in baseRates) {
  const sizes = baseRates[propertyType as keyof typeof baseRates];

  for (const size in sizes) {
    const basePrice = sizes[size as keyof typeof sizes];

    for (const sector of sectors) {
      marketRates.push({
        propertyType,
        propertySize: size,
        sector,
        basePrice: Math.round(basePrice * sectorMultiplier[sector]),
      });
    }
  }
}

await prisma.marketRate.createMany({
  data: marketRates,
});

  // ---------------- Luxury ----------------

  await prisma.luxuryRate.createMany({
    data: [
      {
        level: "Basic",
        multiplier: 1,
      },
      {
        level: "Medium",
        multiplier: 1.08,
      },
      {
        level: "Luxury",
        multiplier: 1.15,
      },
      {
        level: "Ultra Luxury",
        multiplier: 1.30,
      },
    ],
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

  await prisma.amenityRate.createMany({
    data: [
      {
        name: "Park",
        value: 100000,
      },
      {
        name: "Mosque",
        value: 75000,
      },
      {
        name: "School",
        value: 150000,
      },
      {
        name: "Commercial Area",
        value: 250000,
      },
    ],
  });

  console.log("Database Seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });