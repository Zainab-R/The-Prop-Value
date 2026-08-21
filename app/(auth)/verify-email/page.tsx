import AuthLayout from "@/components/auth/AuthLayout";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

interface PageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { email } = await searchParams;

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the 6-digit code we sent to your email address."
    >
      <VerifyEmailForm initialEmail={email ?? ""} />
    </AuthLayout>
  );
}
