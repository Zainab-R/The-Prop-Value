import TableSkeleton from "@/components/shared/TableSkeleton";

export default function MarketRatesLoading() {
  return (
    <div className="space-y-8">
      <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>

      <TableSkeleton rows={8} />
    </div>
  );
}
