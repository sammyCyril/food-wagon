import express from "express";

import {
  createOrder,
  getAllOrders,
  getMyOrder,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/order.controller";
import { adminOnly, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, createOrder);

router.get( "/", protect, getMyOrders);

router.get("/admin", protect, adminOnly, getAllOrders);

router.get("/:id", protect, getMyOrder);

router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);





export default router;