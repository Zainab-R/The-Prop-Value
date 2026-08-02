import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Remove this check for now until role authentication is completed
  // if (session.user.role !== "ADMIN") {
  //   redirect("/dashboard");
  // }

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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Estimates</h2>
          <p className="text-3xl font-bold">{totalEstimates}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Market Rates</h2>
          <p className="text-3xl font-bold">{totalMarketRates}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Luxury Rates</h2>
          <p className="text-3xl font-bold">{totalLuxuryRates}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Road Rates</h2>
          <p className="text-3xl font-bold">{totalRoadRates}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Amenities</h2>
          <p className="text-3xl font-bold">{totalAmenities}</p>
        </div>
      </div>
    </div>
  );
}