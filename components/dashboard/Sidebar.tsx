"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Calculator,
  History,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { signOut } from "next-auth/react";

const menu = [
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
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
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
    <aside className="flex w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}

      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-[#102A43]">
          Prop Value
        </h1>

        <p className="text-sm text-slate-500">
          DHA Multan
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-orange-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t p-4">
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/auth/login",
            })
          }
          className="flex w-full items-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}