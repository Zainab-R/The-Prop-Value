export default function MarketOverview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#102A43]">
        Market Overview
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <div className="flex justify-between text-sm">
            <span>Average Price</span>
            <span className="font-semibold">PKR 2.8 Cr</span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-slate-100">
            <div className="h-2 w-3/4 rounded-full bg-orange-500" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span>Market Demand</span>
            <span className="font-semibold">High</span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-slate-100">
            <div className="h-2 w-5/6 rounded-full bg-green-500" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span>Growth</span>
            <span className="font-semibold text-green-600">
              +12%
            </span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-slate-100">
            <div className="h-2 w-2/3 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}