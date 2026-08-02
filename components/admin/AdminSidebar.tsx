"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calculator,
  TrendingUp,
  Gem,
  Route,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Market Rates",
    href: "/admin/market-rates",
    icon: TrendingUp,
  },
  {
    name: "Luxury Rates",
    href: "/admin/luxury-rates",
    icon: Gem,
  },
  {
    name: "Road Rates",
    href: "/admin/road-rates",
    icon: Route,
  },
  {
    name: "Amenities",
    href: "/admin/amenities",
    icon: Calculator,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#123A6D] text-white">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white">
        Prop Value
        </h2>
        <p className="mt-1 text-sm text-slate-300">
        Admin Panel
        </p>
       </div>

      <nav className="flex flex-col p-4 gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200
                ${
                    active
                        ? "bg-[#F97316] text-white shadow-lg"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}