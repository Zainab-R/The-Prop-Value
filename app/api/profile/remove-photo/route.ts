import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
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