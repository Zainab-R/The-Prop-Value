import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EmptyState from "@/components/dashboard/history/EmptyState";
import Link from "next/link";



import HistoryList from "@/components/dashboard/history/HistoryList";

export default async function SearchHistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const estimates = await prisma.estimate.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });


type EstimateType = (typeof estimates)[number];
  const formattedEstimates = estimates.map((estimate: EstimateType) => ({
  id: estimate.id,
  sector: estimate.sector,
  propertyType: estimate.propertyType,
  propertySize: estimate.propertySize,
  estimatedMin: estimate.estimatedMin.toString(),
  estimatedMax: estimate.estimatedMax.toString(),
  createdAt: estimate.createdAt.toISOString(),
}));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
  <h1 className="text-3xl font-bold text-gray-900">
    Search History
  </h1>

  <Link
    href="/dashboard/estimate"
    className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
  >
    + Create New Estimate
  </Link>
</div>
{estimates.length === 0 ? (
  <EmptyState />
) : (
  <HistoryList estimates={formattedEstimates} />
)}
    </div>
  );
}