const activities = [
  {
    title: "Property estimate created",
    time: "2 minutes ago",
  },
  {
    title: "Comparison completed",
    time: "Yesterday",
  },
  {
    title: "Dashboard accessed",
    time: "Today",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#102A43]">
        Recent Activity
      </h2>

      <div className="mt-5 space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-slate-100 p-4"
          >
            <span>{activity.title}</span>

            <span className="text-sm text-slate-500">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}