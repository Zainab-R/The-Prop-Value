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

  const estimate = await prisma.estimate.findUnique({
    where: {
      id,
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
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}