"use client";

import { useMemo, useState } from "react";

interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}

interface MarketTableProps {
  rates: Rate[];
}

export default function MarketTable({
  rates,
}: MarketTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rates.length / rowsPerPage);

  const paginatedRates = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return rates.slice(start, start + rowsPerPage);
  }, [rates, currentPage, rowsPerPage]);

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <h2 className="text-xl font-bold">
          Total Market Rates ({rates.length})
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Show
          </span>

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-lg border px-3 py-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Sector</th>
              <th className="p-4 text-left">Property Type</th>
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-right">Base Price</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRates.map((rate) => (
              <tr
                key={rate.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{rate.sector}</td>
                <td className="p-4">{rate.propertyType}</td>
                <td className="p-4">{rate.propertySize}</td>
                <td className="p-4 text-right font-semibold text-orange-600">
                  PKR {rate.basePrice.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t p-6">
        <button
          onClick={() =>
            setCurrentPage((page) => Math.max(page - 1, 1))
          }
          disabled={currentPage === 1}
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((page) =>
              Math.min(page + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}