"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface UserDropdownProps {
  name: string;
  email: string;
  image?: string;
}

export default function UserDropdown({
  name,
  email,
  image,
}: UserDropdownProps) {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      {/* Avatar */}
      {image ? (
        <Image
          src={image}
          alt={name}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
          {initials}
        </div>
      )}

      {/* User Details */}
      <div className="hidden md:block">
        <p className="font-semibold text-primary">
          {name}
        </p>

        <p className="text-xs text-slate-500">
          {email}
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
        className="ml-2 rounded-lg p-2 transition hover:bg-slate-100"
        title="Logout"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}