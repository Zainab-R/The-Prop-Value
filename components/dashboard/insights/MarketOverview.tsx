interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}

interface MarketOverviewProps {
  rates: Rate[];
}

export default function MarketOverview({
  rates,
}: MarketOverviewProps) {
  const totalRates = rates.length;

  const averagePrice =
    totalRates > 0
      ? rates.reduce((sum, rate) => sum + rate.basePrice, 0) /
        totalRates
      : 0;

  const highestPrice =
    totalRates > 0
      ? Math.max(...rates.map((rate) => rate.basePrice))
      : 0;

  const lowestPrice =
    totalRates > 0
      ? Math.min(...rates.map((rate) => rate.basePrice))
      : 0;

  const formatPrice = (value: number) =>
    `PKR ${new Intl.NumberFormat("en-PK").format(value)}`;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Total Market Rates
        </p>

        <h2 className="mt-2 text-3xl font-bold text-orange-600">
          {totalRates}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Average Price
        </p>

        <h2 className="mt-2 text-2xl font-bold text-orange-600">
          {formatPrice(averagePrice)}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Highest Price
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-600">
          {formatPrice(highestPrice)}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Lowest Price
        </p>

        <h2 className="mt-2 text-2xl font-bold text-blue-600">
          {formatPrice(lowestPrice)}
        </h2>
      </div>
    </div>
  );
}