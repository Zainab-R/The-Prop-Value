import { prisma } from "@/lib/prisma";
import DashboardCard from "@/components/admin/DashboardCard";
import RecentEstimatesTable from "@/components/admin/RecentEstimatesTable";

import EstimatesChart from "@/components/admin/charts/EstimatesChart";
import PropertyTypeChart from "@/components/admin/charts/PropertyTypeChart";
import SectorChart from "@/components/admin/charts/SectorChart";

import Link from "next/link";

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

    estimateDates,

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

    prisma.estimate.findMany({
      select: {
        createdAt: true,
      },
    }),

    prisma.estimate.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
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

  const monthlyMap: Record<string, number> = {};

  estimateDates.forEach((estimate) => {
    const month = estimate.createdAt.toLocaleString("default", {
      month: "short",
    });

    monthlyMap[month] = (monthlyMap[month] || 0) + 1;
  });

  const monthlyData = Object.entries(monthlyMap).map(
    ([month, estimates]) => ({
      month,
      estimates,
    })
  );

  const propertySummary = propertyTypeData
    .map((item) => ({
      type: item.propertyType,
      count: item._count.propertyType,
    }))
    .sort((a, b) => b.count - a.count);

      return (
    <div>

      {/* Header */}

      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>
          <h1 className="text-4xl font-bold text-[#123A6D]">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's an overview of your platform.
          </p>
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

      {/* Statistics Cards */}

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

      {/* Quick Actions */}

      <div className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-[#123A6D]">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Link
            href="/admin/market-rates"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Building2 className="mb-4 h-10 w-10 text-emerald-600" />

            <h3 className="text-lg font-semibold">
              Market Rates
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add, edit or remove market rates.
            </p>

            <div className="mt-5 flex items-center font-semibold text-[#123A6D]">
              Manage
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Users className="mb-4 h-10 w-10 text-blue-600" />

            <h3 className="text-lg font-semibold">
              Users
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View and manage registered users.
            </p>

            <div className="mt-5 flex items-center font-semibold text-[#123A6D]">
              Open
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/admin/luxury-rates"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Gem className="mb-4 h-10 w-10 text-purple-600" />

            <h3 className="text-lg font-semibold">
              Luxury Rates
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Configure luxury multipliers.
            </p>

            <div className="mt-5 flex items-center font-semibold text-[#123A6D]">
              Manage
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/admin/amenities"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Trees className="mb-4 h-10 w-10 text-green-600" />

            <h3 className="text-lg font-semibold">
              Amenities
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Update amenity values.
            </p>

            <div className="mt-5 flex items-center font-semibold text-[#123A6D]">
              Open
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

        </div>

      </div>

            {/* Analytics */}

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-[#123A6D]">
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

      {/* Platform Overview */}

      <div className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-[#123A6D]">
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Top Sector */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center gap-3">
              <TrendingUp className="h-10 w-10 rounded-xl bg-orange-100 p-2 text-orange-500" />

              <div>
                <h3 className="text-lg font-semibold text-[#123A6D]">
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
                <h3 className="text-lg font-semibold text-[#123A6D]">
                  Latest Registration
                </h3>

                <p className="text-sm text-slate-500">
                  Most recent account
                </p>
              </div>
            </div>

            <h2 className="truncate text-xl font-bold text-[#123A6D]">
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
                <h3 className="text-lg font-semibold text-[#123A6D]">
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

            {/* Recent Activity */}

      <div className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-[#123A6D]">
          Recent Activity
        </h2>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Recent Users */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-xl font-bold text-[#123A6D]">
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
              estimates={recentEstimates}
            />

          </div>

        </div>

      </div>

      {/* Dashboard Summary */}

      <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#123A6D] to-[#1E5DA8] p-8 text-white shadow-lg">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          <div>
            <p className="text-sm text-blue-100">
              Registered Users
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalUsers}
            </h2>
          </div>

          <div>
            <p className="text-sm text-blue-100">
              Property Estimates
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalEstimates}
            </h2>
          </div>

          <div>
            <p className="text-sm text-blue-100">
              Property Types
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {propertySummary.length}
            </h2>
          </div>

          <div>
            <p className="text-sm text-blue-100">
              Top Sector
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {topSector.length ? topSector[0].sector : "-"}
            </h2>
          </div>

        </div>

        <div className="mt-8 border-t border-white/20 pt-5 text-sm text-blue-100">

          © {new Date().getFullYear()} The Prop Value — Admin Dashboard

        </div>

      </div>

    </div>
  );
}

