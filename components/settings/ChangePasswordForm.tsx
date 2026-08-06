"use client";

import { useState, useTransition } from "react";
import { changePassword } from "@/components/settings/changePassword";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        const res = await changePassword(
          currentPassword,
          newPassword,
          confirmPassword
        );

        setMessage(res.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      }
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-xl">
      <h2 className="text-2xl font-semibold mb-6">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Current Password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Confirm New Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-100 text-red-700 px-4 py-2">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-100 text-green-700 px-4 py-2">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}