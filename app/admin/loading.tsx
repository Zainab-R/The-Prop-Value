export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>

      <div className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
    </div>
  );
}
