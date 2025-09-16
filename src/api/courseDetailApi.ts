import baseAxiosInstance from "./baseAxiosApi";

// API 응답 인터페이스
interface ApiResponse {
  code: string;
  message: string;
  result: any;
  isSuccess: boolean;
}

// 연관 관광지 인터페이스
interface RelatedTourSpot {
  id: number;
  tourSpotCode: string;
  tourSpotName: string;
  largeCtgr: string;
  middleCtgr: string;
  mapX: number;
  mapY: number;
}

// 연관 관광지 조회 응답 인터페이스
interface RelatedTourSpotsResponse {
  code: string;
  message: string;
  result: RelatedTourSpot[];
  isSuccess: boolean;
}

export const likeCourse = async (courseId: string): Promise<ApiResponse> => {
  const response = await baseAxiosInstance.post(`/course/like/${courseId}`);
  return response.data;
};

export const unlikeCourse = async (courseId: string): Promise<void> => {
  // 현재는 클라이언트에서만 처리
  // TODO: 서버 API 연동 시 아래 코드로 변경
  // const response = await baseAxiosInstance.delete(`/course/like/${courseId}`);
  // return response.data;
  console.log(`좋아요 취소: ${courseId}`);
};

/**
 * 연관 관광지 조회
 * @param addressId - 주소 ID
 * @returns Promise<RelatedTourSpotsResponse>
 */
export const getRelatedTourSpots = async (
  addressId: number,
): Promise<RelatedTourSpotsResponse> => {
  const response = await baseAxiosInstance.get(
    `/api/tourspot/related/${addressId}`,
  );
  return response.data;
};
