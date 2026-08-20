export default function ChartSkeleton({ height = 320 }: { height?: number }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 h-6 w-40 animate-pulse rounded bg-slate-200" />
      <div
        className="animate-pulse rounded-xl bg-slate-100"
        style={{ height }}
      />
    </div>
  );
}
