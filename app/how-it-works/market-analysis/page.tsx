import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  LineChart,
  MapPinned,
  TrendingUp,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Collect Property Information",
    description:
      "Our valuation engine begins by reviewing the details you provided, including your property's location, type, size, construction status, luxury level, and amenities. This information forms the foundation of the valuation process.",
  },
  {
    number: "02",
    title: "Evaluate the Location",
    description:
      "Location is one of the most significant factors in determining property value. The system evaluates the selected sector and block, accessibility, nearby facilities, road network, and the overall desirability of the location within DHA Multan.",
  },
  {
    number: "03",
    title: "Compare Similar Properties",
    description:
      "The engine compares your property with similar properties that share comparable characteristics such as property type, size, construction status, and available features. This comparison helps estimate a realistic market value.",
  },
  {
    number: "04",
    title: "Apply Current Market Rates",
    description:
      "Configurable sector rates and prevailing market trends are applied to your property. These rates are continuously maintained to reflect differences in demand and pricing across various sectors of DHA Multan.",
  },
  {
    number: "05",
    title: "Calculate Property Adjustments",
    description:
      "Additional adjustments are made based on property-specific characteristics such as corner location, boulevard access, park facing, luxury level, solar installation, and other premium features that influence the final estimate.",
  },
  {
    number: "06",
    title: "Generate the Estimated Value",
    description:
      "After completing the analysis, the valuation engine calculates an estimated market value along with a price range and highlights the major factors that contributed to the final estimate.",
  },
];

export default function MarketAnalysisPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
    <section className="relative h-[500px] overflow-hidden">
  {/* Background Image */}
  <Image
    src="/images/market-analysis.jpg"
    alt="Market Analysis"
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
        STEP 02
      </span>

      <div className="mt-8 flex justify-center">
        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
          <LineChart className="h-14 w-14 text-orange-400" />
        </div>
      </div>

      <h1 className="mt-8 text-5xl font-bold text-white md:text-6xl">
        Market Analysis
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
        Our intelligent valuation engine analyzes market trends, sector demand,
        property characteristics, and comparable properties to calculate a
        realistic market value for your property in DHA Multan.
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

      {/* Process */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-4xl font-bold text-[#102A43]">
            How Market Analysis Works
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600">
            Every valuation is based on a detailed analysis of your property's
            characteristics and current market conditions to ensure a reliable
            and transparent estimate.
          </p>

          <div className="mt-16 space-y-12">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border-l-4 border-orange-500 pl-8"
              >
                <span className="text-sm font-semibold tracking-wide text-orange-500">
                  STEP {step.number}
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[#102A43]">
                  {step.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
            
      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#102A43] to-[#1E3A5F] px-10 py-16 text-center shadow-2xl">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-300">
              NEXT STEP
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white">
              Ready to View Your Estimate?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              After analyzing your property's details and market conditions,
              the next step is to view the estimated market value along with
              the factors that influenced the calculation.
            </p>

            
          </div>
        </div>
      </section>
    </main>
  );
}