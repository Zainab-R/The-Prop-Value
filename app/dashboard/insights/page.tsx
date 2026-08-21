
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import MarketContent from "@/components/dashboard/insights/MarketContent";
import FadeInUp from "@/components/shared/FadeInUp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Market Insights | Prop Value",
};

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
    <FadeInUp>
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Market Insights
      </h1>

      <MarketContent rates={formattedRates} />
    </div>
    </FadeInUp>
  );
}