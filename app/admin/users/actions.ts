"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/guards";
import { registerSchema } from "@/lib/validations/register";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}) {
  await requireAdmin();

  const validated = registerSchema.parse({
    ...data,
    confirmPassword: data.password,
  });

  const existing = await prisma.user.findUnique({
    where: { email: validated.email },
  });

  if (existing) {
    throw new Error("A user with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(validated.password, 12);

  await prisma.user.create({
    data: {
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  revalidatePath("/admin/users");

  return { success: true, message: "User created successfully." };
}

export async function updateUserRole(userId: string, role: "USER" | "ADMIN") {
  const session = await requireAdmin();

  if (session.user.id === userId && role !== "ADMIN") {
    throw new Error("You cannot remove your own admin access.");
  }

  if (role !== "USER" && role !== "ADMIN") {
    throw new Error("Invalid role.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin/users");

  return { success: true, message: "User role updated." };
}

export async function updateUserStatus(
  userId: string,
  status: "ACTIVE" | "SUSPENDED"
) {
  const session = await requireAdmin();

  if (session.user.id === userId && status === "SUSPENDED") {
    throw new Error("You cannot suspend your own account.");
  }

  if (status !== "ACTIVE" && status !== "SUSPENDED") {
    throw new Error("Invalid status.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { status },
  });

  revalidatePath("/admin/users");

  return { success: true, message: "User status updated." };
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin();

  if (session.user.id === userId) {
    throw new Error("You cannot delete your own account.");
  }

  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!target) {
    throw new Error("User not found.");
  }

  if (target.role === "ADMIN") {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });

    if (adminCount <= 1) {
      throw new Error("Cannot delete the last remaining admin.");
    }
  }

  await prisma.user.delete({ where: { id: userId } });

  revalidatePath("/admin/users");

  return { success: true, message: "User deleted." };
}
