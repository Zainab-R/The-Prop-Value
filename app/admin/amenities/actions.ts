"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAmenity(
  name: string,
  value: number
) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Amenity name is required.");
  }

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Amenity value must be greater than 0.");
  }

  const existingAmenity = await prisma.amenityRate.findUnique({
    where: {
      name: trimmedName,
    },
  });

  if (existingAmenity) {
    throw new Error("An amenity with this name already exists.");
  }

  await prisma.amenityRate.create({
    data: {
      name: trimmedName,
      value,
    },
  });

  revalidatePath("/admin/amenities");
  revalidatePath("/admin");
}

export async function updateAmenity(
  id: string,
  name: string,
  value: number
) {
  if (!id) {
    throw new Error("Amenity ID is required.");
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Amenity name is required.");
  }

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Amenity value must be greater than 0.");
  }

  const existingAmenity = await prisma.amenityRate.findFirst({
    where: {
      name: trimmedName,
      NOT: {
        id,
      },
    },
  });

  if (existingAmenity) {
    throw new Error("Another amenity with this name already exists.");
  }

  await prisma.amenityRate.update({
    where: {
      id,
    },
    data: {
      name: trimmedName,
      value,
    },
  });

  revalidatePath("/admin/amenities");
  revalidatePath("/admin");
}

export async function deleteAmenity(id: string) {
  if (!id) {
    throw new Error("Amenity ID is required.");
  }

  await prisma.amenityRate.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/amenities");
  revalidatePath("/admin");
}