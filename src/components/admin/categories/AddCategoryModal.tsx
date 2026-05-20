"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Category } from "./CategoriesGrid";

type AddCategoryModalProps = {
  open: boolean;

  onClose: () => void;

  onAdd: ( category: Omit< Category, "products" | "status" > ) => void;

  onEdit: ( category: Category) => void;

  editingCategory: Category | null;
};

export default function AddCategoryModal({
  open,
  onClose,
  onAdd,
  onEdit,
  editingCategory,
}: AddCategoryModalProps) {

  const [formData, setFormData] =
    useState({
      icon: "",
      name: "",
      description: "",
    });

  // ─── Fill Form When Editing ─────────────────────────

  useEffect(() => {

    if (editingCategory) {

      setFormData({
        icon: editingCategory.icon,
        name: editingCategory.name,
        description: editingCategory.description,
      });

    } else {

      setFormData({
        icon: "",
        name: "",
        description: "",
      });
    }

  }, [editingCategory]);

  // ─── Handle Change ──────────────────────────────────

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ─── Submit ─────────────────────────────────────────

  const handleSubmit = () => {

    if (
      !formData.icon ||
      !formData.name ||
      !formData.description
    ) {
      return;
    }

    if (editingCategory) {

      onEdit({
        ...editingCategory,
        ...formData,
      });

    } else {

      onAdd(formData);

    }

    setFormData({
      icon: "",
      name: "",
      description: "",
    });

    onClose();

  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              {editingCategory
                ? "Edit Category"
                : "Add Category"}

            </h2>

            <p className="text-sm text-gray-500">

              {editingCategory
                ? "Update category details"
                : "Create a new category"}

            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >

            <X size={20} />

          </button>

        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            type="text"
            name="icon"
            placeholder="Category emoji"
            value={formData.icon}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
          />

          <input
            type="text"
            name="name"
            placeholder="Category name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
          />

          <textarea
            name="description"
            placeholder="Category description"
            value={formData.description}
            onChange={handleChange}
            className="min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
          />

        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >

            {editingCategory
              ? "Update Category"
              : "Add Category"}

          </button>

        </div>

      </div>

    </div>
  );
}