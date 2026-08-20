"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { createUser } from "@/app/admin/users/actions";

interface Props {
  onClose: () => void;
}

export default function AddUserModal({ onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" as "USER" | "ADMIN",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");
    setSaving(true);

    try {
      await createUser(form);
      toast.success("User created successfully.");
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold text-primary">Add User</h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <label htmlFor="add-user-name" className="mb-2 block text-sm font-medium">
              Full Name
            </label>
            <input
              id="add-user-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="add-user-email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="add-user-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="add-user-password" className="mb-2 block text-sm font-medium">
              Temporary Password
            </label>
            <input
              id="add-user-password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="add-user-role" className="mb-2 block text-sm font-medium">
              Role
            </label>
            <select
              id="add-user-role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as "USER" | "ADMIN" })
              }
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button onClick={onClose} className="rounded-xl border px-5 py-2">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-primary px-5 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
}
