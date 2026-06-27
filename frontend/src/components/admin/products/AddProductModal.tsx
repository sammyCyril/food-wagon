"use client";

import { useState } from "react";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductModal({
  open,
  onClose,
  onSuccess,
}: AddProductModalProps) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return alert("Image is required");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("place", place);
      formData.append("sku", sku);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("image", image);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      setName("");
      setPrice("");
      setPlace("");
      setSku("");
      setCategory("");
      setStock("");
      setImage(null);

      onSuccess();
      onClose();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">

    <div className="w-full max-w-[500px] rounded-xl bg-white p-4 md:p-6">

        <h2 className="text-xl font-semibold mb-4">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border p-2 rounded"
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />

          <div className="flex gap-2 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border p-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white p-2 rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}