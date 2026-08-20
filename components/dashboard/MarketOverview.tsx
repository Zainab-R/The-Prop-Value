interface MarketSnapshot {
  averageBasePrice: number;
  sectorsCovered: number;
}

export default function MarketOverview({
  snapshot,
}: {
  snapshot: MarketSnapshot;
}) {
  const averageInCrore = snapshot.averageBasePrice / 10000000;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-primary">
        Market Snapshot
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Based on current DHA Multan pricing data
      </p>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
          <span className="text-sm text-slate-600">Average Base Price</span>
          <span className="font-semibold text-primary">
            {snapshot.averageBasePrice > 0
              ? `PKR ${averageInCrore.toFixed(2)} Cr`
              : "—"}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
          <span className="text-sm text-slate-600">Sectors Covered</span>
          <span className="font-semibold text-primary">
            {snapshot.sectorsCovered}
          </span>
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Averages across all sectors, property types, and sizes currently
        priced in the system.
      </p>
    </div>
  );
}
