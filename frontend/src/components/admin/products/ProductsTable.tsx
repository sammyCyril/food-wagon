"use client";

import { useEffect, useState } from "react";
import ProductRow from "./ProductRow";
import ProductSearch from "./ProductSearch";
import CategoryFilter from "./CategoryFilter";
import ProductStatusTabs from "./ProductStatusTabs";
import EditProductModal from "./EditProductModal";
import AddProductModal from "./AddProductModal";
import DeleteProductModal from "./DeleteProductModal";
import ProductSkeleton from "../skeleton/productSkeleton";
import { deleteProduct, getAllProducts } from "@/services/products";
import Pagination from "@/components/ui/Pagination";

type Product = {
  _id: string;
  slug: string;
  image: string;
  name: string;
  unit: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Low Stock" | "sold out";
};

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
  try {
    setLoading(true);

    const data = await getAllProducts();

    setProducts(data);
  } catch (error) {
    console.log("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};

   useEffect(() => {
    fetchProducts();
  }, []);
  
  const confirmDelete = async () => {
  if (!productToDelete) return;

  try {
    await deleteProduct( productToDelete._id );

    setProducts((prev) =>
      prev.filter(
        (product) =>
          product._id !==
          productToDelete._id
      )
    );

    setDeleteModalOpen(false);
    setProductToDelete(null);
  } catch (error) {
    console.log(error);
  }
};

  // Pagination
const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 5;

useEffect(() => {
  setCurrentPage(1);
}, [search, category, status]);

const filteredProducts = products.filter((product) => {
  const matchesSearch =
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase());

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
});

const startIndex =
  (currentPage - 1) * itemsPerPage;

const currentProducts =
  filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

const categories = [
  ...new Set(
    products.map(
      (product) => product.category
    )
  ),
];

  if (loading) {
  return (
    <ProductSkeleton />
  )
}

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <ProductSearch
            value={search}
            onChange={setSearch}
          />

         <CategoryFilter
  value={category}
  categories={categories}
  onChange={setCategory}
/>
        </div>

        <ProductStatusTabs
          value={status}
          onChange={setStatus}
        />

        <button
          onClick={() => setOpenAddModal(true)}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Product
        </button>
      </div>

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
  {filteredProducts.length === 0 ? (
    <tr>
      <td
        colSpan={7}
        className="py-20 text-center text-gray-500"
      >
        No products found
      </td>
    </tr>
  ) : (
    currentProducts.map((product) => (
      <ProductRow
        key={product._id}
        image={product.image}
        name={product.name}
        unit={product.unit}
        sku={product.sku}
        category={product.category}
        price={`₦${product.price}`}
        stock={String(product.stock)}
        status={product.status}
        onEdit={() => {
          setSelectedProduct(product);
          setOpenEditModal(true);
        }}
        onDelete={() => {
          setProductToDelete(product);
          setDeleteModalOpen(true);
        }}
      />
    ))
  )}
</tbody>
        </table>

        <EditProductModal
          open={openEditModal}
          product={selectedProduct}
          onClose={() => {
            setOpenEditModal(false);
            setSelectedProduct(null);
          }}
          onSuccess={fetchProducts}
        />

        <AddProductModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onSuccess={fetchProducts}
        />

        <DeleteProductModal
          open={deleteModalOpen}
          product={productToDelete}
          onClose={() => {
            setDeleteModalOpen(false);
            setProductToDelete(null);
          }}
          onDelete={confirmDelete}
        />

        <Pagination
  currentPage={currentPage}
  totalItems={filteredProducts.length}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
/>
      </div>
    </div>
  );
}