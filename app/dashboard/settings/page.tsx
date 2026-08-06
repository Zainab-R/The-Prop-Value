"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#071A3D]">
          Settings
        </h1>

        <p className="mt-2 text-base text-gray-500">
          Manage your account settings.
        </p>
      </div>

      {/* Change Password Card */}
      <div className="w-full max-w-4xl rounded-2xl bg-white p-10 shadow-md">
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-base outline-none focus:border-[#123A6D]"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#071A3D]">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-base outline-none focus:border-[#123A6D]"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#071A3D]">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-base outline-none focus:border-[#123A6D]"
            />
          </div>

          {/* Button */}
          <button
            className="mt-2 w-full rounded-xl bg-orange-500 py-4 text-base font-bold text-white transition hover:bg-orange-600"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}