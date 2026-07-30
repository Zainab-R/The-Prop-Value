
import { prisma } from "@/lib/prisma";
import MarketOverview from "@/components/dashboard/insights/MarketOverview";
import MarketTable from "@/components/dashboard/insights/MarketTable";
import SectorTrends from "@/components/dashboard/insights/SectorTrends";
import TopSectors from "@/components/dashboard/insights/TopSectors";

import MarketContent from "@/components/dashboard/insights/MarketContent";



export default async function MarketInsightsPage() {
  const rates = await prisma.marketRate.findMany({
    orderBy: {
      sector: "asc",
    },
  });

 const formattedRates = (rates as typeof rates).map(
  (rate: (typeof rates)[number]) => ({
    id: rate.id,
    sector: rate.sector,
    propertyType: rate.propertyType,
    propertySize: rate.propertySize,
    basePrice: Number(rate.basePrice),
  })
);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Market Insights
      </h1>

      <MarketOverview rates={formattedRates} />

      <MarketTable rates={formattedRates} />
      <SectorTrends rates={formattedRates} />
      <TopSectors rates={formattedRates} />
      <MarketContent rates={formattedRates} />
    </div>
  );
}