export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>

      <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
    </div>
  );
}
