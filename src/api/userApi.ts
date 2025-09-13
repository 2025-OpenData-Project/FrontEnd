import baseAxiosInstance from "./baseAxiosApi";

export const getUserInfo = async () => {
  const response = await baseAxiosInstance.get(`/mypage/user`, {});
  return response;
};
