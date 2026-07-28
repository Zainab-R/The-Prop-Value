import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { estimateSchema } from "@/lib/validations/estimateSchema";
import { calculateEstimate } from "@/lib/valuation";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const validated = estimateSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const result = calculateEstimate(validated);

    const estimate = await prisma.estimate.create({
      data: {
        ...validated,

        userId: user.id,

        estimatedMin: result.estimatedMin,

        estimatedMax: result.estimatedMax,
      },
    });

    return NextResponse.json({
      estimate,
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}