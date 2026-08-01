import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import PropertyTrend from "@/components/dashboard/PropertyTrend";
import MarketOverview from "@/components/dashboard/MarketOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardHero from "@/components/dashboard/DashboardHero";
import RecentEstimates from "@/components/dashboard/RecentEstimates";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8">
      {/* Welcome */}
    <DashboardHero />

      {/* Statistics */}
      <StatsCards />

      {/* Quick Actions */}
    <QuickActions />

      {/* Dashboard Analytics */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyTrend />
        </div>

        <MarketOverview />
      </section>

      {/* Recent Estimates */}
<div className="mt-8">
  <RecentEstimates />
</div>

{/* Recent Activity */}
<div className="mt-8">
  <RecentActivity />
</div>
    </div>
    


    
  );
}