import Link from "next/link";
import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <SearchX className="h-10 w-10 text-orange-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        No Search History
      </h2>

      <p className="mt-2 text-gray-500">
        You haven&apos;t generated any property estimates yet.
      </p>

      <Link
        href="/dashboard/estimate"
        className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Create New Estimate
      </Link>
    </div>
  );
}