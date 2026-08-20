import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/register";
import { checkRateLimit, getClientIp } from "@/lib/utils/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = checkRateLimit(`register:${ip}`, 5, 10 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many registration attempts. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      12
    );

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.",
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
  } catch (error) {
    console.error(error);

    // Zod validation errors
    if (error instanceof ZodError) {
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