interface TourCardProps {
  id: string;
  name: string;
  congestion: string;
  imageUrl: string;
}

import { useNavigate } from "react-router-dom";

const TourCard = ({ id, name, congestion, imageUrl }: TourCardProps) => {
  const navigate = useNavigate();
  const getCongestionColor = (congestion: string) => {
    switch (congestion) {
      case "붐빔":
        return "bg-red-500"; // red-500
      case "약간 붐빔":
        return "bg-orange-500"; // orange-500
      case "보통":
        return "bg-yellow-500"; // yellow-500
      case "여유":
        return "bg-green-500"; // green-500
      default:
        return "bg-gray-500"; // gray-500
    }
  };

  const handleCardClick = () => {
    navigate(`/spot/${id}`);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-3xl aspect-square flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      {/* 상단 이미지 영역 */}
      <div className="relative flex-1 bg-gray-200">
        {/* 혼잡도 배지 - 우상단 */}
        <div className="absolute top-4 right-4">
          <span
            className={`text-white text-sm px-3 py-1 rounded-full font-medium ${getCongestionColor(
              congestion,
            )}`}
          >
            {congestion}
          </span>
        </div>

        {/* 이미지 플레이스홀더 */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center">
            {/* <span className="text-gray-400 text-xs">+</span> */}
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 하단 텍스트 영역 */}
      <div className="bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900 text-left">{name}</h2>
      </div>
    </div>
  );
};

export default TourCard;
