import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Base path, e.g. "/dashboard/history" */
  basePath: string;
  /** Existing query params to preserve across page links (excluding "page"). */
  searchParams?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function hrefFor(page: number) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, value);
    }

    params.set("page", String(page));

    return `${basePath}?${params.toString()}`;
  }

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-slate-200 px-2 py-4"
    >
      <p className="text-sm text-slate-500">
        Page <span className="font-medium text-slate-700">{currentPage}</span>{" "}
        of <span className="font-medium text-slate-700">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        {prevDisabled ? (
          <span className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400">
            <ChevronLeft size={16} />
            Previous
          </span>
        ) : (
          <Link
            href={hrefFor(currentPage - 1)}
            className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
            Previous
          </Link>
        )}

        {nextDisabled ? (
          <span className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400">
            Next
            <ChevronRight size={16} />
          </span>
        ) : (
          <Link
            href={hrefFor(currentPage + 1)}
            className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
          >
            Next
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </nav>
  );
}
