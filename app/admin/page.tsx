import { prisma } from "@/lib/prisma";
import DashboardCard from "@/components/admin/DashboardCard";

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalEstimates,
    totalMarketRates,
    totalLuxuryRates,
    totalRoadRates,
    totalAmenities,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.estimate.count(),
    prisma.marketRate.count(),
    prisma.luxuryRate.count(),
    prisma.roadRate.count(),
    prisma.amenityRate.count(),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#123A6D] mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DashboardCard title="Users" value={totalUsers} />
        <DashboardCard title="Estimates" value={totalEstimates} />
        <DashboardCard title="Market Rates" value={totalMarketRates} />
        <DashboardCard title="Luxury Rates" value={totalLuxuryRates} />
        <DashboardCard title="Road Rates" value={totalRoadRates} />
        <DashboardCard title="Amenities" value={totalAmenities} />
      </div>
    </div>
  );
}