"use client";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleSwitch({
  label,
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
      <span className="font-medium text-slate-700">{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-orange-500"
      />
    </label>
  );
}