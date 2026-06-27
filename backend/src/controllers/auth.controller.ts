import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import Order from "../models/order.model";
import Notification from "../models/notification.model";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      city,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });

      return;
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
       phone,
      city,
      password: hashedPassword,
    });

    await Notification.create({
      title: "New Customer",
      message: `${firstName} ${lastName} joined`,
      type: "customer",
    });

    res.status(201).json({
      message:
        "Account created successfully",
      user,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid credentials",
      });

      return;
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      res.status(400).json({
        message: "Invalid credentials",
      });

      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  city: user.city,
  role: user.role,
},
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// 

export const getUsers = async ( _req: Request, res: Response): Promise<void> => {
  try {

    const users = await User.find()
      .select("-password");

    const customers = await Promise.all(
      users.map(async (user) => {

        const orders = await Order.find({
          user: user._id,
        });

        return {
          _id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone || "",
          city: user.city || "",
          status:
  orders.length > 0
    ? "Active"
    : "Inactive",
          orders: orders.length,
          totalSpend: orders.reduce(
            (sum, order) =>
              sum + order.totalAmount,
            0
          ),
  //         totalSpend: orders
  // .filter(
  //   (order) => order.paymentStatus === "Paid"
  // )
  // .reduce(
  //   (sum, order) => sum + order.totalAmount,
  //   0
  // ),
          joined: user.createdAt,
        };

      })
    );

    res.status(200).json(customers);

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};