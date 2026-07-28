import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickActions";
import PropertyChart from "@/components/dashboard/PropertyChart";
import MarketOverview from "@/components/dashboard/MarketOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#102A43]">
          Welcome back,
          <span className="text-orange-500">
            {" "}
            {session?.user?.name || "User"}
          </span>
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your property valuations, compare estimates, and explore
          market insights from your dashboard.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Estimates"
          value="0"
          description="Properties valued"
        />

        <StatCard
          title="Saved Estimates"
          value="0"
          description="Saved for later"
        />

        <StatCard
          title="Average Value"
          value="PKR 0"
          description="Across estimates"
        />

        <StatCard
          title="Last Activity"
          value="Today"
          description="Most recent action"
        />
      </section>

      {/* Quick Actions */}
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-[#102A43]">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <QuickAction
            title="New Estimate"
            description="Estimate a property's value."
            href="/dashboard/estimate"
          />

          <QuickAction
            title="Compare Properties"
            description="Compare market values."
            href="/dashboard/compare"
          />

          <QuickAction
            title="View History"
            description="Review previous estimates."
            href="/dashboard/history"
          />
        </div>
      </section>

      {/* Dashboard Analytics */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyChart />
        </div>

        <MarketOverview />
      </section>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}