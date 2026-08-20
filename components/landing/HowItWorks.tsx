"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Cpu,
  BadgeDollarSign,
  ArrowRight,
  MapPinned,
  Home,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter Property Details",
    description:
      "Provide your property's location, type, size, and features to begin the valuation process.",
    icon: ClipboardList,
    link: "/how-it-works/enter-property-details",
  },
  {
    number: "02",
    title: "Market Analysis",
    description:
      "We analyze current market trends, sector rates, and property characteristics to estimate value.",
    icon: Cpu,
    link: "/how-it-works/market-analysis",
  },
  {
    number: "03",
    title: "Receive Your Estimate",
    description:
      "View an instant estimated price range along with the key factors influencing your property's value.",
    icon: BadgeDollarSign,
    link: "/how-it-works/receive-estimate",
  },
];
export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-white py-32"
    >
      {/* Background Glow */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-100 blur-3xl opacity-50" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-100 blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-primary md:text-5xl">
            Estimate Property Values
            <br />
            in Three Simple Steps
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Get a realistic estimate for your property in DHA Multan using our
            configurable valuation engine.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Connecting Line */}
          <div className="absolute left-0 top-16 hidden h-1 w-full rounded-full bg-slate-200 lg:block">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-orange-500" />
          </div>

          {/* Cards */}
          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-2xl"
                >
                  {/* Number */}
                  <div className="absolute right-6 top-6 text-6xl font-black text-slate-100">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#1E3A5F] shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-5 leading-8 text-slate-600">
                    {step.description}
                  </p>

                  <Link
  href={step.link}
  className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all"
>
  Learn More
  <ArrowRight className="h-4 w-4" />
</Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Estimate Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#1E3A5F] shadow-2xl"
        >
          <div className="grid items-center gap-12 p-10 md:grid-cols-2 lg:p-14">
            {/* Left */}
            <div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-orange-300">
                LIVE EXAMPLE
              </span>

              <h3 className="mt-6 text-4xl font-bold text-white">
                See Your Estimate
                <br />
                Before You Register
              </h3>

              <p className="mt-6 leading-8 text-slate-300">
                Every valuation includes an estimated price range together with
                the factors that influenced the calculation, making the results
                transparent and easy to understand.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <MapPinned className="mb-3 h-6 w-6 text-orange-300" />
                  <p className="text-sm text-slate-300">Location</p>
                  <p className="font-semibold text-white">Sector D</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <Home className="mb-3 h-6 w-6 text-orange-300" />
                  <p className="text-sm text-slate-300">Property</p>
                  <p className="font-semibold text-white">10 Marla Plot</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="rounded-3xl bg-white p-8 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-primary">
                    Property Estimate
                  </h4>

                  <p className="text-slate-500">
                    DHA Multan
                  </p>
                </div>

                <Sparkles className="h-8 w-8 text-orange-500" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                  <span>Sector</span>
                  <strong>Sector D</strong>
                </div>

                <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                  <span>Property</span>
                  <strong>10 Marla Plot</strong>
                </div>

                <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                  <span>Road Type</span>
                  <strong>Corner</strong>
                </div>

                <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                  <span>Solar</span>
                  <strong>Yes</strong>
                </div>

                <div className="flex justify-between rounded-xl bg-slate-100 p-4">
                  <span>Confidence</span>
                  <strong>92%</strong>
                </div>

                <div className="rounded-2xl bg-orange-500 p-6 text-center">
                  <p className="text-sm text-orange-100">
                    Estimated Price Range
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-white">
                    PKR 2.8 – 3.1 Crore
                  </h2>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}