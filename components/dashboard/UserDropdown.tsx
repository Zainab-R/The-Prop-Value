"use client";

import { signOut } from "next-auth/react";
import { User, Settings, LogOut } from "lucide-react";

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
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-11 w-11 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white">
          <User size={20} />
        </div>
      )}

      <div className="hidden md:block">
        <p className="font-semibold text-[#102A43]">
          {name}
        </p>

        <p className="text-xs text-slate-500">
          {email}
        </p>
      </div>

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