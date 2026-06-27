"use client";

import { Notification } from "@/data/type";

type Props = {
  notifications: Notification[];
};

export default function NotificationDropdown({
  notifications,
}: Props) {
  return (
    <div className="absolute right-0 top-12 z-50 w-80 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
  <div className="border-b p-4">
    <h3 className="font-semibold">
      Notifications
    </h3>
  </div>

  {notifications.length === 0 ? (
    <p className="p-6 text-center text-sm text-gray-500">
      No notifications yet
    </p>
  ) : (
    notifications.map((notification) => (
      <div
        key={notification._id}
        className="border-b px-4 py-3 hover:bg-gray-50"
      >
        <p className="text-sm">
          {notification.message}
        </p>
      </div>
    ))
  )}
</div>
  );
}