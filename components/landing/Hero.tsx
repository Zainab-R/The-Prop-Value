"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPinned,
  Home,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-bg">
      {/* Overlay (lighter for better background visibility) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#081226]/70 via-[#081226]/35 to-transparent" />

      {/* Decorative Blur */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-orange-400/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          {/* Badge */}

          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md shadow-lg">
            <ShieldCheck className="mr-2 h-4 w-4 text-orange-400" />
            Trusted Property Valuation Platform
          </div>

          {/* Heading */}

          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.45)] lg:text-7xl">
            Estimate
            <br />
            Property Values
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              with Confidence
            </span>
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-200">
            Prop Value helps you estimate the cost of purchasing or
            constructing plots and houses in DHA Multan using configurable
            market pricing and property-specific factors.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="flex items-center rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-xl shadow-orange-500/30 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-white/20 bg-white/90 px-8 py-4 font-semibold text-[#102A43] shadow-lg backdrop-blur-sm transition duration-300 hover:bg-white"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}

          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <h3 className="text-3xl font-bold text-white">25+</h3>
              <p className="mt-1 text-slate-300">DHA Sectors</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">100+</h3>
              <p className="mt-1 text-slate-300">Property Factors</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">Fast</h3>
              <p className="mt-1 text-slate-300">Estimate Generation</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex-1"
        >
          {/* Main Card */}

          <div className="rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#102A43]">
                  Property Estimate
                </h3>

                <p className="text-slate-500">DHA Multan</p>
              </div>

              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>

            <div className="space-y-5">
              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span className="text-slate-600">Sector</span>
                <strong className="text-[#102A43]">Sector D</strong>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span className="text-slate-600">Property</span>
                <strong className="text-[#102A43]">10 Marla Plot</strong>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span className="text-slate-600">Estimated Value</span>
                <strong className="text-orange-500">
                  PKR 2.8–3.1 Crore
                </strong>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span className="text-slate-600">Confidence</span>
                <strong className="text-[#102A43]">92%</strong>
              </div>
            </div>
          </div>

          {/* Floating Card */}

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute -left-8 top-20 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur-md"
          >
            <MapPinned className="mb-2 h-6 w-6 text-orange-500" />
            <p className="font-semibold text-[#102A43]">
              DHA Multan
            </p>
          </motion.div>

          {/* Floating Card */}

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute -right-8 bottom-10 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur-md"
          >
            <Home className="mb-2 h-6 w-6 text-[#102A43]" />
            <p className="font-semibold text-[#102A43]">
              Premium Housing
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}