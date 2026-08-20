"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddUserModal from "./AddUserModal";

export default function UsersToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [showAddModal, setShowAddModal] = useState(false);
  const [, startTransition] = useTransition();

  function handleSearchChange(value: string) {
    setQuery(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    params.delete("page");

    startTransition(() => {
      router.push(`/admin/users?${params.toString()}`);
    });
  }

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        placeholder="Search users by name or email..."
        value={query}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-80 rounded-xl border border-slate-300 bg-white px-4 py-2 outline-none focus:border-primary"
      />

      <button
        onClick={() => setShowAddModal(true)}
        className="rounded-xl bg-primary px-5 py-2 text-white hover:bg-[#0F2E56] transition"
      >
        + Add User
      </button>

      {showAddModal && (
        <AddUserModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
