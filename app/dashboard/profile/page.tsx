import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  User,
  Mail,
  Shield,
  Calendar,
  FileText,
  Pencil,
  Hash,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Profile | Prop Value",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-primary">
          User not found
        </h2>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      _count: {
        select: { estimates: true },
      },
    },
  });

  if (!user) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-primary">
          User not found
        </h2>
      </div>
    );
  }

  const nameParts: string[] = (user.name ?? "U")
  .trim()
  .split(/\s+/);

const initials = nameParts
  .map((word: string) => word.charAt(0))
  .join("")
  .slice(0, 2)
  .toUpperCase();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your account information.
          </p>
        </div>

        <Link
          href="/dashboard/profile/edit"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          <Pencil size={18} />
          Edit Profile
        </Link>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center">

          {/* Avatar */}
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "Profile"}
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100 text-4xl font-bold text-orange-500">
              {initials}
            </div>
          )}

          {/* User Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary">
              {user.name || "No Name"}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-slate-500">
              <Mail size={16} />
              {user.email}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-primary">
          Statistics
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <StatCard
            icon={<FileText size={22} />}
            title="Total Estimates"
            value={user._count.estimates.toString()}
          />

          <StatCard
            icon={<Calendar size={22} />}
            title="Member Since"
            value={user.createdAt.toLocaleDateString()}
          />
        </div>
      </section>

      {/* Personal Information */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-8 py-5">
          <h2 className="text-xl font-semibold text-primary">
            Personal Information
          </h2>
        </div>

        <div className="divide-y divide-slate-200">
          <InfoRow
            icon={<User size={18} />}
            label="Full Name"
            value={user.name || "Not Provided"}
          />

          <InfoRow
            icon={<Mail size={18} />}
            label="Email"
            value={user.email}
          />

          <InfoRow
            icon={<Shield size={18} />}
            label="Role"
            value={user.role}
          />

          <InfoRow
            icon={<Hash size={18} />}
            label="Account ID"
            value={user.id}
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-1 text-2xl font-bold text-primary">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-3 px-8 py-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="text-orange-500">
          {icon}
        </div>

        <span className="font-medium">
          {label}
        </span>
      </div>

      <span className="break-all font-semibold text-primary">
        {value}
      </span>
    </div>
  );
}