"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

interface VerifyEmailFormProps {
  initialEmail: string;
}

export default function VerifyEmailForm({ initialEmail }: VerifyEmailFormProps) {
  const router = useRouter();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  if (!initialEmail) {
    return (
      <div className="text-center">
        <p className="text-slate-600">
          We couldn&apos;t find an email address to verify. Please register
          again to receive a new code.
        </p>

        <Link
          href="/register"
          className="btn-anim mt-6 inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Back to Register
        </Link>
      </div>
    );
  }

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    e.preventDefault();
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < OTP_LENGTH; i++) {
        next[i] = pasted[i] ?? "";
      }
      return next;
    });

    const lastFilledIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputsRef.current[lastFilledIndex]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const code = digits.join("");

    if (code.length !== OTP_LENGTH) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/auth/verify-otp", {
        email: initialEmail,
        code,
      });

      toast.success("Email verified! You can now log in.");

      router.push("/login");
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Something went wrong.";

      toast.error(message);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      setResendLoading(true);

      await axios.post("/api/auth/resend-otp", { email: initialEmail });

      toast.success("A new code has been sent to your email.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Something went wrong.";

      toast.error(message);
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-500">
        Code sent to <span className="font-semibold text-primary">{initialEmail}</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6"
      >
        <div className="flex justify-between gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-14 w-12 rounded-xl border border-slate-300 text-center text-2xl font-bold outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:w-14"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-anim w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading || cooldown > 0}
          className="font-semibold text-orange-500 hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
        </button>
      </div>
    </div>
  );
}
