export const apiFetch = async (
  url: string,
  options?: RequestInit
) => {
  try {
    const response = await fetch(
      url,
      options
    );

    if (!response.ok) {
      const errorData =
        await response.json().catch(
          () => ({})
        );

      throw new Error(
        errorData.message ||
          "Request failed"
      );
    }

    return response.json();
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error(
        "No internet connection"
      );
    }

    throw error;
  }
};