import {
  sectors,
  isPropertyType,
  getSizesForSectorAndType,
  sectorCVillaTypes,
  villaTypeSizes,
} from "../lib/propertyOptions";

/**
 * Shared pricing source for prisma/seed.ts (full wipe + reseed) and
 * prisma/sync-market-rates.ts (additive-only top-up). Keeping this in
 * one place means the two scripts can never drift on what "correct"
 * pricing looks like.
 */

export const sectorMultiplier: Record<string, number> = {
  A: 1.20,
  B1: 1.15,
  // B2 and J are recently confirmed DHA Multan sectors with no public
  // pricing data yet — placeholder multiplier until an admin enters
  // real rates via the admin panel.
  B2: 1.13,
  C: 1.12,
  D: 1.08,
  E1: 1.15,
  E2: 1.14,
  F: 1.10,
  G: 1.06,
  H: 1.04,
  I: 1.03,
  J: 1.05,
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

// Residential Plot / House sizes are restricted per-sector to match
// real DHA Multan sector availability (see residentialSectorSizes in
// lib/propertyOptions.ts) — not every sector has every size.
// Commercial Plot / Shop remain available in every sector, since DHA
// places a commercial market in each one.
export const baseRates = {
  "Residential Plot": {
    "5 Marla": 9500000,
    "8 Marla": 14500000,
    "10 Marla": 18500000,
    "1 Kanal": 33000000,
    "2 Kanal": 62000000,
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

export interface MarketRateRow {
  propertyType: string;
  sector: string;
  propertySize: string;
  basePrice: number;
  villaType?: string | null;
}

/**
 * Sector C has no plain DHA residential category — its inventory is
 * entirely through four named housing societies. Pricing here is a
 * best-effort placeholder (August 2026 research): only ATC Villas' 5
 * Marla price was independently confirmed (~PKR 1.9 crore, matched
 * against a comparable Sector C villa development). The rest are
 * interpolated from that anchor and clearly need correcting via the
 * admin panel once real rates are known.
 */
export const villaBasePrices: Record<string, Record<string, number>> = {
  "ATC Villas": {
    "5 Marla": 19000000,
  },
  "DHA Villas": {
    "6 Marla": 22000000,
    "9 Marla": 32000000,
    "12 Marla": 44000000,
  },
  "Premium Villas": {
    "6 Marla": 26000000,
    "10 Marla": 40000000,
    "12 Marla": 50000000,
  },
  "Askari Housing Society": {
    "5 Marla": 24000000,
    "8 Marla": 32000000,
    "10 Marla": 40000000,
    "1 Kanal": 68000000,
    "2 Kanal": 125000000,
    // Commercial Plot sizes (Askari is the only one of the four with
    // confirmed commercial inventory).
    "4 Marla": 24000000,
    "8 Marla Commercial": 46000000,
  },
};

/** The complete, correct set of MarketRate rows per the current rules. */
export function computeMarketRates(): MarketRateRow[] {
  const rows: MarketRateRow[] = [];

  for (const propertyType in baseRates) {
    const sizes = baseRates[propertyType as keyof typeof baseRates];

    for (const sector of sectors) {
      const validSizes = isPropertyType(propertyType)
        ? getSizesForSectorAndType(propertyType, sector)
        : Object.keys(sizes);

      for (const size in sizes) {
        if (!validSizes.includes(size)) {
          continue;
        }

        const basePrice = sizes[size as keyof typeof sizes];

        rows.push({
          propertyType,
          propertySize: size,
          sector,
          basePrice: Math.round(basePrice * sectorMultiplier[sector]),
          villaType: null,
        });
      }
    }
  }

  // Sector C housing societies — no sector multiplier applied, since
  // these prices are for the specific named development, not a
  // generic DHA sector rate.
  for (const villaType of sectorCVillaTypes) {
    const sizesByPropertyType = villaTypeSizes[villaType];

    for (const propertyType in sizesByPropertyType) {
      const sizes = sizesByPropertyType[propertyType as keyof typeof sizesByPropertyType] ?? [];

      for (const size of sizes) {
        // Askari's commercial 8 Marla shares a size label with its
        // residential 8 Marla, so it's keyed separately in
        // villaBasePrices to avoid colliding with the residential price.
        const priceKey =
          villaType === "Askari Housing Society" &&
          propertyType === "Commercial Plot" &&
          size === "8 Marla"
            ? "8 Marla Commercial"
            : size;

        const basePrice = villaBasePrices[villaType]?.[priceKey];

        if (basePrice == null) continue;

        rows.push({
          propertyType,
          propertySize: size,
          sector: "C",
          basePrice,
          villaType,
        });
      }
    }
  }

  return rows;
}
