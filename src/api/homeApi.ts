import axios from "axios";
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
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/tourspot/rank`,
    { withCredentials: true },
  );
  return response.data?.result ?? [];
};

export const getTourSpotMeta = async (page: number = 1, size: number = 5) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/tourspot/meta`,
    {
      params: { page, size },
      withCredentials: true,
    },
  );
  return response.data?.result ?? [];
};
