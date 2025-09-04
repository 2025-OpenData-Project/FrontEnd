import TourCard from "./TourCard";
import { useEffect, useState } from "react";
import { getTenTourSpot } from "../../api/homeApi";

type TouristSpot = {
  tourspotId: number;
  tourspotNm: string;
  congestionLabel: string;
  imageUrl: string;
};

const HomeTourList = () => {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  useEffect(() => {
    const fetchTourSpots = async () => {
      try {
        const data = await getTenTourSpot();
        setTouristSpots(data);
      } catch {
        alert("관광지 정보를 불러오는데 실패했습니다.");
      }
    };
    fetchTourSpots();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">관광지 목록</h1>
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
