"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  // Validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All fields are required.");
  }

  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match.");
  }

  // Get logged-in user
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized.");
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // Users signed in with Google won't have a password
  if (!user.password) {
    throw new Error(
      "This account uses Google Sign-In and cannot change its password."
    );
  }

  // Verify current password
  const passwordMatches = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("Current password is incorrect.");
  }

  // Prevent reusing same password
  const samePassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (samePassword) {
    throw new Error(
      "New password must be different from the current password."
    );
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  revalidatePath("/dashboard/settings");

  return {
    success: true,
    message: "Password updated successfully.",
  };
}