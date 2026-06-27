import express from "express";

import {
  getUsers,
    login,
  register,
} from "../controllers/auth.controller";
import { adminOnly, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(  "/users", protect, adminOnly, getUsers);

export default router;