import { prisma } from "@/lib/prisma";
import DashboardCard from "@/components/admin/DashboardCard";
import SearchBar from "@/components/admin/SearchBar";
import LuxuryRatesTable from "@/components/admin/LuxuryRatesTable";
import { Gem, Plus, TrendingUp, TrendingDown } from "lucide-react";
import LuxuryRatesClient from "@/components/admin/LuxuryRatesClient";
export default async function LuxuryRatesPage() {
  const [totalLuxuryRates, luxuryRates] = await Promise.all([
    prisma.luxuryRate.count(),
    prisma.luxuryRate.findMany({
      orderBy: {
        level: "asc",
      },
    }),
  ]);

  const highestMultiplier =
    luxuryRates.length > 0
      ? Math.max(...luxuryRates.map((rate) => rate.multiplier))
      : 0;

  const lowestMultiplier =
    luxuryRates.length > 0
      ? Math.min(...luxuryRates.map((rate) => rate.multiplier))
      : 0;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#123A6D] to-[#1E5AA8] p-8 text-white shadow-lg lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <Gem className="h-8 w-8 text-yellow-300" />

            <h1 className="text-3xl font-bold">
              Luxury Rates
            </h1>
          </div>

          <p className="max-w-2xl text-blue-100">
            Configure luxury level multipliers used during property valuation.
          </p>

          <div className="mt-5 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            {totalLuxuryRates} Luxury Levels Configured
          </div>
        </div>

        
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardCard
          title="Luxury Levels"
          value={totalLuxuryRates}
          icon={Gem}
        />

        <DashboardCard
          title="Highest Multiplier"
          value={`${highestMultiplier.toFixed(2)}×`}
          icon={TrendingUp}
        />

        <DashboardCard
          title="Lowest Multiplier"
          value={`${lowestMultiplier.toFixed(2)}×`}
          icon={TrendingDown}
        />
      </div>

      <LuxuryRatesClient
  rates={luxuryRates}
/>
    </div>
  );
}