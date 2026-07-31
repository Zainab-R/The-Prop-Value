interface Estimate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMin: string;
  estimatedMax: string;
}

interface ComparisonTableProps {
  first: Estimate;
  second: Estimate;
}

export default function ComparisonTable({
  first,
  second,
}: ComparisonTableProps) {
  const formatPrice = (value: string) =>
    new Intl.NumberFormat("en-PK").format(Number(value));

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Attribute</th>
            <th className="px-6 py-4 text-left">Property 1</th>
            <th className="px-6 py-4 text-left">Property 2</th>
          </tr>
        </thead>

        <tbody>
          <TableRow
            label="Sector"
            first={first.sector}
            second={second.sector}
          />

          <TableRow
            label="Property Type"
            first={first.propertyType}
            second={second.propertyType}
          />

          <TableRow
            label="Property Size"
            first={first.propertySize}
            second={second.propertySize}
          />

          <TableRow
            label="Minimum Price"
            first={`PKR ${formatPrice(first.estimatedMin)}`}
            second={`PKR ${formatPrice(second.estimatedMin)}`}
          />

          <TableRow
            label="Maximum Price"
            first={`PKR ${formatPrice(first.estimatedMax)}`}
            second={`PKR ${formatPrice(second.estimatedMax)}`}
          />
        </tbody>
      </table>
    </div>
  );
}

interface RowProps {
  label: string;
  first: string;
  second: string;
}

function TableRow({
  label,
  first,
  second,
}: RowProps) {
  const different = first !== second;

  return (
    <tr className="border-t">
      <td className="px-6 py-4 font-semibold">
        {label}
      </td>

      <td
        className={`px-6 py-4 ${
          different ? "bg-orange-50" : ""
        }`}
      >
        {first}
      </td>

      <td
        className={`px-6 py-4 ${
          different ? "bg-orange-50" : ""
        }`}
      >
        {second}
      </td>
    </tr>
  );
}