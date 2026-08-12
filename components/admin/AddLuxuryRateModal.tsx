"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { createLuxuryRate } from "@/app/admin/luxury-rates/actions";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddLuxuryRateModal({
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [level, setLevel] = useState("");
  const [multiplier, setMultiplier] = useState("");

  const [error, setError] = useState("");

  const [pending, startTransition] = useTransition();

  if (!open) return null;

  function handleSubmit() {
    setError("");

    startTransition(async () => {
      try {
        await createLuxuryRate(
          level,
          Number(multiplier)
        );

        setLevel("");
        setMultiplier("");

        onClose();

        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold text-[#123A6D]">
            Add Luxury Rate
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-5 p-6">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Luxury Level
            </label>

            <input
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 focus:border-[#123A6D] focus:outline-none"
              placeholder="Premium"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Multiplier
            </label>

            <input
              type="number"
              step="0.01"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 focus:border-[#123A6D] focus:outline-none"
              placeholder="1.20"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

        </div>

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            disabled={pending}
            onClick={handleSubmit}
            className="rounded-xl bg-[#123A6D] px-5 py-2 text-white hover:bg-[#0F315D] disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}