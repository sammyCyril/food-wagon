"use client";

import { useState } from "react";

import ProductRow from "./ProductRow";
import ProductSearch from "./ProductSearch";
import CategoryFilter from "./CategoryFilter";
import ProductStatusTabs from "./ProductStatusTabs";
import EditProductModal from "./EditProductModal";

type Product = {
  image: string;
  name: string;
  unit: string;
  sku: string;
  category: string;
  price: string;
  stock: string;
  minStock: string;
  status:
    | "Active"
    | "Low Stock"
    | "Out Of Stock";
};

export const productsData: Product[] = [
  {
    image: "/pizza/pizza.jpg",
    name: "Organic Tomatoes",
    unit: "kg",
    sku: "VEG-TOM-001",
    category: "Vegetables",
    price: "₦45",
    stock: "240 kg",
    minStock: "50",
    status: "Active",
  },

  {
    image: "/pizza/pizza1.jpg",
    name: "Fresh Apples",
    unit: "kg",
    sku: "FRT-APL-002",
    category: "Fruits",
    price: "₦120",
    stock: "18 kg",
    minStock: "30",
    status: "Low Stock",
  },

  {
    image: "/pizza/pizza2.jpg",
    name: "Full Cream Milk",
    unit: "litre",
    sku: "DRY-MLK-003",
    category: "Dairy",
    price: "₦62",
    stock: "0 litre",
    minStock: "100",
    status: "Out Of Stock",
  },
] ;

export default function ProductsTable() {

  const [products, setProducts] =
  useState(productsData);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [openModal, setOpenModal] =
    useState(false);

  // Delete Product
  const handleDeleteProduct = (
    sku: string
  ) => {

    setProducts((prev) =>
      prev.filter(
        (product) =>
          product.sku !== sku
      )
    );

  };

  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        product.sku
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesStatus =
        status === "All" ||
        product.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );

    }
  );

  return (
    <div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-1 flex-col gap-4 md:flex-row">

          <ProductSearch
            value={search}
            onChange={setSearch}
          />

          <CategoryFilter
            value={category}
            onChange={setCategory}
          />

        </div>

        <ProductStatusTabs
          value={status}
          onChange={setStatus}
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                SKU
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <ProductRow
                key={product.sku}
                image={product.image}
                name={product.name}
                unit={product.unit}
                sku={product.sku}
                category={product.category}
                price={product.price}
                stock={product.stock}
                status={product.status}
                onEdit={() =>
                  setOpenModal(true)
                }
                onDelete={() =>
                  handleDeleteProduct(
                    product.sku
                  )
                }
              />

            ))}

          </tbody>

        </table>

        <EditProductModal
          open={openModal}
          onClose={() =>
            setOpenModal(false)
          }
        />

      </div>

    </div>
  );
}