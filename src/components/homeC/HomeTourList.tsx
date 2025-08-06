import { useState } from "react";
import TourCard from "./TourCard";

const HomeTourList = () => {
  const touristSpots = [
    { id: "1", name: "경복궁", congestion: "여유" },
    { id: "2", name: "명동", congestion: "붐빔" },
    { id: "3", name: "홍대", congestion: "약간 붐빔" },
    { id: "4", name: "서울숲", congestion: "보통" },
    { id: "5", name: "이태원", congestion: "여유" },
    { id: "6", name: "강남역", congestion: "붐빔" },
    { id: "7", name: "부산", congestion: "여유" },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(touristSpots.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">관광지 목록</h1>

      <div className="relative">
        {/* 좌우 화살표 버튼 */}
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          disabled={totalPages <= 1}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          disabled={totalPages <= 1}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* 카드 컨테이너 */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-3 gap-6">
                  {touristSpots
                    .slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage,
                    )
                    .map((spot) => (
                      <TourCard
                        key={spot.id}
                        id={spot.id}
                        name={spot.name}
                        congestion={spot.congestion}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 페이지 인디케이터 */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentPage ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTourList;
