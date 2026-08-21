import { prisma } from "@/lib/prisma";

/**
 * A single line of the valuation breakdown, snapshotted at estimate
 * creation time and stored on Estimate.breakdown — so the result page
 * and any generated report keep reflecting what was actually applied,
 * even if an admin later edits a rate/multiplier.
 */
export interface ValuationBreakdownEntry {
  label: string;
  type: "base" | "multiplier" | "flat";
  /** For type "multiplier": the signed percentage, e.g. 7 for +7%. */
  percent?: number;
  /** For type "base" or "flat": the PKR amount. */
  amount?: number;
}

export interface EstimateData {
  propertyType: string;
  propertySize: string;
  sector: string;

  // Only meaningful when sector === "C" — see lib/propertyOptions.ts.
  villaType?: string;

  cornerPlot: boolean;
  parkFacing: boolean;
  mainBoulevard: boolean;

  constructionStatus?: string;

  luxuryLevel?: string;

  roadType?: string;

  amenities?: string[];
}

export async function calculateEstimate(data: EstimateData) {
  // -----------------------------
  // Fetch Base Market Price
  // -----------------------------
  const marketRate = await prisma.marketRate.findFirst({
    where: {
      propertyType: data.propertyType,
      propertySize: data.propertySize,
      sector: data.sector,
      villaType: data.villaType || null,
    },
  });

  if (!marketRate) {
    throw new Error(
      data.villaType
        ? `Market rate not found for ${data.propertyType} (${data.propertySize}) in ${data.villaType}, Sector ${data.sector}`
        : `Market rate not found for ${data.propertyType} (${data.propertySize}) in Sector ${data.sector}`
    );
  }

  let estimate = Number(marketRate.basePrice);

  const breakdown: ValuationBreakdownEntry[] = [
    {
      label: "Base Market Rate",
      type: "base",
      amount: Number(marketRate.basePrice),
    },
  ];

  // -----------------------------
  // Plot Features & Construction Status
  // -----------------------------
  // Multipliers live in AdjustmentFactor (admin-editable) rather than
  // as literals here, so pricing can be tuned without a code change.
  const adjustmentFactors = await prisma.adjustmentFactor.findMany();
  const factorMultiplier = new Map<string, number>(
    adjustmentFactors.map((factor) => [factor.key, factor.multiplier])
  );
  const factorLabel = new Map<string, string>(
    adjustmentFactors.map((factor) => [factor.key, factor.label])
  );

  function applyFactor(key: string, active: boolean) {
    if (!active) return;

    const multiplier = factorMultiplier.get(key);
    if (multiplier === undefined) return;

    estimate *= multiplier;
    breakdown.push({
      label: factorLabel.get(key) ?? key,
      type: "multiplier",
      percent: Math.round((multiplier - 1) * 100),
    });
  }

  applyFactor("cornerPlot", data.cornerPlot);
  applyFactor("parkFacing", data.parkFacing);
  applyFactor("mainBoulevard", data.mainBoulevard);
  applyFactor(
    "readyToMove",
    Boolean(data.constructionStatus?.toLowerCase() === "ready")
  );

  // -----------------------------
  // Luxury Multiplier
  // -----------------------------
  if (data.luxuryLevel) {
    const luxury = await prisma.luxuryRate.findUnique({
      where: {
        level: data.luxuryLevel,
      },
    });

    if (luxury) {
      estimate *= luxury.multiplier;
      breakdown.push({
        label: `${data.luxuryLevel} Finish`,
        type: "multiplier",
        percent: Math.round((luxury.multiplier - 1) * 100),
      });
    }
  }

  // -----------------------------
  // Road Multiplier
  // -----------------------------
  if (data.roadType) {
    const road = await prisma.roadRate.findUnique({
      where: {
        roadType: data.roadType,
      },
    });

    if (road) {
      estimate *= road.multiplier;
      breakdown.push({
        label: `${data.roadType} Road`,
        type: "multiplier",
        percent: Math.round((road.multiplier - 1) * 100),
      });
    }
  }

  // -----------------------------
  // Amenities
  // -----------------------------
  if (data.amenities && data.amenities.length > 0) {
    const amenityRates = await prisma.amenityRate.findMany({
      where: {
        name: {
          in: data.amenities,
        },
      },
    });

    for (const amenity of amenityRates) {
      const value = Number(amenity.value);
      estimate += value;
      breakdown.push({
        label: amenity.name,
        type: "flat",
        amount: value,
      });
    }
  }

  // -----------------------------
  // Final Results
  // -----------------------------
  const estimatedValue = Math.round(estimate);

  const estimatedMin = Math.round(estimatedValue * 0.95);

  const estimatedMax = Math.round(estimatedValue * 1.05);

  return {
    basePrice: Number(marketRate.basePrice),

    estimatedValue,

    estimatedMin,

    estimatedMax,

    confidence: 95,

    breakdown,
  };
}