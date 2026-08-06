"use client";

import { useState, useTransition } from "react";
import { changePassword } from "@/components/settings/changePassword";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const result = await changePassword(
          currentPassword,
          newPassword,
          confirmPassword
        );

        setSuccess(result.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err: any) {
        setError(err.message ?? "Something went wrong.");
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            placeholder="Enter current password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm New Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            placeholder="Confirm new password"
            required
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-600 px-4 py-3">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 text-green-600 px-4 py-3">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}