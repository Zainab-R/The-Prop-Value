"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLuxuryRate(
  level: string,
  multiplier: number
) {
  const name = level.trim();

  if (!name) {
    throw new Error("Luxury level is required.");
  }

  if (multiplier <= 0) {
    throw new Error("Multiplier must be greater than 0.");
  }

  const exists = await prisma.luxuryRate.findUnique({
    where: {
      level: name,
    },
  });

  if (exists) {
    throw new Error("Luxury level already exists.");
  }

  await prisma.luxuryRate.create({
    data: {
      level: name,
      multiplier,
    },
  });

  revalidatePath("/admin/luxury-rates");
}

export async function updateLuxuryRate(
  id: string,
  level: string,
  multiplier: number
) {
  const name = level.trim();

  if (!id || !id.trim()) {
    throw new Error("Luxury rate ID is required.");
  }

  if (!name) {
    throw new Error("Luxury level is required.");
  }

  if (multiplier <= 0) {
    throw new Error("Multiplier must be greater than 0.");
  }

  const exists = await prisma.luxuryRate.findFirst({
    where: {
      level: name,
      NOT: {
        id,
      },
    },
  });

  if (exists) {
    throw new Error("Luxury level already exists.");
  }

  await prisma.luxuryRate.update({
    where: {
      id,
    },
    data: {
      level: name,
      multiplier,
    },
  });

  revalidatePath("/admin/luxury-rates");
}

export async function deleteLuxuryRate(id: string) {
  if (!id || !id.trim()) {
    throw new Error("Luxury rate ID is required.");
  }

  try {
    await prisma.luxuryRate.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/luxury-rates");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting luxury rate:", error);

    throw new Error("Failed to delete luxury rate.");
  }
}