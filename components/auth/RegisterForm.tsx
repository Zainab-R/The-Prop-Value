"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import PasswordInput from "./PasswordInput";

import {
  registerSchema,
  RegisterInput,
} from "@/lib/validations/register";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    try {
      setLoading(true);

      await axios.post("/api/auth/register", data);

      toast.success("Account created successfully!");

      reset();

      router.push("/login");
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Something went wrong.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Name */}

      <div>
        <input
          placeholder="Full Name"
          {...register("name")}
          className="w-full rounded-xl border p-4 outline-none focus:border-orange-500"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}

      <div>
        <input
          placeholder="Email Address"
          type="email"
          {...register("email")}
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

      {/* Confirm Password */}

      <div>
        <PasswordInput
          register={register}
          name="confirmPassword"
          placeholder="Confirm Password"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className="btn-anim w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-orange-500"
        >
          Login
        </Link>
      </div>
    </form>
  );
}