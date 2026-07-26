"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  MapPinned,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";

const adjustments = [
  { label: "Corner Plot", value: "+8%" },
  { label: "Main Boulevard", value: "+10%" },
  { label: "Solar System", value: "+3%" },
  { label: "Basement", value: "+5%" },
];

const sectors = [
  { name: "Sector D", width: "95%" },
  { name: "Sector C", width: "82%" },
  { name: "Sector B", width: "68%" },
  { name: "Sector E", width: "60%" },
];

export default function EstimatePreview() {
  return (
    <section className="bg-slate-50 py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            PROPERTY VALUATION
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#102A43]">
            Understand Your Property's
            Market Value
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Prop Value combines sector pricing, construction details,
            luxury level, and amenities to estimate the expected
            value of your property in DHA Multan.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">
              <BadgeCheck className="text-orange-500" />
              Transparent valuation methodology
            </div>

            <div className="flex items-center gap-4">
              <BadgeCheck className="text-orange-500" />
              Configurable market pricing
            </div>

            <div className="flex items-center gap-4">
              <BadgeCheck className="text-orange-500" />
              Sector-wise comparison
            </div>

            <div className="flex items-center gap-4">
              <BadgeCheck className="text-orange-500" />
              Confidence score with every estimate
            </div>

          </div>

          <Link
            href="/register"
            className="mt-12 inline-flex items-center rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Start Estimating

            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white p-8 shadow-2xl"
        >

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold text-[#102A43]">
                Estimated Value
              </h3>

              <p className="text-slate-500">
                Sector D • 10 Marla
              </p>

            </div>

            <TrendingUp className="text-orange-500" />

          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#102A43] to-[#1E3A5F] p-8 text-white">

            <p className="text-slate-300">
              Estimated Price
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              PKR 2.95 Cr
            </h2>

            <div className="mt-6 flex items-center gap-2">

              <MapPinned size={18} />

              DHA Multan

            </div>

          </div>

          <div className="mt-8">

            <div className="mb-5 flex items-center justify-between">

              <h4 className="font-bold text-[#102A43]">
                Property Adjustments
              </h4>

              <span className="font-semibold text-orange-500">
                92% Confidence
              </span>

            </div>

            <div className="space-y-4">

              {adjustments.map((item) => (

                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-slate-100 p-4"
                >

                  <span>{item.label}</span>

                  <strong className="text-green-600">
                    {item.value}
                  </strong>

                </div>

              ))}

            </div>

          </div>

          <div className="mt-10">

            <h4 className="mb-6 font-bold text-[#102A43]">
              Sector Comparison
            </h4>

            <div className="space-y-5">

              {sectors.map((sector) => (

                <div key={sector.name}>

                  <div className="mb-2 flex justify-between">

                    <span>{sector.name}</span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-200">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: sector.width,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                      }}
                      className="h-full rounded-full bg-orange-500"
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}