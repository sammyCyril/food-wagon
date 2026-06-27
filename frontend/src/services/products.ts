const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async () => {
  const response = await fetch(
    `${API_URL}/products`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch products"
    );
  }

  return response.json();
};

export const deleteProduct = async ( id: string) => {
  const response = await fetch(
    `${API_URL}/products/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete product"
    );
  }

  return response.json();
};