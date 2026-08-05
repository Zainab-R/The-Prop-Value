import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import DashboardHero from "@/components/dashboard/DashboardHero";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import PropertyTrend from "@/components/dashboard/PropertyTrend";
import MarketOverview from "@/components/dashboard/MarketOverview";
import RecentEstimates from "@/components/dashboard/RecentEstimates";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <DashboardHero
        name={session?.user?.name || "User"}
      />

      {/* Statistics */}
      <StatsCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Analytics */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyTrend />
        </div>

        <MarketOverview />
      </section>

      {/* Recent Estimates */}
      <section>
        <RecentEstimates />
      </section>

      {/* Recent Activity */}
      <section>
        <RecentActivity />
      </section>
    </div>
  );
}