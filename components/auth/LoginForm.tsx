"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  async function onSubmit(data: LoginInput) {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/auth/login",
        data
      );

      toast.success(response.data.message);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
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

      <button
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
      >
        {loading ? "Signing In..." : "Login"}
      </button>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-orange-500"
        >
          Register
        </Link>
      </div>
    </form>
  );
}