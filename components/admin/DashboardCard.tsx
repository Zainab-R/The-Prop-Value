interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#123A6D]">
        {value}
      </h2>
    </div>
  );
}