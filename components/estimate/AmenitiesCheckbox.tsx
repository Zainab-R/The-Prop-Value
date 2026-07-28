"use client";

interface Props {
  value: string;
  checked: boolean;
  onChange: () => void;
}

export default function AmenitiesCheckbox({
  value,
  checked,
  onChange,
}: Props) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-orange-500"
      />

      <span>{value}</span>
    </label>
  );
}