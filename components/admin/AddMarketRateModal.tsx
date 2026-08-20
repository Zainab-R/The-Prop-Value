"use client";
import {
  sectors,
  propertyTypes,
  isPropertyType,
  getSectorsForPropertyType,
  getSizesForSectorAndType,
  getVillaTypesForPropertyType,
  getSizesForVillaType,
} from "@/lib/propertyOptions";
import { useEffect, useMemo, useState } from "react";

interface Props {
  onClose: () => void;
  onSave: (data: {
    sector: string;
    propertyType: string;
    propertySize: string;
    basePrice: number;
    villaType?: string;
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
    villaType: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isSectorC = form.sector === "C";

  const villaTypesForType = useMemo(() => {
    if (!form.propertyType || !isPropertyType(form.propertyType)) {
      return [];
    }
    return getVillaTypesForPropertyType(form.propertyType);
  }, [form.propertyType]);

  const availableSectors = useMemo(() => {
    if (!form.propertyType || !isPropertyType(form.propertyType)) {
      return [];
    }
    const base = getSectorsForPropertyType(form.propertyType);
    if (villaTypesForType.length > 0) {
      return sectors.filter((s) => base.includes(s) || s === "C");
    }
    return base;
  }, [form.propertyType, villaTypesForType]);

  const availableSizes = useMemo(() => {
    if (!form.propertyType || !isPropertyType(form.propertyType) || !form.sector) {
      return [];
    }
    if (isSectorC) {
      return form.villaType ? getSizesForVillaType(form.villaType, form.propertyType) : [];
    }
    return getSizesForSectorAndType(form.propertyType, form.sector);
  }, [form.propertyType, form.sector, isSectorC, form.villaType]);

  // Reset the sector if it's no longer valid for the newly chosen type.
  useEffect(() => {
    if (form.sector && !availableSectors.includes(form.sector)) {
      setForm((prev) => ({ ...prev, sector: "", propertySize: "", villaType: "" }));
    }
  }, [availableSectors, form.sector]);

  // Clear the housing society whenever we leave Sector C.
  useEffect(() => {
    if (!isSectorC && form.villaType) {
      setForm((prev) => ({ ...prev, villaType: "" }));
    }
  }, [isSectorC, form.villaType]);

  const isValid =
    form.sector !== "" &&
    form.propertyType !== "" &&
    form.propertySize !== "" &&
    (!isSectorC || form.villaType !== "") &&
    Number.isFinite(form.basePrice) &&
    form.basePrice > 0;

  async function handleSave() {
    if (!isValid) {
      setError("Please fill in every field with a base price greater than 0.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      await onSave(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save market rate.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold text-primary">
          Add Market Rate
        </h2>

        <div className="space-y-4">

          <select
            value={form.propertyType}
            onChange={(e) =>
              setForm({
                ...form,
                propertyType: e.target.value,
                sector: "",
                propertySize: "",
                villaType: "",
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
            value={form.sector}
            onChange={(e) =>
              setForm({
                ...form,
                sector: e.target.value,
                propertySize: "",
                villaType: "",
              })
            }
            disabled={!form.propertyType}
            className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="">
              {form.propertyType ? "Select Sector" : "Select Property Type First"}
            </option>

            {availableSectors.map((sector) => (
              <option key={sector} value={sector}>
                Sector {sector}
              </option>
            ))}
          </select>

          {isSectorC && (
            <select
              value={form.villaType}
              onChange={(e) =>
                setForm({ ...form, villaType: e.target.value, propertySize: "" })
              }
              className="w-full rounded-lg border border-slate-300 p-3"
            >
              <option value="">Select Housing Society</option>

              {villaTypesForType.map((vt) => (
                <option key={vt} value={vt}>
                  {vt}
                </option>
              ))}
            </select>
          )}

          <select
            value={form.propertySize}
            onChange={(e) =>
              setForm({
                ...form,
                propertySize: e.target.value,
              })
            }
            disabled={!form.sector || (isSectorC && !form.villaType)}
            className="w-full rounded-lg border border-slate-300 p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="">
              {!form.propertyType
                ? "Select Property Type First"
                : !form.sector
                ? "Select Sector First"
                : isSectorC && !form.villaType
                ? "Select Housing Society First"
                : "Select Property Size"}
            </option>

            {availableSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            placeholder="Base Price (PKR)"
            className="w-full rounded-lg border p-3"
            value={form.basePrice || ""}
            onChange={(e) =>
              setForm({
                ...form,
                basePrice: Number(e.target.value),
              })
            }
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border px-5 py-2 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !isValid}
            className="rounded-lg bg-primary px-6 py-2 text-white transition hover:bg-[#F97316] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}
