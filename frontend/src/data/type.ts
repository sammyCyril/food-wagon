
export type Food = {
  _id: string;
  image: string;
  title: string;
  discount: string;
  days: string;
};

export interface Item {
  _id: string;
  image: string;
  name: string;
  place: string;
  price: number;
  slug: string;
  stock: number;
}

export type Restaurant = {
  _id: string;
  image: string;
  name: string;
  logo: string;
  rating: number;
  discount: string;
  fast: boolean;
  status: string;
  statusColor: "green" | "orange";
};

export type Foodss = {
  _id: string;
  name: string;
  image: string;
}

export type User = {
   _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  city: string;
};

export type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  _id: string;
  items: OrderItem[];
  total: number;
  address: string;
  phone: string;
  paymentMethod: "cash" | "card";
  // status: "pending" | "processing" | "delivered" | "cancelled";
  status:
  | "Pending"
  | "Processing"
  | "Delivered"
  | "Cancelled";
  createdAt: string;
  totalAmount: number;
  customerName: string;
};

export const statusStyles = {
  Pending:
    "bg-yellow-50 text-yellow-700 border-yellow-200",

  Processing:
    "bg-blue-50 text-blue-700 border-blue-200",

  Delivered:
    "bg-green-50 text-green-700 border-green-200",

  Cancelled:
    "bg-red-50 text-red-700 border-red-200",
};

export type Notification = {
  _id: string;
  title: string;
  message: string;
  type: "order" | "customer" | "product";
  read: boolean;
  createdAt: string;
  updatedAt: string;
};