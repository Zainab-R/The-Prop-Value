interface EstimateData {
  propertyType: string;
  propertySize: string;
  sector: string;

  cornerPlot: boolean;
  parkFacing: boolean;
  mainBoulevard: boolean;

  constructionStatus?: string;

  luxuryLevel?: string;
}

const basePrices: Record<string, number> = {
  "2 Marla": 4500000,
  "4 Marla": 7000000,
  "5 Marla": 9500000,
  "8 Marla": 14500000,
  "10 Marla": 18500000,
  "1 Kanal": 33000000,
  "2 Kanal": 62000000,
  "4 Kanal": 120000000,
};

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

export function calculateEstimate(data: EstimateData) {
  let estimate = basePrices[data.propertySize] ?? 10000000;

  estimate *= sectorMultiplier[data.sector] ?? 1;

  switch (data.propertyType) {
    case "Commercial Plot":
      estimate *= 2;
      break;

    case "Shop":
      estimate *= 2.5;
      break;

    case "House":
      estimate *= 3;
      break;
  }

  if (data.cornerPlot) estimate *= 1.07;

  if (data.parkFacing) estimate *= 1.05;

  if (data.mainBoulevard) estimate *= 1.08;

  if (data.constructionStatus === "Ready")
    estimate *= 1.15;

  if (data.luxuryLevel === "Premium")
    estimate *= 1.08;

  if (data.luxuryLevel === "Luxury")
    estimate *= 1.15;

  return {
    estimatedValue: Math.round(estimate),
    estimatedMin: Math.round(estimate * 0.95),
    estimatedMax: Math.round(estimate * 1.05),
    confidence: 92,
  };
}