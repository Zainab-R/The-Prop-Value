export default function CompareLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-14 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-14 animate-pulse rounded-xl bg-slate-200" />
      </div>

      <div className="h-96 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
    </div>
  );
}
