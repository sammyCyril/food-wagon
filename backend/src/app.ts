import express, { Request, Response } from "express";
import cors from "cors";

import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import authRoutes from "./routes/auth.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();


// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());


// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("API Running...");
});


// Product routes
app.use("/api/products", productRoutes);
// Order routes
app.use("/api/orders", orderRoutes);
// users auth
app.use(
  "/api/auth",
  authRoutes
);

app.use("/api/notifications", notificationRoutes)


export default app;