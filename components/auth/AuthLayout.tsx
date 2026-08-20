"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left */}
        <div className="hidden bg-primary lg:flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <br />
            Prop Value
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-8">
            Estimate property values in DHA Multan with
            confidence using intelligent valuation models.
          </p>

          <div className="mt-12 space-y-5">
            <div>✔ Secure Authentication</div>
            <div>✔ Smart Property Estimation</div>
            <div>✔ Saved Estimate History</div>
            <div>✔ Interactive Dashboard</div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
            <Link
              href="/"
              className="text-sm text-orange-500 hover:underline"
            >
              ← Back to Home
            </Link>

            <h2 className="mt-6 text-3xl font-bold text-primary">
              {title}
            </h2>

            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}