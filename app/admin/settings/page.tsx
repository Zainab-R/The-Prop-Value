import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const userId = session.user.id;

  if (!userId || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const admin = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      role: true,
    },
  });

  if (!admin) {
    redirect("/login");
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#173F73]">
          Admin Settings
        </h1>

        <p className="mt-2 text-base text-slate-500">
          Manage your administrator account and platform
          settings.
        </p>
      </div>

      <SettingsForm
        initialName={admin.name ?? ""}
        initialEmail={admin.email}
        role={admin.role}
      />
    </div>
  );
}