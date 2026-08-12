"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
}