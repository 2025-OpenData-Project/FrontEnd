import baseAxiosInstance from "./baseAxiosApi";
import type { HomeTourFindApiProps } from "../utils/interface";

//자기소개서 작성 여부 조회
export const getCourse = async ({
  lat,
  lon,
  startTime,
  endTime,
  tourspot,
}: HomeTourFindApiProps) => {
  const response = await baseAxiosInstance.get(`/course`, {
    params: {
      lat,
      lon,
      startTime,
      endTime,
      tourspot,
    },
  });
  return response.data;
};

export const getTenTourSpot = async () => {
  const response = await baseAxiosInstance.get(`/api/tourspot/rank`);
  return response.data?.result ?? [];
};
