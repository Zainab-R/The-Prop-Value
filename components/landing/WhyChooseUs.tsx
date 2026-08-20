"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPinned,
  Clock3,
  Lock,
  BarChart3,
  Sparkles,
} from "lucide-react";

const reasons = [
  {
    title: "Designed for DHA Multan",
    description:
      "Built specifically around DHA Multan sectors, blocks, and property characteristics instead of generic nationwide pricing.",
    icon: MapPinned,
  },
  {
    title: "Transparent Estimates",
    description:
      "Every valuation clearly explains the factors that influenced the estimated price range.",
    icon: BarChart3,
  },
  {
    title: "Fast Results",
    description:
      "Receive a detailed estimate within seconds after entering your property information.",
    icon: Clock3,
  },
  {
    title: "Secure Accounts",
    description:
      "Your account and saved estimates are protected using modern authentication and security practices.",
    icon: Lock,
  },
  {
    title: "Reliable Valuation",
    description:
      "Property characteristics such as road type, amenities, construction status, and luxury level are all considered.",
    icon: ShieldCheck,
  },
  {
    title: "Premium Experience",
    description:
      "Designed with a modern interface that makes property valuation simple, fast, and enjoyable.",
    icon: Sparkles,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            WHY PROP VALUE
          </span>

          <h2 className="mt-6 text-5xl font-bold text-primary">
            Built to Help You Make
            Better Property Decisions
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our goal is to provide clear, transparent, and realistic property
            estimates for DHA Multan using a professional and easy-to-use
            platform.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {reasons.map((reason, index) => {

            const Icon = reason.icon;

            return (

              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-2xl"
              >

                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg transition-transform duration-300 group-hover:rotate-6">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-primary">
                  {reason.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {reason.description}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}