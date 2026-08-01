export default function PropertyChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#102A43]">
        Property Value Trend
      </h2>

      <div className="mt-8 flex h-72 items-end justify-between gap-3">
        {[40, 65, 50, 80, 70, 95, 85].map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-xl bg-orange-500 transition hover:opacity-80"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between text-xs text-slate-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
    </div>
  );
}