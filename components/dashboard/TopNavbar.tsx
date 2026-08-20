"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";
import { useSidebar } from "@/components/shared/SidebarProvider";

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
  const { toggle } = useSidebar();

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
    <header className="flex items-center justify-between border-b border-white/10 bg-primary px-4 py-5 shadow-md sm:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          aria-label="Open menu"
          className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-bold text-white sm:text-3xl">
            {title}
          </h1>

          <div className="mt-2 hidden items-center gap-2 text-sm text-blue-200 sm:flex">
            <CalendarDays size={16} />
            <span>{today}</span>
          </div>
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