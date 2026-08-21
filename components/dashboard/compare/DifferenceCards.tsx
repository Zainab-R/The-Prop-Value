interface Estimate {
  label: string;
  estimatedMin: string;
  estimatedMax: string;
}

interface DifferenceCardsProps {
  estimates: Estimate[];
}

export default function DifferenceCards({ estimates }: DifferenceCardsProps) {
  const withAvg = estimates.map((estimate) => ({
    ...estimate,
    avg: (Number(estimate.estimatedMin) + Number(estimate.estimatedMax)) / 2,
  }));

  const highest = withAvg.reduce((a, b) => (b.avg > a.avg ? b : a));
  const lowest = withAvg.reduce((a, b) => (b.avg < a.avg ? b : a));
  const range = highest.avg - lowest.avg;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-PK").format(value);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Highest Estimated Value</p>

        <h2 className="mt-2 text-2xl font-bold text-orange-600">
          {highest.label}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Value Range</p>

        <h2 className="mt-2 text-2xl font-bold text-orange-600">
          PKR {formatPrice(range)}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Lowest Estimated Value</p>

        <h2 className="mt-2 text-2xl font-bold text-green-600">
          {lowest.label}
        </h2>
      </div>
    </div>
  );
}
