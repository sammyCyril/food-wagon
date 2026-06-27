import { Customer } from "./types";

export const customers: Customer[] = [
  {
    id: 1,
    name: "Ananya Mehta",
    email: "ananya@gmail.com",
    phone: "+91 99887 76543",
    city: "Mumbai",
    orders: 24,
    totalSpend: 18420,
    joined: "2023-03-15",
    status: "Active",
  },

  {
    id: 2,
    name: "Rohit Singh",
    email: "rohit@gmail.com",
    phone: "+91 88776 65432",
    city: "Delhi",
    orders: 12,
    totalSpend: 9840,
    joined: "2023-05-22",
    status: "Active",
  },

  {
    id: 3,
    name: "Vikram Joshi",
    email: "vikram@gmail.com",
    phone: "+91 66554 43210",
    city: "Bangalore",
    orders: 8,
    totalSpend: 6120,
    joined: "2023-08-05",
    status: "Inactive",
  },
];