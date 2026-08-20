/**
 * Canonical option lists for property valuation.
 *
 * This is the single source of truth consumed by the estimate form
 * (components/estimate/EstimateForm.tsx), the admin market-rate
 * management UI (components/admin/AddMarketRateModal.tsx,
 * EditMarketRateModal.tsx), and the seed script (prisma/seed.ts).
 * All of them import from here so the options a user can pick can
 * never drift out of sync with what's actually priced in the
 * database again — previously they were three independently
 * hardcoded copies with different sector formats and mismatched
 * sizes, which caused real "Market rate not found" failures.
 */

export const sectors = [
  "A",
  "B1",
  "B2",
  "C",
  "D",
  "E1",
  "E2",
  "F",
  "G",
  "H",
  "I",
  "J",
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
] as const;

export type Sector = (typeof sectors)[number];

export const propertyTypes = [
  "Residential Plot",
  "Commercial Plot",
  "House",
  "Shop",
] as const;

export type PropertyType = (typeof propertyTypes)[number];

export function isPropertyType(value: string): value is PropertyType {
  return (propertyTypes as readonly string[]).includes(value);
}

/**
 * Sizes actually priced for each property type — must stay in sync
 * with the `baseRates` table in prisma/seed.ts. Offering a size here
 * that isn't priced there (or vice versa) reproduces the original bug.
 *
 * For "Residential Plot" and "House", not every size here is available
 * in every sector — see `residentialSectorSizes` below. "Commercial
 * Plot" and "Shop" are treated as available in every sector, since DHA
 * Multan places a commercial market in every sector.
 */
export const propertySizesByType: Record<PropertyType, readonly string[]> = {
  "Residential Plot": ["5 Marla", "8 Marla", "10 Marla", "1 Kanal", "2 Kanal"],
  "Commercial Plot": ["2 Marla", "4 Marla", "5 Marla", "8 Marla"],
  House: ["5 Marla", "10 Marla", "1 Kanal", "2 Kanal"],
  Shop: ["2 Marla", "4 Marla", "5 Marla"],
};

/**
 * Which residential plot sizes actually exist in each DHA Multan
 * sector — sourced from a DHA Multan transfer-fee schedule plus
 * cross-referenced real-estate sources (August 2026 research; not the
 * official DHA Multan site, which doesn't publish a plot/sector
 * matrix). Sector C has no residential category in any source found.
 * "B2" and "J" are recently-added sectors — their multiplier in
 * prisma/seed.ts is a placeholder until real pricing is entered
 * through the admin panel. Applies to "Residential Plot" and "House";
 * intersected with each type's own size list in
 * `getResidentialSizesForSector` (e.g. House never offers 8 Marla,
 * even in Sector V, because it isn't one of House's priced sizes).
 */
export const residentialSectorSizes: Record<string, readonly string[]> = {
  A: ["1 Kanal", "2 Kanal"],
  B1: ["10 Marla"],
  B2: ["1 Kanal"],
  C: [],
  D: ["1 Kanal"],
  E1: ["10 Marla", "1 Kanal"],
  E2: ["5 Marla", "1 Kanal"],
  F: ["1 Kanal"],
  G: ["1 Kanal"],
  H: ["1 Kanal"],
  I: ["1 Kanal"],
  J: ["1 Kanal"],
  K: ["1 Kanal"],
  L: ["1 Kanal"],
  M: ["1 Kanal"],
  N: ["1 Kanal", "2 Kanal"],
  O: ["1 Kanal"],
  P: ["5 Marla"],
  Q: ["1 Kanal"],
  R: ["1 Kanal"],
  S: ["1 Kanal"],
  T: ["5 Marla"],
  U: ["10 Marla"],
  V: ["5 Marla", "8 Marla"],
  W1: ["1 Kanal"],
  W2: ["1 Kanal"],
  X: ["1 Kanal"],
  Y: ["1 Kanal"],
};

const RESIDENTIAL_TYPES = new Set<PropertyType>(["Residential Plot", "House"]);

/** Sizes actually available for `propertyType` in `sector`. */
export function getSizesForSectorAndType(
  propertyType: PropertyType,
  sector: string
): readonly string[] {
  const baseSizes = propertySizesByType[propertyType];

  if (!RESIDENTIAL_TYPES.has(propertyType)) {
    return baseSizes;
  }

  const allowed = residentialSectorSizes[sector] ?? [];
  return baseSizes.filter((size) => allowed.includes(size));
}

/** Sectors that offer at least one size for `propertyType`. */
export function getSectorsForPropertyType(
  propertyType: PropertyType
): readonly string[] {
  if (!RESIDENTIAL_TYPES.has(propertyType)) {
    return sectors;
  }

  return sectors.filter(
    (sector) => getSizesForSectorAndType(propertyType, sector).length > 0
  );
}

export const luxuryLevels = ["Basic", "Medium", "Luxury", "Ultra Luxury"] as const;

export const amenitiesList = ["Park", "Mosque", "School", "Commercial Area"] as const;

/**
 * Sector C has no plain DHA "Residential Plot" — its residential
 * inventory is entirely through four named villa/housing developments
 * (built homes, not bare plots). Sourced from real-estate listings
 * (August 2026 research) — pricing is a best-effort placeholder for
 * three of the four (only ATC Villas' 5 Marla price was independently
 * confirmed); correct via the admin panel once real rates are known.
 */
export const sectorCVillaTypes = [
  "ATC Villas",
  "DHA Villas",
  "Premium Villas",
  "Askari Housing Society",
] as const;

export type VillaType = (typeof sectorCVillaTypes)[number];

export function isVillaType(value: string): value is VillaType {
  return (sectorCVillaTypes as readonly string[]).includes(value);
}

/** Sizes each Sector C housing society offers, per property type. */
export const villaTypeSizes: Record<
  VillaType,
  Partial<Record<PropertyType, readonly string[]>>
> = {
  "ATC Villas": {
    House: ["5 Marla"],
  },
  "DHA Villas": {
    House: ["6 Marla", "9 Marla", "12 Marla"],
  },
  "Premium Villas": {
    House: ["6 Marla", "10 Marla", "12 Marla"],
  },
  "Askari Housing Society": {
    House: ["5 Marla", "8 Marla", "10 Marla", "1 Kanal", "2 Kanal"],
    "Commercial Plot": ["4 Marla", "8 Marla"],
  },
};

/** Sector C housing societies that offer `propertyType` at all. */
export function getVillaTypesForPropertyType(
  propertyType: PropertyType
): readonly VillaType[] {
  return sectorCVillaTypes.filter(
    (villaType) => (villaTypeSizes[villaType][propertyType]?.length ?? 0) > 0
  );
}

/** Sizes a given Sector C housing society offers for `propertyType`. */
export function getSizesForVillaType(
  villaType: string,
  propertyType: PropertyType
): readonly string[] {
  if (!isVillaType(villaType)) {
    return [];
  }

  return villaTypeSizes[villaType][propertyType] ?? [];
}
