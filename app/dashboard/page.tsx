import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="mx-auto max-w-7xl p-10">
      <h1 className="text-3xl font-bold text-[#102A43]">
        Welcome, {session.user?.name}
      </h1>

      <p className="mt-2 text-slate-600">
        {session.user?.email}
      </p>

      <div className="mt-8">
        <LogoutButton />
      </div>
    </main>
  );
}