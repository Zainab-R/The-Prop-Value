import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import MarketRatesTable from "../../../components/admin/MarketRatesTable";

type MarketRateRow = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
  villaType: string | null;
};

export const metadata: Metadata = {
  title: "Market Rates | Prop Value",
};

export default async function MarketRatesPage() {
  const marketRates = await prisma.marketRate.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  const normalizedRates: MarketRateRow[] = marketRates.map((rate) => ({
    id: rate.id,
    createdAt: rate.createdAt,
    updatedAt: rate.updatedAt,
    sector: rate.sector,
    propertyType: rate.propertyType,
    propertySize: rate.propertySize,
    basePrice: Number(rate.basePrice),
    villaType: rate.villaType,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Market Rates
        </h1>

        <p className="mt-2 text-slate-500">
          Manage DHA Multan market rates.
        </p>
      </div>

      <MarketRatesTable rates={normalizedRates} />
    </div>
  );
}