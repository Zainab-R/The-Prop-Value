"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMarketRate(data: {
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}) {
  if (
    !data.sector ||
    !data.propertyType ||
    !data.propertySize ||
    data.basePrice <= 0
  ) {
    throw new Error("Invalid market rate data.");
  }

  await prisma.marketRate.create({
    data: {
      sector: data.sector,
      propertyType: data.propertyType,
      propertySize: data.propertySize,
      basePrice: data.basePrice,
    },
  });

  revalidatePath("/admin/market-rates");

  return { success: true };
}

export async function updateMarketRate(data: {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}) {
  if (
    !data.id ||
    !data.sector ||
    !data.propertyType ||
    !data.propertySize ||
    data.basePrice <= 0
  ) {
    throw new Error("Invalid market rate data.");
  }

  await prisma.marketRate.update({
    where: {
      id: data.id,
    },
    data: {
      sector: data.sector,
      propertyType: data.propertyType,
      propertySize: data.propertySize,
      basePrice: data.basePrice,
    },
  });

  revalidatePath("/admin/market-rates");

  return { success: true };
}

export async function deleteMarketRate(id: string) {
  if (!id) {
    throw new Error("Invalid market rate.");
  }

  await prisma.marketRate.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/market-rates");

  return { success: true };
}