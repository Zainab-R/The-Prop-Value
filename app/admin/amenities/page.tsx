import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

import AmenityManager from "./AmenityManager";

export const metadata: Metadata = {
  title: "Amenities | Prop Value",
};

export default async function AmenitiesPage() {
  const amenities = await prisma.amenityRate.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const formattedAmenities = amenities.map((amenity) => ({
    id: amenity.id,
    name: amenity.name,
    value: Number(amenity.value),
  }));

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#173F73]">
          Amenities
        </h1>

        <p className="mt-2 text-base text-slate-500">
          Manage amenities and their valuation rates.
        </p>
      </div>

      {/* Amenities Manager */}
      <AmenityManager
        initialAmenities={formattedAmenities}
      />
    </div>
  );
}