import TableSkeleton from "@/components/shared/TableSkeleton";

export default function UsersLoading() {
  return (
    <div className="space-y-8">
      <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200" />
      <TableSkeleton rows={8} showHeader={false} />
    </div>
  );
}
