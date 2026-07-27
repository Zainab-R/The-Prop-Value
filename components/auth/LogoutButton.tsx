"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/auth/login",
        })
      }
      className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
    >
      Logout
    </button>
  );
}