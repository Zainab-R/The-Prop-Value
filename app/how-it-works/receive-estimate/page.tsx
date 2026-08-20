import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Gauge,
  BarChart3,
  Home,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Receive Your Estimate | Prop Value",
  description:
    "Get an instant estimated market value for your property, complete with a transparent breakdown of the factors behind the number.",
};

const estimateSteps = [
  {
    number: "01",
    title: "Estimated Price Range",
    description:
      "The valuation engine calculates a realistic minimum and maximum market value based on your property's characteristics, amenities, location, and current market trends within DHA Multan.",
    icon: BadgeDollarSign,
  },
  {
    number: "02",
    title: "Confidence Score",
    description:
      "Every estimate includes a confidence score that indicates how closely your property matches the available valuation data and comparable market information.",
    icon: Gauge,
  },
  {
    number: "03",
    title: "Key Value Factors",
    description:
      "The report highlights the primary factors influencing your property's value, including location, property type, size, construction status, and premium features.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Property Summary",
    description:
      "A summary of the details you entered is displayed so you can verify that the valuation is based on the correct property information.",
    icon: Home,
  },
  {
    number: "05",
    title: "Transparent Results",
    description:
      "Rather than providing a single figure, the valuation explains how the estimate was calculated, giving you greater confidence in the results.",
    icon: ShieldCheck,
  },
];

export default function ReceiveEstimatePage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
     <section className="relative h-[500px] overflow-hidden">
  {/* Background Image */}
  <Image
    src="/images/receive-estimate.jpg"
    alt="Receive Your Estimate"
    fill
    priority
    className="object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Hero Content */}
  <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center justify-center px-6 text-center">
    <div>
      <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-300 backdrop-blur">
        STEP 03
      </span>

      <div className="mt-8 flex justify-center">
        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
          <BadgeDollarSign className="h-14 w-14 text-orange-400" />
        </div>
      </div>

      <h1 className="mt-8 text-5xl font-bold text-white md:text-6xl">
        Receive Your Estimate
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
        After analyzing your property&apos;s details and current market conditions,
        our valuation engine instantly provides an estimated market value
        together with the key factors that influenced the calculation.
      </p>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Understanding Your Estimate */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              UNDERSTANDING YOUR ESTIMATE
            </span>

            <h2 className="mt-6 text-4xl font-bold text-primary">
              What&apos;s Included in Your Valuation
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Your estimate is more than just a price. It provides valuable
              insights into how your property&apos;s market value was calculated.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {estimateSteps.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="flex items-start gap-6 border-l-4 border-orange-500 pl-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                    <Icon className="h-7 w-7 text-orange-500" />
                  </div>

                  <div>
                    <span className="text-sm font-semibold tracking-wide text-orange-500">
                      STEP {item.number}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
        

            
                  {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-[#1E3A5F] px-10 py-16 text-center shadow-2xl">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-300">
              READY TO START?
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white">
              Get Your Property Valuation Today
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Enter your property details and receive an instant estimated
              market value powered by our intelligent valuation engine. The
              process is quick, transparent, and designed to help you better
              understand your property&apos;s worth in DHA Multan.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}