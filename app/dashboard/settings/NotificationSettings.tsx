"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getNotificationPreferences,
  updateNotifications,
  type NotificationPreferences,
} from "./updateNotifications";

const defaultPreferences: NotificationPreferences = {
  notifyEmail: true,
  notifyEstimate: true,
  notifyMarket: false,
};

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    defaultPreferences
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getNotificationPreferences()
      .then(setPreferences)
      .catch(() => toast.error("Failed to load notification preferences."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);

    try {
      await updateNotifications(preferences);
      toast.success("Notification preferences saved.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save notification preferences."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Notification Settings
      </h2>

      <div className="space-y-6">
        <label className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-500">
              Receive account-related emails.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.notifyEmail}
            onChange={() =>
              setPreferences((prev) => ({
                ...prev,
                notifyEmail: !prev.notifyEmail,
              }))
            }
            className="h-5 w-5 accent-orange-500"
          />
        </label>

        <label className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">
              Estimate Notifications
            </h3>
            <p className="text-sm text-gray-500">
              Notify me when my estimate is ready.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.notifyEstimate}
            onChange={() =>
              setPreferences((prev) => ({
                ...prev,
                notifyEstimate: !prev.notifyEstimate,
              }))
            }
            className="h-5 w-5 accent-orange-500"
          />
        </label>

        <label className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">
              Market Updates
            </h3>
            <p className="text-sm text-gray-500">
              Receive updates about DHA Multan market trends.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.notifyMarket}
            onChange={() =>
              setPreferences((prev) => ({
                ...prev,
                notifyMarket: !prev.notifyMarket,
              }))
            }
            className="h-5 w-5 accent-orange-500"
          />
        </label>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}
