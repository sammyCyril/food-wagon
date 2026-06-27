"use client";

import Button from "@/components/ui/Button";

type DeleteProductModalProps = {
  open: boolean;
  product: {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
  } | null;
  onClose: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
};

export default function DeleteProductModal({
  open,
  product,
  onClose,
  onDelete,
  isDeleting = false,
}: DeleteProductModalProps) {
  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">
          Delete Product?
        </h2>

        <p className="mt-2 text-gray-500">
          Are you sure you want to delete this product?
          This action cannot be undone.
        </p>

        <div className="mt-6 rounded-2xl bg-gray-50 p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">
              Product Name
            </span>
            <span className="font-medium">
              {product.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Category
            </span>
            <span className="font-medium">
              {product.category}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Price
            </span>
            <span className="font-medium">
              ₦{product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Stock
            </span>
            <span className="font-medium">
              {product.stock}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={onDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}