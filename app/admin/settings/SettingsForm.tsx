"use client";

import { useState } from "react";
import {
  CheckCircle2,
  LockKeyhole,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  updateAdminProfile,
  changeAdminPassword,
} from "./actions";

type SettingsFormProps = {
  initialName: string;
  initialEmail: string;
  role: string;
};

export default function SettingsForm({
  initialName,
  initialEmail,
  role,
}: SettingsFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [savingProfile, setSavingProfile] =
    useState(false);
  const [changingPassword, setChangingPassword] =
    useState(false);

  // Update profile
  const handleProfileSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    setSavingProfile(true);

    try {
      const result = await updateAdminProfile(
        name,
        email
      );

      toast.success(result.message);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to update profile.";

      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  };

  // Change password
  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "New password and confirmation do not match."
      );
      return;
    }

    setChangingPassword(true);

    try {
      const result = await changeAdminPassword(
        currentPassword,
        newPassword,
        confirmPassword
      );

      toast.success(result.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to change password.";

      toast.error(message);
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= PROFILE ================= */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserRound size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#173F73]">
                Admin Profile
              </h2>

              <p className="text-sm text-slate-500">
                Manage your administrator account information.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleProfileSubmit}
          className="space-y-5 p-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="admin-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>

            <input
              id="admin-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
              disabled={savingProfile}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#173F73] focus:ring-2 focus:ring-[#173F73]/10 disabled:bg-slate-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              disabled={savingProfile}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#173F73] focus:ring-2 focus:ring-[#173F73]/10 disabled:bg-slate-50"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Account Role
            </label>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={19}
                  className="text-emerald-600"
                />

                <span className="text-sm font-medium text-slate-700">
                  Administrator
                </span>
              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {role}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Your administrator role cannot be changed from
              this page.
            </p>
          </div>

          {/* Save Profile */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingProfile}
              className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {savingProfile
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* ================= CHANGE PASSWORD ================= */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <LockKeyhole size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#173F73]">
                Change Password
              </h2>

              <p className="text-sm text-slate-500">
                Update your administrator account password.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-5 p-6"
        >
          {/* Current Password */}
          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Current Password
            </label>

            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              placeholder="Enter current password"
              disabled={changingPassword}
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#173F73] focus:ring-2 focus:ring-[#173F73]/10 disabled:bg-slate-50"
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              New Password
            </label>

            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              placeholder="Enter new password"
              disabled={changingPassword}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#173F73] focus:ring-2 focus:ring-[#173F73]/10 disabled:bg-slate-50"
            />

            <p className="mt-2 text-xs text-slate-500">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Confirm New Password
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Confirm new password"
              disabled={changingPassword}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#173F73] focus:ring-2 focus:ring-[#173F73]/10 disabled:bg-slate-50"
            />
          </div>

          {/* Update Password */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={changingPassword}
              className="flex items-center gap-2 rounded-xl bg-[#173F73] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#12345f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LockKeyhole size={18} />

              {changingPassword
                ? "Updating..."
                : "Update Password"}
            </button>
          </div>
        </form>
      </section>

      {/* ================= PLATFORM INFORMATION ================= */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-[#173F73]">
            Platform Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Information about your Prop Value administration
            platform.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Application
            </p>

            <p className="mt-1 text-base font-semibold text-slate-800">
              Prop Value
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Platform
            </p>

            <p className="mt-1 text-base font-semibold text-slate-800">
              DHA Multan Property Valuation
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Account Type
            </p>

            <p className="mt-1 text-base font-semibold text-slate-800">
              Administrator
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Security
            </p>

            <div className="mt-1 flex items-center gap-2 text-base font-semibold text-emerald-600">
              <CheckCircle2 size={18} />
              Protected
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}