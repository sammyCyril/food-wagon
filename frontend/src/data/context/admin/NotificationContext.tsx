"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getNotifications, getUnreadCount } from "@/services/notifications";
import { Notification } from "../../type";

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  refreshNotifications: () => Promise<void>;
};

const NotificationContext =  createContext<NotificationContextType | null>( null );

export function NotificationProvider({ children,}: {
  children: React.ReactNode;
}) {
  const [unreadCount, setUnreadCount] = useState(0);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const refreshNotifications = async () => {
      try {
        const [ notificationsData,  unreadData, ] = await Promise.all([ 
          getNotifications(), getUnreadCount(),
        ]);

        // setNotifications(notificationsData);
        setNotifications( Array.isArray(notificationsData)
            ? notificationsData
            : []
        );
        setUnreadCount(unreadData.count);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    refreshNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
};