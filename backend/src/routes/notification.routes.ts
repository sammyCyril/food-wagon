import express from "express";
import { adminOnly, protect } from "../middleware/auth.middleware";
import { getNotifications, getUnreadCount } from "../controllers/notification.controller";

const router = express.Router();

router.get(
  "/",
  protect,
  adminOnly,
  getNotifications
);

router.get(
  "/unread-count",
  protect,
  adminOnly,
  getUnreadCount
);

export default router;