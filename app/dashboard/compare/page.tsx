import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import CompareSelector from "@/components/dashboard/compare/CompareSelector";
import FadeInUp from "@/components/shared/FadeInUp";

export const metadata: Metadata = {
  title: "Compare Properties | Prop Value",
};

export default async function ComparePropertiesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const estimates = await prisma.estimate.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      sector: true,
      propertyType: true,
      propertySize: true,
      estimatedMin: true,
      estimatedMax: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  const formattedEstimates = estimates.map((estimate: (typeof estimates)[number]) => ({
    id: estimate.id,
    sector: estimate.sector,
    propertyType: estimate.propertyType,
    propertySize: estimate.propertySize,
    estimatedMin: estimate.estimatedMin.toString(),
    estimatedMax: estimate.estimatedMax.toString(),
  }));

  return (
    <FadeInUp>
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Compare Properties
      </h1>

      <CompareSelector estimates={formattedEstimates} />
    </div>
    </FadeInUp>
  );
}