"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Gem,
  Route,
  Calculator,
  Settings,
  ClipboardList,
  LogOut,
  X,
} from "lucide-react";
import { useSidebar } from "@/components/shared/SidebarProvider";

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
    name: "Estimates",
    href: "/admin/estimates",
    icon: ClipboardList,
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
  const { open, close } = useSidebar();

  return (
    <>
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-primary text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ================= Logo ================= */}
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/admin" className="flex items-center">
            <div className="flex flex-col">
              <h1 className="whitespace-nowrap text-xl font-semibold leading-tight">
                <span className="text-white">The Prop </span>
                <span className="text-accent">Value</span>
              </h1>

              <p className="text-sm text-blue-200">
                Admin Panel
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
        <div className="px-5 pt-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-200">
            Main Menu
          </p>

          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              const active =
                pathname === link.href ||
                (link.href !== "/admin" &&
                  pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                    active
                      ? "bg-accent text-white shadow-lg"
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
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ================= Logout ================= */}
        <div className="mt-auto border-t border-white/10 p-5">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#ea580c] hover:shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>

          <p className="mt-4 text-center text-xs text-blue-300">
            The Prop Value — DHA Multan
          </p>
        </div>
      </aside>
    </>
  );
}
