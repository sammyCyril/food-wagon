import { Item } from "@/data/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch(
      `${API_URL}/products`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch products"
      );
    }

    return await response.json();
  } catch {
    throw new Error(
      "No internet connection"
    );
  }
};

