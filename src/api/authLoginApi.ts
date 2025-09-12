import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getLoginInfo = async () => {
  // JWT 토큰을 Authorization 헤더로 전송
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access="))
    ?.split("=")[1];

  const response = await axios.get(`${baseURL}/auth/test`, {
    withCredentials: true, // JSESSIONID 포함
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // JWT 토큰을 Authorization 헤더로 전송
    },
  });
  return response.data;
};
