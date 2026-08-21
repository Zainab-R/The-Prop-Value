import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/register";
import { checkRateLimit, getClientIp } from "@/lib/utils/rateLimit";
import { generateOtp, hashOtp, OTP_TTL_MS } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email/resend";

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

    const otp = generateOtp();
    const otpHash = await hashOtp(otp);

    // Hold the registration until the OTP is verified — no User row
    // is created yet. Re-registering with the same (still unverified)
    // email just issues a fresh code.
    await prisma.pendingRegistration.upsert({
      where: { email: validatedData.email },
      create: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        otpHash,
        otpExpiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
      update: {
        name: validatedData.name,
        password: hashedPassword,
        otpHash,
        otpExpiresAt: new Date(Date.now() + OTP_TTL_MS),
        attempts: 0,
      },
    });

    await sendOtpEmail(validatedData.email, validatedData.name, otp);

    return NextResponse.json(
      {
        success: true,
        message: "Verification code sent to your email.",
        email: validatedData.email,
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