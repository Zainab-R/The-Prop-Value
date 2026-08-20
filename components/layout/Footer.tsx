"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  BadgeCheck,
  Globe,
  Send,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <footer
      id="contact"
      className="bg-primary text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-16 lg:grid-cols-4">

          {/* Company */}
<div>
  <div className="flex items-center gap-4">
    <Image
      src="/logo/logo.jpeg"
      alt="Prop Value Logo"
      width={70}
      height={70}
      className="rounded-lg bg-white p-1"
    />

    <div>
      <h2 className="text-xl font-normal">
  <span className="text-white">The Prop </span>
  <span className="text-accent-light">Value</span>
</h2>

      <p className="text-lg text-slate-300">
        DHA Multan
      </p>
    </div>
  </div>

  <p className="mt-6 leading-8 text-slate-300">
    Prop Value helps users estimate the approximate cost of purchasing or
    constructing plots and houses in DHA Multan through transparent and
    intelligent property valuation.
  </p>

  <div className="mt-8 flex gap-4">
    <a
      href="#"
      className="rounded-xl bg-white/10 p-3 transition hover:bg-orange-500"
    >
      <Globe size={20} />
    </a>

    <a
      href="#"
      className="rounded-xl bg-white/10 p-3 transition hover:bg-orange-500"
    >
      <BadgeCheck size={20} />
    </a>

    <a
      href="#"
      className="rounded-xl bg-white/10 p-3 transition hover:bg-orange-500"
    >
      <Send size={20} />
    </a>
  </div>
</div>
     

          {/* Navigation */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Navigation
            </h3>

            <ul className="space-y-4 text-slate-300">

              <li>
                <Link href="/">
                  Home
                </Link>
              </li>

              <li>
                <a href="#features">
                  Features
                </a>
              </li>

              <li>
                <a href="#how">
                  How It Works
                </a>
              </li>

              <li>
                <a href="#faq">
                  FAQ
                </a>
              </li>

            </ul>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Product
            </h3>

            <ul className="space-y-4 text-slate-300">

              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/dashboard/estimate">
                      Estimate Property
                    </Link>
                  </li>

                  <li>
                    <Link href={dashboardHref}>
                      Dashboard
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/register">
                      Get Started
                    </Link>
                  </li>

                  <li>
                    <Link href="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Contact
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-3">

                <Mail className="mt-1 text-orange-400" />

                <div>

                  <p className="font-medium">
                    Email
                  </p>

                  <p className="text-slate-300">
                    hello@propvalue.pk
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <MapPin className="mt-1 text-orange-400" />

                <div>

                  <p className="font-medium">
                    Location
                  </p>

                  <p className="text-slate-300">
                    DHA Multan, Pakistan
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-6 text-center text-sm text-slate-400 md:flex-row">

            <p>
              © {new Date().getFullYear()} Prop Value. All rights reserved.
            </p>

           <div className="flex gap-8">

            <Link
            href="/privacy-policy"
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms-of-service"
            className="transition-colors hover:text-white"
          >
            Terms of Service
          </Link>

            </div>

            <p className="text-orange-400">
              Built for DHA Multan
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}