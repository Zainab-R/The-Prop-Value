import Link from "next/link";
import { SearchX, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

export default function EmptyState({
  icon: Icon = SearchX,
  title = "No Search History",
  description = "You haven't generated any property estimates yet.",
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <Icon className="h-10 w-10 text-orange-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
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