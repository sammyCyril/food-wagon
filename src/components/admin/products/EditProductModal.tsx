import { X } from "lucide-react";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditProductModal({
  open,
  onClose,
}: EditProductModalProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

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
              placeholder="Enter product name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="text"
              placeholder="Enter price"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Stock
            </label>

            <input
              type="text"
              placeholder="Enter stock"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 font-medium hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            className="rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}