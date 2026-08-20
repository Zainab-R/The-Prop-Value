import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import {
  Calculator,
  GitCompareArrows,
  History,
  MapPin,
  Ruler,
  Building2,
  Gem,
  Sparkles,
  Home,
} from "lucide-react";
import FadeInUp from "@/components/shared/FadeInUp";

interface PageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function ResultPage({
  searchParams,
}: PageProps) {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    redirect("/login");
  }

  const estimate = await prisma.estimate.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!estimate) {
    notFound();
  }

  const estimatedMin = Number(estimate.estimatedMin);
  const estimatedMax = Number(estimate.estimatedMax);
  const estimatedValue = (estimatedMin + estimatedMax) / 2;

  const amenities = Array.isArray(estimate.amenities)
    ? (estimate.amenities as unknown as string[])
    : [];

  const appliedFactors = [
    estimate.cornerPlot && "Corner Plot",
    estimate.parkFacing && "Park Facing",
    estimate.mainBoulevard && "Main Boulevard",
    estimate.furnished && "Furnished",
    estimate.constructionStatus === "Ready" && "Ready to Move",
    estimate.luxuryLevel && `${estimate.luxuryLevel} Finish`,
    ...amenities,
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <FadeInUp>
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-primary">
          Property Valuation Report
        </h1>

        <p className="mt-2 text-slate-500">
          Here&apos;s the estimated market value for your property, based on
          current DHA Multan pricing data.
        </p>
      </div>
      </FadeInUp>

      {/* Hero value card */}
      <FadeInUp delay={0.08}>
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-8 text-white shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-10">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
          <Sparkles size={16} className="text-accent-light" />
          Estimated Market Value
        </div>

        <p className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          PKR {estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>

        <p className="mt-4 text-blue-100">
          Estimated range:{" "}
          <span className="font-semibold text-white">
            PKR {estimatedMin.toLocaleString()} – {estimatedMax.toLocaleString()}
          </span>
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            {estimate.propertyType}
          </span>
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            Sector {estimate.sector}
          </span>
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            {estimate.propertySize}
          </span>
          {estimate.villaType && (
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
              {estimate.villaType}
            </span>
          )}
        </div>
      </div>
      </FadeInUp>

      <FadeInUp delay={0.14}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Property details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-5 font-semibold text-primary">
            Property Details
          </h3>

          <dl className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500">
                <Building2 size={16} /> Property Type
              </dt>
              <dd className="font-medium text-slate-900">{estimate.propertyType}</dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500">
                <MapPin size={16} /> Sector
              </dt>
              <dd className="font-medium text-slate-900">{estimate.sector}</dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-slate-500">
                <Ruler size={16} /> Size
              </dt>
              <dd className="font-medium text-slate-900">{estimate.propertySize}</dd>
            </div>

            {estimate.villaType && (
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-slate-500">
                  <Home size={16} /> Housing Society
                </dt>
                <dd className="font-medium text-slate-900">{estimate.villaType}</dd>
              </div>
            )}

            {estimate.luxuryLevel && (
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-slate-500">
                  <Gem size={16} /> Luxury Level
                </dt>
                <dd className="font-medium text-slate-900">{estimate.luxuryLevel}</dd>
              </div>
            )}

            {estimate.constructionStatus && (
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Construction Status</dt>
                <dd className="font-medium text-slate-900">{estimate.constructionStatus}</dd>
              </div>
            )}

            {estimate.roadType && (
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Road Type</dt>
                <dd className="font-medium text-slate-900">{estimate.roadType}</dd>
              </div>
            )}

            {(estimate.bedrooms != null || estimate.bathrooms != null) && (
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Bedrooms / Bathrooms</dt>
                <dd className="font-medium text-slate-900">
                  {estimate.bedrooms ?? "-"} / {estimate.bathrooms ?? "-"}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Factors affecting the valuation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-5 font-semibold text-primary">
            Factors Affecting This Valuation
          </h3>

          {appliedFactors.length === 0 ? (
            <p className="text-sm text-slate-500">
              This estimate is based on the base market rate for this sector,
              property type, and size — no additional factors were selected.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {appliedFactors.map((factor) => (
                <span
                  key={factor}
                  className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
                >
                  {factor}
                </span>
              ))}
            </div>
          )}

          <p className="mt-5 text-xs text-slate-400">
            Each factor above contributed to adjusting the base sector
            market rate to arrive at your estimated value.
          </p>
        </div>
      </div>
      </FadeInUp>

      {/* Next actions */}
      <FadeInUp delay={0.2}>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-5 font-semibold text-primary">What&apos;s Next?</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/dashboard/estimate"
            className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Calculator size={20} />
            </div>
            <span className="font-medium text-slate-700">New Estimate</span>
          </Link>

          <Link
            href="/dashboard/compare"
            className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <GitCompareArrows size={20} />
            </div>
            <span className="font-medium text-slate-700">Compare Properties</span>
          </Link>

          <Link
            href="/dashboard/history"
            className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <History size={20} />
            </div>
            <span className="font-medium text-slate-700">View History</span>
          </Link>
        </div>
      </div>
      </FadeInUp>
    </div>
  );
}
