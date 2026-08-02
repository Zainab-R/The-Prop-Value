"use client";

import { useState } from "react";

interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}

interface Props {
  rate: Rate;
  onClose: () => void;
  onSave: (updatedRate: Rate) => Promise<void>;
}

export default function EditMarketRateModal({
  rate,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState(rate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold text-[#123A6D]">
          Edit Market Rate
        </h2>

        <div className="space-y-4">

          <input
            value={form.sector}
            onChange={(e) =>
              setForm({ ...form, sector: e.target.value })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Sector"
          />

          <input
            value={form.propertyType}
            onChange={(e) =>
              setForm({
                ...form,
                propertyType: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Property Type"
          />

          <input
            value={form.propertySize}
            onChange={(e) =>
              setForm({
                ...form,
                propertySize: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Property Size"
          />

          <input
            type="number"
            value={form.basePrice}
            onChange={(e) =>
              setForm({
                ...form,
                basePrice: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Base Price"
          />

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="rounded-lg bg-[#123A6D] px-6 py-2 text-white hover:bg-[#F97316]"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}