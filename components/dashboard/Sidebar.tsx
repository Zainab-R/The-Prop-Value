"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  Calculator,
  History,
  GitCompareArrows,
  BarChart3,
  User,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Estimate",
    href: "/dashboard/estimate",
    icon: Calculator,
  },
  {
    title: "Estimate History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Compare Properties",
    href: "/dashboard/compare",
    icon: GitCompareArrows,
  },
  {
    title: "Market Insights",
    href: "/dashboard/insights",
    icon: BarChart3,
  },
];

const accountItems = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500 p-3 text-white">
            <Building2 size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#102A43]">
              Prop Value
            </h1>

            <p className="text-sm text-slate-500">
              DHA Multan
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-5 pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Account */}
      <div className="px-5 pt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Account
        </p>

        <nav className="space-y-2">
          {accountItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-auto border-t border-slate-200 p-5">
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}