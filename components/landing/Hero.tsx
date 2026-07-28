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
      {/* Background Blur */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="flex-1"
        >
          <div className="mb-6 inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
            <ShieldCheck className="mr-2 h-4 w-4 text-orange-500" />
            Trusted Property Valuation Platform
          </div>

          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-[#102A43] lg:text-7xl">
            Estimate Property Values{" "}
            <span className="gradient-text">
              with Confidence
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-white-600">
            Prop Value helps you estimate the cost of purchasing or
            constructing plots and houses in DHA Multan using
            configurable market pricing and property-specific factors.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="flex items-center rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-300 transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold transition hover:bg-slate-50"
            >
              Learn More
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-8">
            <div>
              <h3 className="text-3xl font-bold text-[#102A43]">25+</h3>
              <p className="text-ivory-500">DHA Sectors</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#102A43]">100+</h3>
              <p className="text-ivory-500">Property Factors</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#102A43]">Fast</h3>
              <p className="text-ivory-500">Estimate Generation</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="relative flex-1"
        >

          {/* Main Card */}

          <div className="rounded-3xl bg-white p-8 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#102A43]">
                  Property Estimate
                </h3>

                <p className="text-slate-500">
                  DHA Multan
                </p>
              </div>

              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>

            <div className="space-y-5">

              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span>Sector</span>
                <strong>Sector D</strong>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span>Property</span>
                <strong>10 Marla Plot</strong>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span>Estimated Value</span>
                <strong className="text-orange-500">
                  PKR 2.8–3.1 Crore
                </strong>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                <span>Confidence</span>
                <strong>92%</strong>
              </div>

            </div>
          </div>

          {/* Floating Card 1 */}

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute -left-8 top-20 rounded-2xl bg-white p-5 shadow-xl"
          >
            <MapPinned className="mb-2 text-orange-500" />
            <p className="font-semibold">
              DHA Multan
            </p>
          </motion.div>

          {/* Floating Card 2 */}

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute -right-8 bottom-10 rounded-2xl bg-white p-5 shadow-xl"
          >
            <Home className="mb-2 text-[#102A43]" />
            <p className="font-semibold">
              Premium Housing
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}