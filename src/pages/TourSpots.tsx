import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "../components/homeC/TourCard";
import { getTourSpotMeta } from "../api/homeApi";
import { cacheManager, CACHE_KEYS } from "../utils/cache";

type TouristSpot = {
  tourspotId: number;
  tourspotNm: string;
  congestionLabel: string;
  imageUrl: string;
};

const TourSpots = () => {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const PAGE_SIZE = 5;

  useEffect(() => {
    const fetchTourSpots = async () => {
      const cacheKey = `${CACHE_KEYS.TOUR_SPOTS_RANK}_page_${currentPage}`;

      // 캐시에서 먼저 확인 (첫 페이지만)
      if (currentPage === 1) {
        const cachedData = cacheManager.get<TouristSpot[]>(cacheKey);
        if (cachedData && Array.isArray(cachedData)) {
          setTouristSpots(cachedData);
          return; // 캐시 데이터가 있으면 서버 요청 생략
        }
      }

      setIsLoading(true);
      try {
        const response = await getTourSpotMeta(currentPage, PAGE_SIZE);
        console.log("API 응답:", response);

        // API 응답에서 content 배열 추출
        const content = response?.content || [];
        const totalPagesFromApi = response?.totalPages || 0;

        setTouristSpots(content);
        setTotalPages(totalPagesFromApi);

        // 캐시 저장 (첫 페이지만)
        if (currentPage === 1) {
          cacheManager.set(cacheKey, content, 5 * 60 * 1000);
        }
      } catch (error) {
        console.error("관광지 목록 로드 실패:", error);
        alert("관광지 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourSpots();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지네이션 버튼 생성
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 끝 페이지가 조정되면 시작 페이지도 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">전체 관광지</h1>
          {totalPages > 0 && (
            <p className="text-gray-500 mt-1">
              총 {totalPages}페이지 중 {currentPage}페이지
            </p>
          )}
        </div>
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mb-8">
        {Array.isArray(touristSpots) &&
          touristSpots.map((spot) => (
            <TourCard
              key={spot.tourspotId}
              id={spot.tourspotId.toString()}
              name={spot.tourspotNm}
              congestion={spot.congestionLabel}
              imageUrl={spot.imageUrl}
            />
          ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && !isLoading && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* 이전 페이지 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>

          {/* 페이지 번호들 */}
          {generatePageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-2 border rounded-lg transition-colors ${
                pageNum === currentPage
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* 다음 페이지 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default TourSpots;
