"use client";

import { useEffect, useState } from "react";

import AddCategoryCard from "./AddCategoryCard";
import AddCategoryModal from "./AddCategoryModal";
import CategoryCard from "./CategoryCard";

export type Category = {
  icon: string;
  name: string;
  description: string;
  products: number;
  status: "Active" | "Inactive";
};

export const initialCategories: Category[] = [
  {
    icon: "🥦",
    name: "Vegetables",
    description: "Fresh farm vegetables",
    products: 45,
    status: "Active",
  },

  {
    icon: "🍎",
    name: "Fruits",
    description: "Seasonal fresh fruits",
    products: 32,
    status: "Active",
  },
];

export default function CategoriesGrid() {

  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [openModal, setOpenModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  // ─── Load Categories ────────────────────────────────

  useEffect(() => {

    const storedCategories =
      localStorage.getItem("categories");

    if (storedCategories) {

      setCategories(
        JSON.parse(storedCategories)
      );

    }

  }, []);

  // ─── Save Categories ────────────────────────────────

  useEffect(() => {

    localStorage.setItem(
      "categories",
      JSON.stringify(categories)
    );

  }, [categories]);

  // ─── Add Category ───────────────────────────────────

  const handleAddCategory = (
    newCategory: Omit<
      Category,
      "products" | "status"
    >
  ) => {

    const category: Category = {
      ...newCategory,
      products: 0,
      status: "Active",
    };

    setCategories((prev) => [
      ...prev,
      category,
    ]);

    setOpenModal(false);

  };

  // ─── Delete Category ────────────────────────────────

  const handleDeleteCategory = (
    categoryName: string
  ) => {

    setCategories((prev) =>
      prev.filter(
        (category) =>
          category.name !== categoryName
      )
    );

  };

  // ─── Edit Category ──────────────────────────────────

  const handleEditCategory = (
    updatedCategory: Category
  ) => {

    setCategories((prev) =>
      prev.map((category) =>
        category.name === editingCategory?.name
          ? updatedCategory
          : category
      )
    );

    setEditingCategory(null);
    setOpenModal(false);

  };

  return (
    <>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {categories.map((category) => (

          <CategoryCard
            key={category.name}
            icon={category.icon}
            name={category.name}
            description={category.description}
            products={category.products}
            status={category.status}
            onDelete={() =>
              handleDeleteCategory(category.name)
            }
            onEdit={() => {
              setEditingCategory(category);
              setOpenModal(true);
            }}
          />

        ))}

        <AddCategoryCard
          onClick={() => {
            setEditingCategory(null);
            setOpenModal(true);
          }}
        />

      </div>

      <AddCategoryModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingCategory(null);
        }}
        onAdd={handleAddCategory}
        onEdit={handleEditCategory}
        editingCategory={editingCategory}
      />

    </>
  );
}