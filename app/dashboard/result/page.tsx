import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import {
  Calculator,
  GitCompareArrows,
  History,
  Sparkles,
  CalendarDays,
  Hash,
  FileDown,
} from "lucide-react";
import FadeInUp from "@/components/shared/FadeInUp";
import SaveToggleButton from "@/components/dashboard/result/SaveToggleButton";
import PropertyDetailsCard from "@/components/valuation/PropertyDetailsCard";
import ValuationFactorsCard from "@/components/valuation/ValuationFactorsCard";
import { parseSizeToMarla } from "@/lib/propertyOptions";
import type { ValuationBreakdownEntry } from "@/lib/valuation";

interface PageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Valuation Result | Prop Value",
};

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

  // Estimates created after this feature shipped carry a snapshot of
  // exactly what was applied and by how much, taken at creation time
  // (so it stays accurate even if an admin later changes a rate).
  // Older estimates fall back to a flat list with no magnitude.
  const breakdown = Array.isArray(estimate.breakdown)
    ? (estimate.breakdown as unknown as ValuationBreakdownEntry[])
    : null;

  const legacyAppliedFactors = [
    estimate.cornerPlot && "Corner Plot",
    estimate.parkFacing && "Park Facing",
    estimate.mainBoulevard && "Main Boulevard",
    estimate.constructionStatus === "Ready" && "Ready to Move",
    estimate.luxuryLevel && `${estimate.luxuryLevel} Finish`,
    ...amenities,
  ].filter(Boolean) as string[];

  const marlaSize = parseSizeToMarla(estimate.propertySize);
  const pricePerMarla = marlaSize ? Math.round(estimatedValue / marlaSize) : null;
  const valuationId = `PV-${estimate.id.slice(-8).toUpperCase()}`;

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
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
            <Sparkles size={16} className="text-accent-light" />
            Estimated Market Value
          </div>

          <SaveToggleButton estimateId={estimate.id} initialSaved={estimate.isSaved} />
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

        {pricePerMarla && (
          <p className="mt-1 text-blue-100">
            Estimated price:{" "}
            <span className="font-semibold text-white">
              PKR {pricePerMarla.toLocaleString()} / Marla
            </span>
          </p>
        )}

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

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/15 pt-4 text-sm text-blue-200">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            {new Date(estimate.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Hash size={14} />
            {valuationId}
          </span>
        </div>
      </div>
      </FadeInUp>

      <FadeInUp delay={0.14}>
      <div className="grid gap-6 md:grid-cols-2">
        <PropertyDetailsCard estimate={estimate} />

        <ValuationFactorsCard
          breakdown={breakdown}
          legacyAppliedFactors={legacyAppliedFactors}
        />
      </div>
      </FadeInUp>

      {/* Next actions */}
      <FadeInUp delay={0.2}>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-5 font-semibold text-primary">What&apos;s Next?</h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href={`/reports/${estimate.id}`}
            target="_blank"
            className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FileDown size={20} />
            </div>
            <span className="font-medium text-slate-700">Download Report</span>
          </Link>

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
