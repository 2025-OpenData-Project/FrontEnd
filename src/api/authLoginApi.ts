import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getLoginInfo = async () => {
  const response = await axios.get(`${baseURL}/auth/test`, {
    withCredentials: true, // 서버에서 내려준 httpOnly 쿠키 포함
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data; // 필요한 데이터만 반환
};
