import { LucideIcon } from "lucide-react";
interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className={`${color ?? "bg-slate-100"} h-10 w-10 rounded-xl p-2 text-white`}>
              <Icon className="h-6 w-6" />
            </div>
          )}

          <p className="text-sm font-medium text-slate-500">{title}</p>
        </div>
      </div>

      <h2 className="mt-3 text-4xl font-bold text-primary">{value}</h2>
    </div>
  );
}