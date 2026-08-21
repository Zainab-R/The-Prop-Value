interface TableSkeletonProps {
  rows?: number;
  showHeader?: boolean;
}

export default function TableSkeleton({
  rows = 6,
  showHeader = true,
}: TableSkeletonProps) {
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-center justify-between gap-4">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-10 w-40 animate-pulse rounded-xl bg-slate-200" />
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="h-12 animate-pulse bg-slate-100" />

        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse border-t border-slate-100 bg-white"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
