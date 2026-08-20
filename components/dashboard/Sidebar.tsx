"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

import {
  LayoutDashboard,
  Calculator,
  History,
  GitCompareArrows,
  BarChart3,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useSidebar } from "@/components/shared/SidebarProvider";

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
  const { open, close } = useSidebar();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-primary text-white shadow-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      {/* ================= Logo ================= */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo/logo.jpeg"
            alt="The Prop Value"
            width={55}
            height={55}
            className="rounded-xl object-contain"
            priority
          />

          <div className="flex flex-col">
            <h1 className="whitespace-nowrap text-xl font-semibold leading-tight">
              <span className="text-white">The Prop </span>
              <span className="text-[#F4A261]">Value</span>
            </h1>

            <p className="text-sm text-blue-200">
              DHA Multan
            </p>
          </div>
        </Link>

        <button
          onClick={close}
          aria-label="Close menu"
          className="rounded-lg p-1 text-blue-200 hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      {/* ================= Main Menu ================= */}
      <div className="px-5 pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-200">
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
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition ${
                    active
                      ? "text-white"
                      : "text-blue-200 group-hover:text-white"
                  }`}
                />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================= Account ================= */}
      <div className="px-5 pt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-200">
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
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition ${
                    active
                      ? "text-white"
                      : "text-blue-200 group-hover:text-white"
                  }`}
                />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================= Logout ================= */}
      <div className="mt-auto border-t border-white/10 p-5">
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
      </aside>
    </>
  );
}