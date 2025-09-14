import baseAxiosInstance from "./baseAxiosApi";
import type { HomeTourFindApiProps } from "../utils/interface";

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

export const getTourSpotMeta = async (page: number = 1, size: number = 5) => {
  const response = await baseAxiosInstance.get(`/api/tourspot/meta`, {
    params: {
      page,
      size,
    },
  });
  return response.data?.result ?? [];
};
