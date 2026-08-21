import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { verifyOtpSchema } from "@/lib/validations/verifyOtp";
import { verifyOtpHash, OTP_MAX_ATTEMPTS } from "@/lib/otp";
import { checkRateLimit, getClientIp } from "@/lib/utils/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = checkRateLimit(`verify-otp:${ip}`, 10, 10 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, code } = verifyOtpSchema.parse(body);

    const pending = await prisma.pendingRegistration.findUnique({
      where: { email },
    });

    if (!pending) {
      return NextResponse.json(
        { success: false, message: "No pending registration found for this email." },
        { status: 404 }
      );
    }

    if (pending.otpExpiresAt < new Date()) {
      await prisma.pendingRegistration.delete({ where: { email } });
      return NextResponse.json(
        { success: false, message: "This code has expired. Please register again." },
        { status: 410 }
      );
    }

    if (pending.attempts >= OTP_MAX_ATTEMPTS) {
      await prisma.pendingRegistration.delete({ where: { email } });
      return NextResponse.json(
        {
          success: false,
          message: "Too many incorrect attempts. Please register again.",
        },
        { status: 429 }
      );
    }

    const codeMatches = await verifyOtpHash(code, pending.otpHash);

    if (!codeMatches) {
      await prisma.pendingRegistration.update({
        where: { email },
        data: { attempts: pending.attempts + 1 },
      });

      return NextResponse.json(
        { success: false, message: "Incorrect code. Please try again." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      await prisma.pendingRegistration.delete({ where: { email } });
      return NextResponse.json(
        { success: false, message: "This email is already registered." },
        { status: 409 }
      );
    }

    await prisma.$transaction([
      prisma.user.create({
        data: {
          name: pending.name,
          email: pending.email,
          password: pending.password,
          emailVerified: new Date(),
        },
      }),
      prisma.pendingRegistration.delete({ where: { email } }),
    ]);

    return NextResponse.json(
      { success: true, message: "Email verified. Your account has been created." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
