export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  totalSpend: number;
  joined: string;
  status: "Active" | "Inactive";
};