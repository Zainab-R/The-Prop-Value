"use client";

import { useState } from "react";

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [estimateNotifications, setEstimateNotifications] = useState(true);
  const [marketUpdates, setMarketUpdates] = useState(false);

  const handleSave = () => {
    alert("Notification preferences will be saved in the next step.");
  };

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
            checked={emailNotifications}
            onChange={() =>
              setEmailNotifications(!emailNotifications)
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
            checked={estimateNotifications}
            onChange={() =>
              setEstimateNotifications(!estimateNotifications)
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
            checked={marketUpdates}
            onChange={() => setMarketUpdates(!marketUpdates)}
            className="h-5 w-5 accent-orange-500"
          />
        </label>

        <button
          onClick={handleSave}
          className="w-full mt-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}