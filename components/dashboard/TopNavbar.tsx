"use client";

import { Bell, Search } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-orange-500"
        />
      </div>

      <button className="rounded-xl p-3 transition hover:bg-slate-100">
        <Bell size={22} />
      </button>
    </header>
  );
}