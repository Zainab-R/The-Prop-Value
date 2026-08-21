import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EmptyState from "@/components/dashboard/history/EmptyState";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";

import HistoryList from "@/components/dashboard/history/HistoryList";
import FadeInUp from "@/components/shared/FadeInUp";

const PAGE_SIZE = 10;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function SearchHistoryPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const [totalCount, estimates] = await Promise.all([
    prisma.estimate.count({
      where: { user: { email: session.user.email } },
    }),
    prisma.estimate.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        id: true,
        sector: true,
        propertyType: true,
        propertySize: true,
        estimatedMin: true,
        estimatedMax: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

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
    <FadeInUp>
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Search History
        </h1>

        <Link
          href="/dashboard/estimate"
          className="btn-anim rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          + Create New Estimate
        </Link>
      </div>
      {totalCount === 0 ? (
        <EmptyState />
      ) : (
        <>
          <HistoryList estimates={formattedEstimates} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/dashboard/history"
          />
        </>
      )}
    </div>
    </FadeInUp>
  );
}
