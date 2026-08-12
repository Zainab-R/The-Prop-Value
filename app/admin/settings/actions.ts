"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function updateAdminProfile(
  name: string,
  email: string
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("You must be logged in.");
  }

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  if (!userId || role !== "ADMIN") {
    throw new Error("Unauthorized.");
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    throw new Error("Name is required.");
  }

  if (!trimmedEmail) {
    throw new Error("Email is required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: trimmedEmail,
      NOT: {
        id: userId,
      },
    },
  });

  if (existingUser) {
    throw new Error(
      "This email address is already being used."
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: trimmedName,
      email: trimmedEmail,
    },
  });

  return {
    success: true,
    message: "Profile updated successfully.",
  };
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("You must be logged in.");
  }

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  if (!userId || role !== "ADMIN") {
    throw new Error("Unauthorized.");
  }

  if (!currentPassword) {
    throw new Error("Current password is required.");
  }

  if (!newPassword) {
    throw new Error("New password is required.");
  }

  if (!confirmPassword) {
    throw new Error("Please confirm your new password.");
  }

  if (newPassword.length < 8) {
    throw new Error(
      "New password must be at least 8 characters long."
    );
  }

  if (newPassword !== confirmPassword) {
    throw new Error(
      "New password and confirmation do not match."
    );
  }

  if (currentPassword === newPassword) {
    throw new Error(
      "New password must be different from your current password."
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || !user.password) {
    throw new Error(
      "Password authentication is not available for this account."
    );
  }

  const passwordMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Password changed successfully.",
  };
}