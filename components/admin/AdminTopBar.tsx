"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/shared/SidebarProvider";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/users": "Users",
  "/admin/estimates": "Estimates",
  "/admin/market-rates": "Market Rates",
  "/admin/luxury-rates": "Luxury Rates",
  "/admin/road-rates": "Road Rates",
  "/admin/amenities": "Amenities",
  "/admin/settings": "Settings",
};

export default function AdminTopBar() {
  const pathname = usePathname();
  const { toggle } = useSidebar();

  const title = pageTitles[pathname] || "Admin Panel";

  return (
    <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden">
      <button
        onClick={toggle}
        aria-label="Open menu"
        className="rounded-lg p-2 text-primary hover:bg-slate-100"
      >
        <Menu size={22} />
      </button>

      <h1 className="text-lg font-semibold text-primary">{title}</h1>
    </header>
  );
}
