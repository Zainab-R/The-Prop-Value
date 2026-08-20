"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Link from "next/link";

import PasswordInput from "./PasswordInput";

type LoginInput = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  async function onSubmit(data: LoginInput) {
    setLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login successful!");

    // Get the latest session (includes the user's role)
    const sessionResponse = await fetch("/api/auth/session");
    const session = await sessionResponse.json();

    if (session?.user?.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

    router.refresh();
    }

  async function handleGoogleLogin() {
    setGoogleLoading(true);

    await signIn("google", {
    callbackUrl: "/admin/redirect",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Google Login */}

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full rounded-xl border border-slate-300 bg-white py-4 font-semibold transition hover:bg-slate-50 disabled:opacity-60"
      >
        {googleLoading ? "Redirecting..." : "Continue with Google"}
      </button>

      {/* Divider */}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>

        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-slate-500">
            OR
          </span>
        </div>
      </div>

      {/* Email */}

      <div>
        <input
          type="email"
          placeholder="Email Address"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded-xl border p-4 outline-none focus:border-orange-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div>
        <PasswordInput
          register={register}
          name="password"
          placeholder="Password"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Login Button */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 py-4 font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
      >
        {loading ? "Signing In..." : "Login"}
      </button>

      {/* Register Link */}

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-orange-500 hover:underline"
        >
          Register
        </Link>
      </div>
    </form>
  );
}