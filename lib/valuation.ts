import { prisma } from "@/lib/prisma";

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

  // -----------------------------
  // Plot Features
  // -----------------------------
  if (data.cornerPlot) {
    estimate *= 1.07;
  }

  if (data.parkFacing) {
    estimate *= 1.05;
  }

  if (data.mainBoulevard) {
    estimate *= 1.08;
  }

  // -----------------------------
  // Construction Status
  // -----------------------------
  if (
    data.constructionStatus &&
    data.constructionStatus.toLowerCase() === "ready"
  ) {
    estimate *= 1.15;
  }

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

    const totalAmenityValue = amenityRates.reduce(
      (sum, amenity) => sum + Number(amenity.value),
      0
    );

    estimate += totalAmenityValue;
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
  };
}