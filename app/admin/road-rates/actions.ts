"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guards";

export async function createRoadRate(
  roadType: string,
  multiplier: number
) {
  await requireAdmin();

  const name = roadType.trim();

  if (!name) {
    throw new Error("Road type is required.");
  }

  if (!Number.isFinite(multiplier) || multiplier <= 0) {
    throw new Error("Multiplier must be greater than 0.");
  }

  const exists = await prisma.roadRate.findUnique({
    where: {
      roadType: name,
    },
  });

  if (exists) {
    throw new Error("This road type already exists.");
  }

  await prisma.roadRate.create({
    data: {
      roadType: name,
      multiplier,
    },
  });

  revalidatePath("/admin/road-rates");

  return {
    success: true,
  };
}

export async function updateRoadRate(
  id: string,
  roadType: string,
  multiplier: number
) {
  await requireAdmin();

  const name = roadType.trim();

  if (!id || !id.trim()) {
    throw new Error("Road rate ID is required.");
  }

  if (!name) {
    throw new Error("Road type is required.");
  }

  if (!Number.isFinite(multiplier) || multiplier <= 0) {
    throw new Error("Multiplier must be greater than 0.");
  }

  const exists = await prisma.roadRate.findFirst({
    where: {
      roadType: name,
      NOT: {
        id,
      },
    },
  });

  if (exists) {
    throw new Error("This road type already exists.");
  }

  await prisma.roadRate.update({
    where: {
      id,
    },
    data: {
      roadType: name,
      multiplier,
    },
  });

  revalidatePath("/admin/road-rates");

  return {
    success: true,
  };
}

export async function deleteRoadRate(id: string) {
  await requireAdmin();

  if (!id || !id.trim()) {
    throw new Error("Road rate ID is required.");
  }

  try {
    await prisma.roadRate.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/road-rates");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting road rate:", error);

    throw new Error("Failed to delete road rate.");
  }
}