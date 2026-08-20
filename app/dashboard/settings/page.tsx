"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "@/components/settings/changePassword";
import NotificationSettings from "./NotificationSettings";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const result = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );

      toast.success(result.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update password."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#071A3D]">
          Settings
        </h1>

        <p className="mt-2 text-base text-gray-500">
          Manage your account settings.
        </p>
      </div>

      {/* Change Password Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl rounded-2xl bg-white p-10 shadow-md"
      >
        <h2 className="mb-10 text-3xl font-bold text-[#071A3D]">
          Change Password
        </h2>

        <div className="space-y-7">
          {/* Current Password */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#071A3D]">
              Current Password
            </label>

            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-base outline-none focus:border-primary"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#071A3D]">
              New Password
            </label>

            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-base outline-none focus:border-primary"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#071A3D]">
              Confirm New Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-base outline-none focus:border-primary"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={saving}
            className="mt-2 w-full rounded-xl bg-orange-500 py-4 text-base font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>

      <NotificationSettings />
    </div>
  );
}
