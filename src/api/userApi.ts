import baseAxiosInstance from "./baseAxiosApi";

export const getUserInfo = async () => {
  const response = await baseAxiosInstance.get(`/mypage/user`, {});
  return response;
};

export const getUserPreferences = async () => {
  const response = await baseAxiosInstance.get(`/mypage/preferences`, {});
  return response;
};

export const getUserTourHistory = async () => {
  const response = await baseAxiosInstance.get(`/mypage/courses`, {});
  return response;
};

export const logOut = async () => {
  const response = await baseAxiosInstance.post(`/logout`, {});
  return response;
};
