import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { resendOtpSchema } from "@/lib/validations/verifyOtp";
import { generateOtp, hashOtp, OTP_TTL_MS } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email/resend";
import { checkRateLimit, getClientIp } from "@/lib/utils/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = checkRateLimit(`resend-otp:${ip}`, 3, 5 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email } = resendOtpSchema.parse(body);

    const pending = await prisma.pendingRegistration.findUnique({
      where: { email },
    });

    if (!pending) {
      return NextResponse.json(
        { success: false, message: "No pending registration found for this email." },
        { status: 404 }
      );
    }

    const otp = generateOtp();
    const otpHash = await hashOtp(otp);

    await prisma.pendingRegistration.update({
      where: { email },
      data: {
        otpHash,
        otpExpiresAt: new Date(Date.now() + OTP_TTL_MS),
        attempts: 0,
      },
    });

    await sendOtpEmail(pending.email, pending.name, otp);

    return NextResponse.json(
      { success: true, message: "A new code has been sent to your email." },
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
