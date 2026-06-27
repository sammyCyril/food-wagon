import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Order from "../models/order.model";
import User from "../models/user.model";
import Product from "../models/product.model";
import Notification from "../models/notification.model";

// CREATE ORDER
export const createOrder = async ( req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone, address, items, totalAmount,  paymentMethod, } = req.body;

    const user = await User.findById(
      req.user?.userId
);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  for (const item of items) {
  const product = await Product.findById(item.productId);

  if (!product) {
    res.status(404).json({
      message: `${item.name} not found`,
    });
    return;
  }

  if (product.stock < item.quantity) {
    res.status(400).json({
      message: `${item.name} is out of stock`,
    });
    return;
  }

  product.stock -= item.quantity;

  if (product.stock <= 0) {
    product.status = "Out Of Stock";
  } else if (product.stock <= 10) {
    product.status = "Low Stock";
  } else {
    product.status = "Active";
  }

  await product.save();
}
const customerName = `${user.firstName} ${user.lastName}`;

const order = await Order.create({
  user: req.user?.userId,
  customerName,
  address,
  items,
  totalAmount,
  paymentMethod,
 paymentStatus: "Pending",
  email: user.email,
  
});
await Notification.create({
  title: "New Order",
  message: `${customerName} placed a new order`,
  type: "order",
});



    res.status(201).json(order);

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET ALL ORDERS
export const getMyOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
 
    const orders = await Order.find({
      user: req.user?.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET SINGLE ORDERS 
export const getMyOrder = async ( req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user?.userId,
    });

    if (!order) {
      res.status(404).json({
        message: "Order not found",
      });

      return;
    }

    res.status(200).json(order);

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};


export const getAllOrders = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const orders = await Order.find()
    .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// admin only 
export const updateOrderStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({
        message: "Order not found",
      });
      return;
    }

    if (status === "Cancelled") {
  await Notification.create({
    title: "Order Cancelled",
    message: `Order #${order._id} was cancelled`,
    type: "order",
  });
}

    res.status(200).json(order);

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};