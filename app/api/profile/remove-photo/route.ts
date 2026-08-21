import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/utils/rateLimit";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { allowed } = checkRateLimit(
    `remove-photo:${session.user.email}`,
    10,
    10 * 60 * 1000
  );

  if (!allowed) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      image: null,
    },
  });

  return NextResponse.json({
    success: true,
  });
}