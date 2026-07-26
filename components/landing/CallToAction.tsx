"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#102A43] via-[#163B63] to-[#102A43]" />

      {/* Orange Glow */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-orange-300 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Ready to Estimate Your Property?
          </div>

          <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-6xl">
            Make Better Property Decisions
            <br />
            with Accurate Estimates
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Join Prop Value today and receive transparent property
            valuations for plots and houses in DHA Multan using
            sector pricing, amenities, and construction details.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/register"
              className="inline-flex items-center rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Create Free Account
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Features
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">

            <div>
              <h3 className="text-4xl font-bold text-white">
                25+
              </h3>

              <p className="mt-2 text-slate-300">
                DHA Sectors
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                100+
              </h3>

              <p className="mt-2 text-slate-300">
                Pricing Factors
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                92%
              </h3>

              <p className="mt-2 text-slate-300">
                Confidence Score
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                Instant
              </h3>

              <p className="mt-2 text-slate-300">
                Estimates
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}