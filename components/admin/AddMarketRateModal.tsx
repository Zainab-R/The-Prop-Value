"use client";
import {
  sectors,
  propertyTypes,
  propertySizes,
} from "@/lib/propertyOptions";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onSave: (data: {
    sector: string;
    propertyType: string;
    propertySize: string;
    basePrice: number;
  }) => Promise<void>;
}

export default function AddMarketRateModal({
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState({
    sector: "",
    propertyType: "",
    propertySize: "",
    basePrice: 0,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold text-[#123A6D]">
          Add Market Rate
        </h2>

        <div className="space-y-4">

          <select
            value={form.sector}
            onChange={(e) =>
            setForm({
            ...form,
            sector: e.target.value,
                })
            }
            className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-[#123A6D]"
            >
            <option value="">Select Sector</option>

            {sectors.map((sector) => (
            <option key={sector} value={sector}>
            {sector}
            </option>
            ))}
           </select>

          <select
            value={form.propertyType}
            onChange={(e) =>
            setForm({
            ...form,
            propertyType: e.target.value,
            })
            }
            className="w-full rounded-lg border border-slate-300 p-3"
            >
            <option value="">Select Property Type</option>

            {propertyTypes.map((type) => (
                <option key={type} value={type}>
                {type}
                </option>
                ))}
            </select>

          <select
            value={form.propertySize}
            onChange={(e) =>
             setForm({
            ...form,
            propertySize: e.target.value,
            })
            }
            className="w-full rounded-lg border border-slate-300 p-3"
            >
            <option value="">Select Property Size</option>

            {propertySizes.map((size) => (
            <option key={size} value={size}>
            {size}
            </option>
            ))}
            </select>

          <input
            type="number"
            placeholder="Base Price"
            className="w-full rounded-lg border p-3"
            value={form.basePrice}
            onChange={(e) =>
              setForm({
                ...form,
                basePrice: Number(e.target.value),
              })
            }
          />

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
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