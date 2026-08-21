interface Estimate {
  id: string;
  label: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMin: string;
  estimatedMax: string;
}

interface ComparisonTableProps {
  estimates: Estimate[];
}

export default function ComparisonTable({ estimates }: ComparisonTableProps) {
  const formatPrice = (value: string) =>
    new Intl.NumberFormat("en-PK").format(Number(value));

  const rows = [
    {
      label: "Sector",
      values: estimates.map((e) => e.sector),
    },
    {
      label: "Property Type",
      values: estimates.map((e) => e.propertyType),
    },
    {
      label: "Property Size",
      values: estimates.map((e) => e.propertySize),
    },
    {
      label: "Minimum Price",
      values: estimates.map((e) => `PKR ${formatPrice(e.estimatedMin)}`),
    },
    {
      label: "Maximum Price",
      values: estimates.map((e) => `PKR ${formatPrice(e.estimatedMax)}`),
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Attribute</th>
              {estimates.map((estimate) => (
                <th key={estimate.id} className="px-6 py-4 text-left">
                  {estimate.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <TableRow key={row.label} label={row.label} values={row.values} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface RowProps {
  label: string;
  values: string[];
}

function TableRow({ label, values }: RowProps) {
  const allSame = values.every((value) => value === values[0]);

  return (
    <tr className="border-t">
      <td className="px-6 py-4 font-semibold">{label}</td>

      {values.map((value, index) => (
        <td
          key={index}
          className={`px-6 py-4 ${allSame ? "" : "bg-orange-50"}`}
        >
          {value}
        </td>
      ))}
    </tr>
  );
}
