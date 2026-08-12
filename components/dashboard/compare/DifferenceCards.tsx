interface Estimate {
  estimatedMin: string;
  estimatedMax: string;
}

interface DifferenceCardsProps {
  first: Estimate;
  second: Estimate;
}

export default function DifferenceCards({
  first,
  second,
}: DifferenceCardsProps) {
  const firstAvg =
    (Number(first.estimatedMin) + Number(first.estimatedMax)) / 2;

  const secondAvg =
    (Number(second.estimatedMin) + Number(second.estimatedMax)) / 2;

  const difference = Math.abs(firstAvg - secondAvg);

  const higher =
    firstAvg > secondAvg ? "Property 1" : "Property 2";

  const betterValue =
    firstAvg < secondAvg ? "Property 1" : "Property 2";

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-PK").format(value);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Higher Estimated Value
        </p>

        <h2 className="mt-2 text-2xl font-bold text-orange-600">
          {higher}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Price Difference
        </p>

        <h2 className="mt-2 text-2xl font-bold text-orange-600">
          PKR {formatPrice(difference)}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Better Value
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-600">
          {betterValue}
        </h2>
      </div>
    </div>
  );
}