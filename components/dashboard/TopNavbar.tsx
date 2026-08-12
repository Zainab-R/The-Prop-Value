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
    <header className="flex items-center justify-between border-b border-white/10 bg-[#123A6D] px-8 py-5 shadow-md">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-blue-200">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        
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