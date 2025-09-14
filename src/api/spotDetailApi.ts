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
