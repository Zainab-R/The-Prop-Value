import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";
import UsersToolbar from "@/components/admin/UsersToolbar";
import Pagination from "@/components/shared/Pagination";

const PAGE_SIZE = 15;

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export const metadata: Metadata = {
  title: "Manage Users | Prop Value",
};

export default async function UsersPage({ searchParams }: PageProps) {
  const { q, page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const [totalCount, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Users Management
        </h1>

        <p className="mt-2 text-slate-500">
          View and manage registered users.
        </p>
      </div>

      <UsersToolbar />

      <UsersTable users={users} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/admin/users"
        searchParams={{ q }}
      />
    </div>
  );
}
