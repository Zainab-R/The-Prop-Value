"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  Home,
  MapPinned,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Building2,
} from "lucide-react";

const features = [
  {
    title: "Smart Valuation",
    description:
      "Estimate property prices using configurable market rules, current sector rates, and detailed property information for accurate and reliable results.",
    icon: Home,
    link: "/features/smart-valuation",
  },
  {
    title: "Location Intelligence",
    description:
      "Evaluate sectors, blocks, corner plots, boulevard locations, and nearby amenities to understand how location influences property value.",
    icon: MapPinned,
    link: "/features/location-intelligence",
  },
  {
    title: "Detailed Analysis",
    description:
      "View a complete breakdown of the factors that increased or decreased the estimated value, ensuring full transparency.",
    icon: BarChart3,
    link: "/features/detailed-analysis",
  },
  {
    title: "Construction Insights",
    description:
      "Compare plot values, under-construction homes, and completed luxury houses using intelligent construction-based analysis.",
    icon: Building2,
    link: "/features/construction-insights",
  },
  {
    title: "Transparent Estimates",
    description:
      "Every valuation includes a clear explanation of pricing, adjustments, and calculation methods for complete confidence.",
    icon: ShieldCheck,
    link: "/features/transparent-estimates",
  },
  {
    title: "Admin Managed Pricing",
    description:
      "Sector prices and adjustment factors are managed through the admin panel, allowing market updates without changing application code.",
    icon: Home,
    link: "/features/admin-managed-pricing",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            FEATURES
          </span>

          <h2 className="mt-6 text-5xl font-bold text-primary">
            Everything You Need
            <br />
            for Accurate Property Estimates
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Prop Value combines configurable pricing,
            property intelligence, and modern technology
            to help users understand realistic property costs.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: .5,
                }}
                whileHover={{
                  y: -10,
                }}
                className="
                group
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:shadow-2xl
                "
              >

                <div
                  className="
                  mb-8
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-orange-500
                  to-orange-400
                  shadow-lg
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                  "
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-primary">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {feature.description}
                </p>
<Link
  href={feature.link}
  className="
    mt-8
    flex
    items-center
    gap-2
    font-semibold
    text-orange-500
    transition-all
    group-hover:gap-4
  "
>
  Learn More

  <ArrowRight className="h-4 w-4" />
</Link>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}