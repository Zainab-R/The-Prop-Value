import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { CalendarDays, Hash } from "lucide-react";

import PropertyDetailsCard from "@/components/valuation/PropertyDetailsCard";
import ValuationFactorsCard from "@/components/valuation/ValuationFactorsCard";
import PrintButton from "@/components/reports/PrintButton";
import { parseSizeToMarla } from "@/lib/propertyOptions";
import type { ValuationBreakdownEntry } from "@/lib/valuation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valuation Report | Prop Value",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ValuationReportPage({ params }: PageProps) {
  const { id } = await params;

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
    where: { id, userId: user.id },
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
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl space-y-6 px-4 print:max-w-none print:space-y-4 print:px-0">
        <div className="no-print flex justify-end">
          <PrintButton />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm print:rounded-none print:p-6 print:shadow-none">
          {/* Branding header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/logo.jpeg"
                alt="Prop Value"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <p className="text-lg font-bold text-primary">
                  The Prop <span className="text-accent">Value</span>
                </p>
                <p className="text-xs text-slate-500">DHA Multan Property Valuation</p>
              </div>
            </div>

            <div className="text-right text-sm text-slate-500">
              <p className="flex items-center justify-end gap-1.5">
                <CalendarDays size={14} />
                {new Date(estimate.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-1 flex items-center justify-end gap-1.5">
                <Hash size={14} />
                {valuationId}
              </p>
            </div>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-primary">
            Property Valuation Report
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {estimate.propertyType} — Sector {estimate.sector}
            {estimate.villaType ? ` — ${estimate.villaType}` : ""} —{" "}
            {estimate.propertySize}
          </p>

          {/* Value summary */}
          <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Estimated Value
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                PKR {estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Estimated Range
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                PKR {estimatedMin.toLocaleString()} – {estimatedMax.toLocaleString()}
              </p>
            </div>

            {pricePerMarla && (
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Estimated Price
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  PKR {pricePerMarla.toLocaleString()} / Marla
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <PropertyDetailsCard
              estimate={estimate}
              className="rounded-2xl border border-slate-200 p-5"
            />

            <ValuationFactorsCard
              breakdown={breakdown}
              legacyAppliedFactors={legacyAppliedFactors}
              className="rounded-2xl border border-slate-200 p-5"
            />
          </div>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
            <strong>Disclaimer:</strong> This report is a system-generated
            estimate based on configured DHA Multan sector pricing and the
            property details provided. It is not a certified professional
            valuation, appraisal, or legal document, and should not be relied
            upon as one. For a legally binding valuation, consult a licensed
            property valuator.
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Generated by Prop Value — propvalue.pk
          </p>
        </div>
      </div>
    </div>
  );
}
