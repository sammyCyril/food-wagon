"use client";

import { useEffect, useState } from "react";
import CustomersFilters from "./CustomersFilters";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";
import CustomerSkeleton from "../skeleton/CustomerSkeleton";
import { getUsers } from "@/services/users";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "Active" | "Inactive";
  orders: number;
  totalSpend: number;
  joined: string;
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchCustomers = async () => {
  try {
    setLoading(true);

    const data = await getUsers();

   

    setCustomers( data );
;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredCustomers.reduce(
    (sum, customer) => sum + customer.totalSpend,
    0
  );

  const totalOrders = filteredCustomers.reduce(
    (sum, customer) => sum + customer.orders,
    0
  );

  const avgOrderValue =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  if (loading) {
    return <CustomerSkeleton />;
  }

  return (
    <div>
      <CustomersStats
        totalCustomers={filteredCustomers.length}
        totalRevenue={totalRevenue}
        avgOrderValue={avgOrderValue}
      />

      <CustomersFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <CustomersTable
        customers={filteredCustomers}
      />
    </div>
  );
}