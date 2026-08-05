"use client";

import { User } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr className="text-left text-sm font-semibold text-slate-700">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Joined</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-slate-500"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {user.name || "-"}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-blue-100 text-[#123A6D]"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {user.createdAt.toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="rounded-lg border border-[#123A6D] p-2 text-[#123A6D] hover:bg-[#123A6D] hover:text-white transition">
                      <Pencil size={16} />
                    </button>

                    <button className="rounded-lg border border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}