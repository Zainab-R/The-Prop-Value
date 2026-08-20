"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guards";

export async function createMarketRate(data: {
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
  villaType?: string;
}) {
  await requireAdmin();

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
      villaType: data.villaType || null,
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
  villaType?: string | null;
}) {
  await requireAdmin();

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
      villaType: data.villaType || null,
    },
  });

  revalidatePath("/admin/market-rates");

  return { success: true };
}

export async function deleteMarketRate(id: string) {
  await requireAdmin();

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