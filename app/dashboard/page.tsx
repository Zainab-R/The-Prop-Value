import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import DashboardHero from "@/components/dashboard/DashboardHero";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import MarketOverview from "@/components/dashboard/MarketOverview";
import RecentEstimates from "@/components/dashboard/RecentEstimates";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ChartSkeleton from "@/components/shared/ChartSkeleton";
import FadeInUp from "@/components/shared/FadeInUp";

// recharts is heavy — keep it out of the initial dashboard bundle.
const PropertyTrend = dynamic(() => import("@/components/dashboard/PropertyTrend"), {
  loading: () => <ChartSkeleton height={320} />,
});

export const metadata: Metadata = {
  title: "Dashboard | Prop Value",
  description: "Your DHA Multan property valuation dashboard.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    redirect("/login");
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    totalCount,
    thisMonthCount,
    valueAgg,
    sectorGroups,
    recentEstimates,
    monthlyRows,
    marketAgg,
    marketSectorGroups,
  ] = await Promise.all([
    prisma.estimate.count({ where: { userId: user.id } }),
    prisma.estimate.count({
      where: { userId: user.id, createdAt: { gte: startOfMonth } },
    }),
    prisma.estimate.aggregate({
      where: { userId: user.id },
      _avg: { estimatedMin: true, estimatedMax: true },
    }),
    prisma.estimate.groupBy({ by: ["sector"], where: { userId: user.id } }),
    prisma.estimate.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        sector: true,
        propertyType: true,
        propertySize: true,
        estimatedMin: true,
        estimatedMax: true,
        createdAt: true,
      },
    }),
    prisma.$queryRaw<{ month: Date; avgValue: number }[]>`
      SELECT date_trunc('month', "createdAt") AS month,
             AVG(("estimatedMin" + "estimatedMax") / 2) AS "avgValue"
      FROM "Estimate"
      WHERE "userId" = ${user.id}
      GROUP BY 1
      ORDER BY 1 ASC
      LIMIT 6
    `,
    prisma.marketRate.aggregate({ _avg: { basePrice: true } }),
    prisma.marketRate.groupBy({ by: ["sector"] }),
  ]);

  const avgEstimatedValue =
    (Number(valueAgg._avg.estimatedMin ?? 0) +
      Number(valueAgg._avg.estimatedMax ?? 0)) /
    2;

  const stats = {
    totalEstimates: totalCount,
    estimatesThisMonth: thisMonthCount,
    averageValue: avgEstimatedValue,
    sectorsExplored: sectorGroups.length,
  };

  const formattedRecent = recentEstimates.map((e) => ({
    id: e.id,
    sector: e.sector,
    propertyType: e.propertyType,
    propertySize: e.propertySize,
    estimatedMin: Number(e.estimatedMin),
    estimatedMax: Number(e.estimatedMax),
    createdAt: e.createdAt.toISOString(),
  }));

  const trendData = monthlyRows.map((row) => ({
    month: row.month.toLocaleString("default", { month: "short" }),
    value: Math.round(Number(row.avgValue)),
  }));

  const marketSnapshot = {
    averageBasePrice: Number(marketAgg._avg.basePrice ?? 0),
    sectorsCovered: marketSectorGroups.length,
  };

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <FadeInUp>
        <DashboardHero
          name={session?.user?.name || "User"}
        />
      </FadeInUp>

      {/* Statistics */}
      <FadeInUp delay={0.05}>
        <StatsCards stats={stats} />
      </FadeInUp>

      {/* Quick Actions */}
      <FadeInUp delay={0.1}>
        <QuickActions />
      </FadeInUp>

      {/* Analytics */}
      <FadeInUp delay={0.15}>
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertyTrend data={trendData} />
          </div>

          <MarketOverview snapshot={marketSnapshot} />
        </section>
      </FadeInUp>

      {/* Recent Estimates */}
      <FadeInUp delay={0.2}>
        <section>
          <RecentEstimates estimates={formattedRecent} />
        </section>
      </FadeInUp>

      {/* Recent Activity */}
      <FadeInUp delay={0.25}>
        <section>
          <RecentActivity estimates={formattedRecent} />
        </section>
      </FadeInUp>
    </div>
  );
}
