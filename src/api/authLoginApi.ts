import axios from "axios";

export const getLoginInfo = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/auth/test`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) return undefined;
    throw error;
  }
};
