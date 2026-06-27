import { Request, Response } from "express";
import Notification from "../models/notification.model";


export const getNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    const notifications =
      await Notification.find()
        .sort({ createdAt: -1 })
        .limit(20);

    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUnreadCount = async (
  req: Request,
  res: Response
) => {
  try {
    const count =
      await Notification.countDocuments({
        read: false,
      });

    res.json({ count });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};