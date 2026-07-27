export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#102A43]">Quick Actions</h3>
      <div className="mt-4 flex gap-3">
        <button className="rounded-xl bg-orange-500 px-4 py-2 text-white">New Estimate</button>
        <button className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700">View History</button>
      </div>
    </div>
  );
}
