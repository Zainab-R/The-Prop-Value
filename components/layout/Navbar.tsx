"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "How It Works",
    href: "#how",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-900 bg-[#0b1f3a]/95 shadow-md backdrop-blur-xl"
          : "bg-[#0b1f3a]"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo.jpeg"
            alt="Prop Value"
            width={44}
            height={44}
            className="rounded-xl"
          />

          <div>
            <h1 className="text-lg font-bold text-white">
              Prop Value
            </h1>

            <p className="text-xs text-blue-100">
              DHA Multan
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-medium text-white transition hover:text-blue-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Buttons */}

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-xl border border-white/30 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-orange-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-orange-300 transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="text-white lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="border-t border-blue-900 bg-[#0b1f3a] lg:hidden"
          >
            <div className="flex flex-col p-6">
              {links.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-4 text-white"
                >
                  {item.name}
                </a>
              ))}

              <Link
                href="/login"
                className="mt-4 rounded-xl border border-white/30 px-4 py-3 text-center text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="mt-3 rounded-xl bg-orange-500 py-3 text-center font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}