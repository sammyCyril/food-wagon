import Image from "next/image";

import ProductStatusBadge from "./ProductStatusBadge";
import { Pencil } from "lucide-react";

interface ProductRowProps {
  image: string;
  name: string;
  unit: string;
  sku: string;
  category: string;
  price: string;
  stock: string;
   status:
    | "Active"
    | "Low Stock"
    | "Out Of Stock";

    
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductRow({
  image,
  name,
  unit,
  sku,
  category,
  price,
  stock,
  status,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <tr className="border-b border-gray-100">
      
      {/* Product */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />

          <div>
            <h4 className="font-medium">
              {name}
            </h4>

            <p className="text-sm text-gray-500">
              {unit}
            </p>
          </div>
        </div>
      </td>

      {/* SKU */}
      <td className="px-6 py-4">
        <span className="rounded bg-gray-100 px-2 py-1 text-sm">
          {sku}
        </span>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-gray-600">
        {category}
      </td>

      {/* Price */}
      <td className="px-6 py-4 font-medium">
        {price}
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        <div>
          <p className="font-medium">
            {stock}
          </p>

          {/* <p className="text-sm text-gray-500">
            min {minStock}
          </p> */}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <ProductStatusBadge status={status} />
      </td>

      <td className="px-6 py-4">

        <button
        onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          <Pencil size={16} />

          Edit
        </button>

        <button
  onClick={onDelete}
  className="text-sm text-red-500 hover:text-red-700"
>
  Delete
</button>

      </td>
    </tr>
  );
}