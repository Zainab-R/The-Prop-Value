"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/guards";
import { revalidatePath } from "next/cache";

export async function getEstimateDetail(id: string) {
  await requireAdmin();

  const estimate = await prisma.estimate.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  if (!estimate) {
    throw new Error("Estimate not found.");
  }

  return {
    ...estimate,
    estimatedMin: Number(estimate.estimatedMin),
    estimatedMax: Number(estimate.estimatedMax),
  };
}

export async function deleteEstimateAsAdmin(id: string) {
  await requireAdmin();

  await prisma.estimate.delete({ where: { id } });

  revalidatePath("/admin/estimates");
  revalidatePath("/admin");

  return { success: true, message: "Estimate deleted." };
}
