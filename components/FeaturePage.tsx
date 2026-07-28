import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Benefit {
  title: string;
}

interface FeaturePageProps {
  title: string;
  subtitle: string;
  heroIcon: React.ReactNode;
  highlights: Highlight[];
  benefits: Benefit[];
  backgroundImage: string;
}

export default function FeaturePage({
  title,
  subtitle,
  heroIcon,
  highlights,
  benefits,
  backgroundImage,
}: FeaturePageProps) {
  return (
    <main className="bg-white">

      <section
  className="relative bg-cover bg-center bg-no-repeat text-white"
  style={{
    backgroundImage: `url(${backgroundImage})`,
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-[#0B1F3A]/70"></div>

  <div className="relative mx-auto max-w-7xl px-6 py-24">

    <div className="flex items-center gap-6">

      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-500 text-white shadow-xl">
        {heroIcon}
      </div>

      <div>
        <h1 className="text-5xl font-bold">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-slate-100">
          {subtitle}
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white px-7 py-4 font-semibold transition hover:bg-white hover:text-[#0B1F3A]"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>
        </div>

      </div>

    </div>

  </div>
</section>

      {/* Benefits */}

      <section className="bg-slate-50 py-20">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-12 text-center text-4xl font-bold text-slate-900">
            Benefits
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {benefits.map((item) => (

              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
                  ✓
                </div>

                <p className="text-lg font-medium text-slate-700">
                  {item.title}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

       <section className="bg-[#0B1F3A] text-white">


        <div className="mx-auto max-w-6xl px-6 py-24 text-center">

          <h2 className="text-4xl font-bold text-white">
            Ready to Estimate Your Property?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Get an accurate estimate based on DHA Multan market pricing,
            location factors, and construction insights.
          </p>

         

        </div>

      </section>

    </main>
  );
}