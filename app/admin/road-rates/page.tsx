import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import RoadRatesClient from "@/components/admin/RoadRatesClient";

export const metadata: Metadata = {
  title: "Road Rates | Prop Value",
};

export default async function RoadRatesPage() {
  const roadRates = await prisma.roadRate.findMany({
    orderBy: {
      roadType: "asc",
    },
  });

  return (
    <div className="w-full">
      <RoadRatesClient rates={roadRates} />
    </div>
  );
}