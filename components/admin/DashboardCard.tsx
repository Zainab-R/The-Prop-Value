import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: DashboardCardProps) {
  return (
    <div
      className="
      group
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </div>
  );
}