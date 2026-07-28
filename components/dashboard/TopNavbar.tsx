"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, CalendarDays } from "lucide-react";
import { useSession } from "next-auth/react";

import UserDropdown from "./UserDropdown";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/estimate": "New Estimate",
  "/dashboard/history": "Estimate History",
  "/dashboard/compare": "Compare Properties",
  "/dashboard/insights": "Market Insights",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
};

export default function TopNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const title = pageTitles[pathname] || "Dashboard";

  const today = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-[#102A43]">
          {title}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />

          <span>{today}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 lg:flex">
          <Search size={18} className="text-slate-400" />

          <input
            placeholder="Search..."
            className="ml-3 w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
        </button>

        {/* User */}
        <UserDropdown
          name={session?.user?.name || "User"}
          email={session?.user?.email || ""}
          image={session?.user?.image || ""}
        />
      </div>
    </header>
  );
}