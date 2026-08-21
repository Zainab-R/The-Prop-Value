import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Prop Value",
  description: "Create a free Prop Value account to start estimating DHA Multan property values.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start estimating property values today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}