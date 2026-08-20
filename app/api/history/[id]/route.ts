import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  req: Request,
  { params }: RouteProps
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const estimate = await prisma.estimate.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!estimate) {
    return NextResponse.json(
      { message: "Estimate not found" },
      { status: 404 }
    );
  }

  await prisma.estimate.delete({
    where: {
      id: estimate.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}