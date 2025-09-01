import baseAxiosInstance from "./baseAxiosApi";

//자기소개서 작성 여부 조회
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
