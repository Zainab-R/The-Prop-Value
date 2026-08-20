import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/validations/profile";
import { ZodError } from "zod";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const data = updateProfileSchema.parse(body);

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const emailChanged = data.email !== currentUser.email;

    if (emailChanged) {
      const existing = await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true },
      });

      if (existing && existing.id !== currentUser.id) {
        return NextResponse.json(
          { message: "This email address is already in use." },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: data.name,
        email: data.email,
        // Changing the email invalidates any prior verification.
        ...(emailChanged ? { emailVerified: null } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.errors[0]?.message ?? "Invalid input.", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Profile update failed:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}