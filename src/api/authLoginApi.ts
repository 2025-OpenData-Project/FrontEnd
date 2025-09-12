import baseAxiosInstance from "./baseAxiosApi";

export const getLoginInfo = async () => {
  const response = await baseAxiosInstance.get(`/auth/test`);
  return response;
};
