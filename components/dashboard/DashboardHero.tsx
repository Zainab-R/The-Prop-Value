"use client";
import Image from "next/image";

import Link from "next/link";
import {
  ArrowRight,
  PlusCircle,
  BarChart3,
  Sparkles,
  MapPinned,
  Building2,
} from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#123A6D] via-[#1E3A8A] to-[#2563EB] p-8 text-white shadow-lg">
      {/* Background Decoration */}
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-16 left-1/2 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl"></div>

      <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
        {/* Left Side */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
            <Sparkles size={16} />
            Smart Property Valuation
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight">
            Welcome back,
            <br />
            <span className="text-orange-300">Shanzay Masood</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-blue-100">
            Estimate, compare and track DHA Multan property values using
            real-time market insights. Manage all your property valuations from
            one professional dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard/estimate"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              <PlusCircle size={18} />
              New Estimate
            </Link>

            <Link
              href="/dashboard/compare"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <BarChart3 size={18} />
              Compare Properties
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Building2 size={18} />
              Smart Valuation
            </div>

            <div className="flex items-center gap-2">
              <MapPinned size={18} />
              DHA Multan Data
            </div>

            <div className="flex items-center gap-2">
              <ArrowRight size={18} />
              Real-Time Insights
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-lg border border-white/20">
            <Building2 size={110} className="text-orange-300" />

           <h1 className="whitespace-nowrap text-xl font-semibold leading-tight">
      <span className="text-[#123A6D]">The Prop </span>
      <span className="text-[#B87333]">Value</span>
    </h1>

            <p className="mt-2 text-center text-sm text-blue-100">
              DHA Multan Property Intelligence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}