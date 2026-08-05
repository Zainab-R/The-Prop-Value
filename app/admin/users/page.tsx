import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // TEMPORARY DEBUG LOGS
  console.log("========== USERS FROM DATABASE ==========");
  console.log("Total Users:", users.length);

  console.table(
    users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#123A6D]">
          Users Management
        </h1>

        <p className="mt-2 text-slate-500">
          View and manage registered users.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search users..."
          className="w-80 rounded-xl border border-slate-300 bg-white px-4 py-2 outline-none focus:border-[#123A6D]"
        />

        <button className="rounded-xl bg-[#123A6D] px-5 py-2 text-white hover:bg-[#0F2E56] transition">
          + Add User
        </button>
      </div>

      <UsersTable users={users} />
    </div>
  );
}