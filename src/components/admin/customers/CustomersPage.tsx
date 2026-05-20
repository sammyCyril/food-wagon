"use client";

import { useState } from "react";

import CustomersFilters from "./CustomersFilters";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";

import { customers } from "./data";

export default function CustomersPage() {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState< "All" | "Active" | "Inactive" >("All");

  const filteredCustomers = customers.filter((customer) => {

      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : customer.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  return (
    <div className="">

      {/* Stats */}
      <CustomersStats
        totalCustomers={
          filteredCustomers.length
        }
      />

      {/* Filters */}
      <CustomersFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={
          setStatusFilter
        }
      />

      {/* Table */}
      <CustomersTable
        customers={filteredCustomers}
      />

    </div>
  );
}