import { prisma } from "@/lib/prisma";
import RecentEstimatesTable from "@/components/admin/RecentEstimatesTable";
import Pagination from "@/components/shared/Pagination";

const PAGE_SIZE = 15;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminEstimatesPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const [totalCount, estimates] = await Promise.all([
    prisma.estimate.count(),
    prisma.estimate.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        sector: true,
        propertyType: true,
        propertySize: true,
        estimatedMax: true,
        createdAt: true,
        user: { select: { name: true, email: true } },
      },
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const formattedEstimates = estimates.map((estimate) => ({
    ...estimate,
    estimatedMax: Number(estimate.estimatedMax),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          All Estimates
        </h1>

        <p className="mt-2 text-slate-500">
          Every property valuation request submitted on the platform.
        </p>
      </div>

      <RecentEstimatesTable
        estimates={formattedEstimates}
        showViewAllLink={false}
        title="Estimates"
        subtitle={`${totalCount} total`}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/admin/estimates"
      />
    </div>
  );
}
