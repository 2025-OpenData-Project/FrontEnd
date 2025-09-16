import TourCard from "./TourCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTenTourSpot } from "../../api/homeApi";
import { cacheManager, CACHE_KEYS } from "../../utils/cache";

type TouristSpot = {
  tourspotId: number;
  tourspotNm: string;
  congestionLabel: string;
  imageUrl: string;
};

const HomeTourList = () => {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourSpots = async () => {
      const cacheKey = CACHE_KEYS.TOUR_SPOTS_RANK;

      // 1. 캐시에서 먼저 데이터 확인
      const cachedData = cacheManager.get<TouristSpot[]>(cacheKey);
      if (cachedData) {
        setTouristSpots(cachedData);
        setLastUpdateTime(new Date());
      }

      // 2. 백그라운드에서 서버 데이터 확인
      setIsLoading(true);
      try {
        const serverData = await getTenTourSpot();
        console.log("서버 데이터:", serverData);

        // 캐시가 없으면 무조건 저장
        if (!cachedData) {
          setTouristSpots(serverData);
          setLastUpdateTime(new Date());
          cacheManager.set(cacheKey, serverData, 5 * 60 * 1000);
        }
        // 캐시가 있고, 데이터가 다르면 업데이트
        else if (cacheManager.isDataChanged(cacheKey, serverData)) {
          setTouristSpots(serverData);
          setLastUpdateTime(new Date());
          cacheManager.set(cacheKey, serverData, 5 * 60 * 1000);
        }
        // 캐시가 있고, 데이터가 같으면 아무것도 안 함
      } catch (error) {
        console.error("서버 데이터 로드 실패:", error);
        if (!cachedData) {
          alert("관광지 정보를 불러오는데 실패했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourSpots();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">인기 관광지</h1>
          <button
            onClick={() => navigate("/tourspots")}
            className="text-gray-500 underline hover:text-gray-700 transition-colors"
          >
            더보기
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {isLoading && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <span>업데이트 중...</span>
            </div>
          )}
          {lastUpdateTime && (
            <span>마지막 업데이트: {lastUpdateTime.toLocaleTimeString()}</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {touristSpots.slice(0, 10).map((spot) => (
          <TourCard
            key={spot.tourspotId}
            id={spot.tourspotId.toString()}
            name={spot.tourspotNm}
            congestion={spot.congestionLabel}
            imageUrl={spot.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeTourList;
