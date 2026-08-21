import TableSkeleton from "@/components/shared/TableSkeleton";

export default function HistoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <TableSkeleton rows={5} />
    </div>
  );
}
