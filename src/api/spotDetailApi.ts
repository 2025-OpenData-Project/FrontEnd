import baseAxiosInstance from "./baseAxiosApi";

export const getTourSpotDetail = async ({
  tourspotId,
}: {
  tourspotId: number;
}) => {
  const response = await baseAxiosInstance.get(
    `/api/tourspot/${tourspotId}`,
    {},
  );
  return response.data;
};

export const getIsHeart = async (tourspotId: number) => {
  const response = await baseAxiosInstance.get(
    `/mypage/preferences/check${tourspotId}`,
    {},
  );
  return response.data;
};

export const addHeart = async (tourspotId: number) => {
  const response = await baseAxiosInstance.post(
    `/mypage/preferences${tourspotId}`,
    {},
  );
  return response.data;
};

export const deleteHeart = async (tourspotId: number) => {
  const response = await baseAxiosInstance.delete(
    `/mypage/preferences${tourspotId}`,
    {},
  );
  return response.data;
};
