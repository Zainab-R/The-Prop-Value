import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import DashboardCard from "@/components/admin/DashboardCard";
import RecentEstimatesTable from "@/components/admin/RecentEstimatesTable";
import ChartSkeleton from "@/components/shared/ChartSkeleton";
import FadeInUp from "@/components/shared/FadeInUp";

import Link from "next/link";

// Chart libraries are heavy — load them in their own chunk instead of
// bundling recharts into every admin page's initial JS.
const EstimatesChart = dynamic(() => import("@/components/admin/charts/EstimatesChart"), {
  loading: () => <ChartSkeleton />,
});
const PropertyTypeChart = dynamic(() => import("@/components/admin/charts/PropertyTypeChart"), {
  loading: () => <ChartSkeleton />,
});
const SectorChart = dynamic(() => import("@/components/admin/charts/SectorChart"), {
  loading: () => <ChartSkeleton />,
});

import {
  Users,
  Calculator,
  Building2,
  Gem,
  Map,
  Trees,
  ArrowRight,
  TrendingUp,
  Activity,
  UserPlus,
} from "lucide-react";

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalEstimates,
    totalMarketRates,
    totalLuxuryRates,
    totalRoadRates,
    totalAmenities,

    recentUsers,

    propertyTypeData,

    sectorData,

    monthlyRows,

    recentEstimates,

    topSector,

    latestUser,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.estimate.count(),

    prisma.marketRate.count(),

    prisma.luxuryRate.count(),

    prisma.roadRate.count(),

    prisma.amenityRate.count(),

    prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.estimate.groupBy({
      by: ["propertyType"],
      _count: {
        propertyType: true,
      },
    }),

    prisma.estimate.groupBy({
      by: ["sector"],
      _count: {
        sector: true,
      },
      orderBy: {
        _count: {
          sector: "desc",
        },
      },
      take: 5,
    }),

    prisma.$queryRaw<{ month: Date; count: bigint }[]>`
      SELECT date_trunc('month', "createdAt") AS month, COUNT(*)::bigint AS count
      FROM "Estimate"
      GROUP BY 1
      ORDER BY 1 DESC
      LIMIT 12
    `,

    prisma.estimate.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        sector: true,
        propertyType: true,
        propertySize: true,
        estimatedMax: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),

    prisma.estimate.groupBy({
      by: ["sector"],
      _count: {
        sector: true,
      },
      orderBy: {
        _count: {
          sector: "desc",
        },
      },
      take: 1,
    }),

    prisma.user.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const monthlyData = [...monthlyRows]
    .sort((a, b) => a.month.getTime() - b.month.getTime())
    .map((row) => ({
      month: row.month.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
      estimates: Number(row.count),
    }));

  const formattedRecentEstimates = recentEstimates.map((estimate) => ({
    ...estimate,
    estimatedMax: Number(estimate.estimatedMax),
  }));

      return (
    <div>

      {/* Header */}

      <FadeInUp>
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
        <h1 className="text-4xl font-bold text-primary">
        Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
        Welcome back! Here&apos;s an overview of your platform.
        </p>
        </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 px-6 py-4">
          <p className="text-sm text-slate-500">
            Total Platform Records
          </p>

          <h2 className="mt-1 text-3xl font-bold text-orange-500">
            {totalUsers +
              totalEstimates +
              totalMarketRates +
              totalLuxuryRates +
              totalRoadRates +
              totalAmenities}
          </h2>
        </div>

      </div>
      </FadeInUp>

      {/* Statistics Cards */}

      <FadeInUp delay={0.05}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        <DashboardCard
          title="Users"
          value={totalUsers}
          icon={Users}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Estimates"
          value={totalEstimates}
          icon={Calculator}
          color="bg-orange-500"
        />

        <DashboardCard
          title="Market Rates"
          value={totalMarketRates}
          icon={Building2}
          color="bg-emerald-500"
        />

        <DashboardCard
          title="Luxury Rates"
          value={totalLuxuryRates}
          icon={Gem}
          color="bg-purple-500"
        />

        <DashboardCard
          title="Road Rates"
          value={totalRoadRates}
          icon={Map}
          color="bg-cyan-500"
        />

        <DashboardCard
          title="Amenities"
          value={totalAmenities}
          icon={Trees}
          color="bg-green-600"
        />

      </div>
      </FadeInUp>

      {/* Quick Actions */}

      <FadeInUp delay={0.1}>
      <div className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-primary">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Link
            href="/admin/market-rates"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
          >
            <Building2 className="mb-4 h-10 w-10 text-emerald-600" />

            <h3 className="text-lg font-semibold">
              Market Rates
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add, edit or remove market rates.
            </p>

            <div className="mt-5 flex items-center font-semibold text-primary">
              Manage
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
          >
            <Users className="mb-4 h-10 w-10 text-blue-600" />

            <h3 className="text-lg font-semibold">
              Users
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View and manage registered users.
            </p>

            <div className="mt-5 flex items-center font-semibold text-primary">
              Open
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/admin/luxury-rates"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
          >
            <Gem className="mb-4 h-10 w-10 text-purple-600" />

            <h3 className="text-lg font-semibold">
              Luxury Rates
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Configure luxury multipliers.
            </p>

            <div className="mt-5 flex items-center font-semibold text-primary">
              Manage
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/admin/amenities"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
          >
            <Trees className="mb-4 h-10 w-10 text-green-600" />

            <h3 className="text-lg font-semibold">
              Amenities
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Update amenity values.
            </p>

            <div className="mt-5 flex items-center font-semibold text-primary">
              Open
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

        </div>

      </div>
      </FadeInUp>

            {/* Analytics */}

      <FadeInUp delay={0.15}>
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Analytics
        </h2>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <PropertyTypeChart
            data={propertyTypeData}
          />

          <SectorChart
            data={sectorData}
          />

          <div className="xl:col-span-2">
            <EstimatesChart
              data={monthlyData}
            />
          </div>

        </div>
      </div>
      </FadeInUp>

      {/* Platform Overview */}

      <FadeInUp delay={0.2}>
      <div className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-primary">
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Top Sector */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center gap-3">
              <TrendingUp className="h-10 w-10 rounded-xl bg-orange-100 p-2 text-orange-500" />

              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Most Popular Sector
                </h3>

                <p className="text-sm text-slate-500">
                  Highest estimate activity
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-orange-500">
              {topSector.length > 0 ? topSector[0].sector : "-"}
            </h2>

            <p className="mt-2 text-slate-500">
              {topSector.length > 0
                ? `${topSector[0]._count.sector} estimates recorded`
                : "No estimate data available"}
            </p>

          </div>

          {/* Latest User */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center gap-3">
              <UserPlus className="h-10 w-10 rounded-xl bg-blue-100 p-2 text-blue-600" />

              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Latest Registration
                </h3>

                <p className="text-sm text-slate-500">
                  Most recent account
                </p>
              </div>
            </div>

            <h2 className="truncate text-xl font-bold text-primary">
              {latestUser?.name || "Unnamed User"}
            </h2>

            <p className="mt-2 truncate text-slate-500">
              {latestUser?.email}
            </p>

            <p className="mt-3 text-sm text-slate-400">
              {latestUser
                ? new Date(latestUser.createdAt).toLocaleDateString()
                : "No users"}
            </p>

          </div>

          {/* Platform Status */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center gap-3">
              <Activity className="h-10 w-10 rounded-xl bg-green-100 p-2 text-green-600" />

              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Platform Status
                </h3>

                <p className="text-sm text-slate-500">
                  Overall system health
                </p>
              </div>
            </div>

            <div className="inline-flex rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
              Operational
            </div>

            <p className="mt-4 text-slate-500">
              All dashboard services are running normally.
            </p>

          </div>

        </div>

      </div>
      </FadeInUp>

            {/* Recent Activity */}

      <FadeInUp delay={0.25}>
      <div className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-primary">
          Recent Activity
        </h2>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Recent Users */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-xl font-bold text-primary">
                Recent Users
              </h3>

              <Users className="h-5 w-5 text-blue-600" />

            </div>

            <div className="space-y-4">

              {recentUsers.map((user) => (

                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >

                  <div>

                    <p className="font-semibold">
                      {user.name || "Unnamed User"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {user.email}
                    </p>

                  </div>

                  <span className="text-xs text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Estimates Table */}

          <div className="xl:col-span-2">

            <RecentEstimatesTable
              estimates={formattedRecentEstimates}
            />

          </div>

        </div>

      </div>
      </FadeInUp>

    </div>
  );
}

