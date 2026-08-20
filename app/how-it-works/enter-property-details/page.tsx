import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ClipboardList,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enter Property Details | Prop Value",
  description:
    "Begin your property valuation by providing accurate details such as the location, property type, size, construction status, and amenities.",
};

export default function EnterPropertyDetailsPage() {
  const steps = [
    {
      title: "Select Sector & Block",
      description:
        "Choose the exact sector and block where your property is located in DHA Multan. The location plays a major role in determining its market value.",
    },
    {
      title: "Choose Property Type",
      description:
        "Select whether your property is a Residential Plot, Commercial Plot, House, or Shop. Different property types are valued differently.",
    },
    {
      title: "Enter Property Size",
      description:
        "Specify the size of your property, such as 5 Marla, 10 Marla, 1 Kanal, or any other available option.",
    },
    {
      title: "Select Construction Status",
      description:
        "Tell us whether the property is a vacant plot, under construction, or fully constructed.",
    },
    {
      title: "Choose Luxury Level",
      description:
        "Select the overall quality of the property. Standard, Premium, and Luxury properties receive different valuation adjustments.",
    },
    {
      title: "Add Property Features",
      description:
        "Select any features that apply to your property, such as Corner Plot, Main Boulevard, Park Facing, or Near Commercial Area.",
    },
    {
      title: "Select Amenities",
      description:
        "Choose available amenities like Solar Panels, Garden, Parking, Security System, Terrace, or Servant Quarter.",
    },
    {
      title: "Review Your Details",
      description:
        "Carefully review all the information you've entered to ensure it is complete and accurate before submitting.",
    },
    {
      title: "Receive Your Valuation",
      description:
        "Submit your information and our valuation engine will analyze the provided details to generate an estimated market value for your property.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden">
  {/* Background Image */}
  <Image
    src="/images/enter-property-details.jpg"
    alt="Enter Property Details"
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
        STEP 01
      </span>

      <div className="mt-8 flex justify-center">
        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
          <ClipboardList className="h-14 w-14 text-orange-400" />
        </div>
      </div>

      <h1 className="mt-8 text-5xl font-bold text-white md:text-6xl">
        Enter Property Details
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
        Begin your property valuation by providing accurate details such as the
        location, property type, size, construction status, and amenities. This
        information forms the foundation for a reliable market estimate.
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
 {/* Steps */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-4xl font-bold text-primary">
            Property Details Process
          </h2>

          <p className="mt-4 text-center text-slate-600">
            Follow these simple steps to provide the information required for an
            accurate property valuation.
          </p>

          <div className="mt-16 space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-6 border-l-4 border-orange-500 pl-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-8 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-primary to-[#1E3A5F] px-10 py-16 text-center shadow-xl">
          <CheckCircle className="mx-auto h-14 w-14 text-orange-400" />

          <h2 className="mt-6 text-4xl font-bold text-white">
            Ready to Estimate Your Property?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Once you&apos;ve gathered your property details, proceed to the valuation
            form and receive an instant estimated market value for your property
            in DHA Multan.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}