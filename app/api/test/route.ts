import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/register";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validated.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(
      validated.password,
      12
    );

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}