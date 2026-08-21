import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DashboardCard from "@/components/admin/DashboardCard";
import { SlidersHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import AdjustmentFactorsTable from "@/components/admin/AdjustmentFactorsTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Adjustment Factors | Prop Value",
};

export default async function AdjustmentFactorsPage() {
  const factors = await prisma.adjustmentFactor.findMany({
    orderBy: { label: "asc" },
  });

  const highestMultiplier =
    factors.length > 0 ? Math.max(...factors.map((f) => f.multiplier)) : 0;

  const lowestMultiplier =
    factors.length > 0 ? Math.min(...factors.map((f) => f.multiplier)) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-primary to-[#1E5AA8] p-8 text-white shadow-lg lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <SlidersHorizontal className="h-8 w-8 text-orange-300" />

            <h1 className="text-3xl font-bold">Adjustment Factors</h1>
          </div>

          <p className="max-w-2xl text-blue-100">
            Multipliers applied for corner plots, park-facing, main
            boulevard, and ready-to-move properties during valuation. These
            correspond to the toggles on the estimate form — the set is
            fixed, but each multiplier is editable here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardCard
          title="Factors Configured"
          value={factors.length}
          icon={SlidersHorizontal}
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

      <AdjustmentFactorsTable factors={factors} />
    </div>
  );
}
