import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#123A6D]">
        Welcome, {session.user.name}
      </h1>

      <p className="text-slate-600">
        Welcome to Prop Value. From here you can:
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#123A6D]">
            New Property Estimate
          </h2>

          <p className="mt-2 text-slate-500">
            Calculate the estimated value of your property.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#123A6D]">
            Estimate History
          </h2>

          <p className="mt-2 text-slate-500">
            View your previous property valuations.
          </p>
        </div>
      </div>
    </div>
  );
}