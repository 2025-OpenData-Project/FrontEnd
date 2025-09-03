import TourCard from "./TourCard";

const touristSpots = [
  { id: "1", name: "경복궁", congestion: "여유" },
  { id: "2", name: "명동", congestion: "붐빔" },
  { id: "3", name: "홍대", congestion: "약간 붐빔" },
  { id: "4", name: "서울숲", congestion: "보통" },
  { id: "5", name: "이태원", congestion: "여유" },
  { id: "6", name: "강남역", congestion: "붐빔" },
  { id: "7", name: "부산", congestion: "여유" },
  { id: "8", name: "광화문", congestion: "보통" },
  { id: "9", name: "잠실", congestion: "약간 붐빔" },
  { id: "10", name: "인사동", congestion: "여유" },
];

const HomeTourList = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">관광지 목록</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {touristSpots.slice(0, 10).map((spot) => (
          <TourCard
            key={spot.id}
            id={spot.id}
            name={spot.name}
            congestion={spot.congestion}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeTourList;
