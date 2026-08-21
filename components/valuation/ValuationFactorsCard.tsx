import type { ValuationBreakdownEntry } from "@/lib/valuation";

export default function ValuationFactorsCard({
  breakdown,
  legacyAppliedFactors,
  className = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
}: {
  breakdown: ValuationBreakdownEntry[] | null;
  legacyAppliedFactors: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-5 font-semibold text-primary">
        Factors Affecting This Valuation
      </h3>

      {breakdown ? (
        <div className="space-y-3">
          {breakdown.map((entry, index) => (
            <div
              key={`${entry.label}-${index}`}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-600">{entry.label}</span>

              {entry.type === "base" ? (
                <span className="font-semibold text-slate-900">
                  PKR {entry.amount?.toLocaleString()}
                </span>
              ) : entry.type === "multiplier" ? (
                <span
                  className={`font-semibold ${
                    (entry.percent ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {(entry.percent ?? 0) >= 0 ? "+" : ""}
                  {entry.percent}%
                </span>
              ) : (
                <span className="font-semibold text-green-600">
                  +PKR {entry.amount?.toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : legacyAppliedFactors.length === 0 ? (
        <p className="text-sm text-slate-500">
          This estimate is based on the base market rate for this sector,
          property type, and size — no additional factors were selected.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {legacyAppliedFactors.map((factor) => (
            <span
              key={factor}
              className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
            >
              {factor}
            </span>
          ))}
        </div>
      )}

      <p className="mt-5 text-xs text-slate-400">
        {breakdown
          ? "Each row shows exactly how it adjusted the base market rate, captured at the time this estimate was created."
          : "Each factor above contributed to adjusting the base sector market rate to arrive at your estimated value."}
      </p>
    </div>
  );
}
