"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guards";

export async function updateAdjustmentFactor(id: string, multiplier: number) {
  await requireAdmin();

  if (!id || !id.trim()) {
    throw new Error("Adjustment factor ID is required.");
  }

  if (multiplier <= 0) {
    throw new Error("Multiplier must be greater than 0.");
  }

  await prisma.adjustmentFactor.update({
    where: { id },
    data: { multiplier },
  });

  revalidatePath("/admin/adjustment-factors");
}
