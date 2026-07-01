const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const createOrder = async (  orderData: any) => {
   const token = localStorage.getItem("token");
    const response = await fetch( `${API_URL}/orders`, {
      
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        orderData
      ),
    }
  );
  const data = await response.json();

  if (!response.ok) {
  throw new Error(data.message || "Failed to create order");
}

  return data
};

export const getOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

    if (!response.ok) {
    throw new Error(
      "Failed to get order"
    );
  }

  return response.json();
};



export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/orders/admin`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return await response.json();
  } catch {
    throw new Error("No internet connection");
  }
};

export const updateOrderStatus = async (
  id: string,
  status: string
) => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/orders/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update order"
    );
  }

  return response.json();
};