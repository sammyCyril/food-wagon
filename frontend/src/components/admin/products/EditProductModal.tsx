"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNotifications } from "@/data/context/admin/NotificationContext";

type Product = {
  _id: string;
  image: string;
  name: string;
  unit: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Low Stock" | "Out Of Stock";
};

type EditProductModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditProductModal({
  open,
  product,
  onClose,
  onSuccess,
}: EditProductModalProps) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { refreshNotifications } = useNotifications();

  useEffect(() => {

    if (!product) return;

    setName(product.name);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setCategory(product.category);
    setSku(product.sku);
    setUnit(product.unit);

  }, [product]);

  if (!open || !product) return null;

  const handleSubmit = async () => {

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("sku", sku);
      formData.append("unit", unit);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      onSuccess();
      await refreshNotifications();
      onClose();

    } catch (error) {

      console.log(error);

    }

  };

  if (!open || !product)
    return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto px-5 py-3">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Edit Product
            </h2>

            <p className="text-sm text-gray-500">
              Update product details
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

          <div>

            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              SKU
            </label>

            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          {/* <div>
  <label className="mb-2 block text-sm font-medium">
    Unit
  </label>

  <input
    type="text"
    value={unit}
    onChange={(e) => setUnit(e.target.value)}
    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
  />
</div> */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              SKU
            </label>

            <input
              type="text"
              value={sku}
              onChange={(e) =>
                setSku(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Unit
            </label>

            {/* <input
              type="text"
              value={unit}
              onChange={(e) =>
                setUnit(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3"
            /> */}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files?.[0] ||
                  null
                )
              }
              className="w-full"
            />

          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}