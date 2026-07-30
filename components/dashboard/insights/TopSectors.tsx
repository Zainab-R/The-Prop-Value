interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}

interface TopSectorsProps {
  rates: Rate[];
}

export default function TopSectors({
  rates,
}: TopSectorsProps) {
  const topSectors = [...rates]
    .sort((a, b) => b.basePrice - a.basePrice)
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Top Performing Sectors
      </h2>

      <div className="space-y-4">
        {topSectors.map((sector, index) => (
          <div
            key={sector.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                #{index + 1}
              </div>

              <div>
                <h3 className="font-semibold">
                  {sector.sector}
                </h3>

                <p className="text-sm text-gray-500">
                  {sector.propertyType} • {sector.propertySize}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-orange-600">
                PKR {sector.basePrice.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}