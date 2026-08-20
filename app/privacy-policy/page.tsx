import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Prop Value",
  description:
    "How Prop Value collects, uses, and protects the information you provide while using our property valuation platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <main
  className="min-h-screen bg-cover bg-center bg-fixed"
  style={{
    backgroundImage:
      "linear-gradient(160deg, var(--color-primary) 0%, #0B1F3A 60%, #081226 100%)",
  }}
>
      <div className="mx-auto max-w-5xl px-6 py-20">

  {/* Hero */}
  <div className="mb-12 text-center">
    <span className="inline-block rounded-full bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-300 backdrop-blur-sm">
      Legal Information
    </span>

    <h1 className="mt-6 text-5xl font-extrabold text-white lg:text-6xl">
      Privacy Policy
    </h1>
  </div>

        <div className="space-y-8 rounded-3xl border border-white/20 bg-white/95 p-10 shadow-2xl backdrop-blur-md">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">
              Introduction
            </h2>
            <p className="text-slate-600 leading-8">
              Prop Value values your privacy. This Privacy Policy explains
              how we collect, use, and protect the information you provide
              while using our property valuation platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">
              Information We Collect
            </h2>

            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Name and email address.</li>
              <li>Property details entered for valuation.</li>
              <li>Usage information to improve the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">
              How We Use Your Information
            </h2>

            <p className="text-slate-600 leading-8">
              Your information is used only to provide property valuation
              services, improve user experience, and maintain platform
              security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">
              Data Protection
            </h2>

            <p className="text-slate-600 leading-8">
              We implement appropriate security measures to protect your
              information from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">
              Contact
            </h2>

            <p className="text-slate-600 leading-8">
              If you have questions regarding this Privacy Policy, please
              contact the Prop Value team.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}