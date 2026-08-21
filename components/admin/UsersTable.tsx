"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Trash2, ShieldOff, ShieldCheck } from "lucide-react";
import { User } from "@prisma/client";

import { updateUserRole, updateUserStatus, deleteUser } from "@/app/admin/users/actions";
import DeleteDialog from "./DeleteDialog";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [pending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  function handleRoleChange(userId: string, role: "USER" | "ADMIN") {
    startTransition(async () => {
      try {
        await updateUserRole(userId, role);
        toast.success("User role updated.");
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update role."
        );
      }
    });
  }

  function handleStatusToggle(userId: string, currentStatus: "ACTIVE" | "SUSPENDED") {
    const next = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    startTransition(async () => {
      try {
        await updateUserStatus(userId, next);
        toast.success(next === "SUSPENDED" ? "User suspended." : "User reactivated.");
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update status."
        );
      }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;

    const id = deleteTarget.id;
    setDeleteTarget(null);

    startTransition(async () => {
      try {
        await deleteUser(id);
        toast.success("User deleted.");
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete user."
        );
      }
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-slate-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isSelf = session?.user?.id === user.id;

                return (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {user.name || "-"}
                      {isSelf && (
                        <span className="ml-2 text-xs text-slate-400">
                          (you)
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        disabled={pending || isSelf}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id,
                            e.target.value as "USER" | "ADMIN"
                          )
                        }
                        className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none disabled:cursor-not-allowed ${
                          user.role === "ADMIN"
                            ? "bg-blue-100 text-primary"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "SUSPENDED"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.status === "SUSPENDED" ? "Suspended" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {user.createdAt.toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          disabled={pending || isSelf}
                          onClick={() => handleStatusToggle(user.id, user.status)}
                          title={
                            isSelf
                              ? "You cannot suspend your own account"
                              : user.status === "SUSPENDED"
                                ? "Reactivate user"
                                : "Suspend user"
                          }
                          className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100 transition disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={
                            user.status === "SUSPENDED"
                              ? `Reactivate ${user.name || user.email}`
                              : `Suspend ${user.name || user.email}`
                          }
                        >
                          {user.status === "SUSPENDED" ? (
                            <ShieldCheck size={16} />
                          ) : (
                            <ShieldOff size={16} />
                          )}
                        </button>

                        <button
                          disabled={pending || isSelf}
                          onClick={() => setDeleteTarget(user)}
                          title={
                            isSelf
                              ? "You cannot delete your own account"
                              : "Delete user"
                          }
                          className="rounded-lg border border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white transition disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-red-500"
                          aria-label={`Delete ${user.name || user.email}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <DeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete user"
        description={`This will permanently delete ${
          deleteTarget?.name || deleteTarget?.email || "this user"
        } and all of their estimates. This action cannot be undone.`}
      />
    </div>
  );
}
