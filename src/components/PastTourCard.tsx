type HistoryItem = {
  tourSpotTime: string;
  tourSpotName: string;
  tourspotId: number;
  lat: number;
  lon: number;
};

interface PastTourCardProps {
  courseId: string;
  startDtm: string;
  endDtm: string;
  history: HistoryItem[];
  onClick?: (courseId: string) => void;
}

const PastTourCard = ({
  courseId,
  startDtm,
  endDtm,
  history,
  onClick,
}: PastTourCardProps) => {
  const handleClick = () => {
    if (onClick) onClick(courseId);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-3xl flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* 상단 비주얼 영역 (회색 원 플레이스홀더) */}
      <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        {/* 기간 배지 - 우상단 */}
        <div className="absolute top-4 right-4">
          <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full font-medium">
            {new Date(startDtm).toLocaleDateString()} ~{" "}
            {new Date(endDtm).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* 하단 내용 영역 */}
      <div className="bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          코스 #{courseId}
        </h2>
        {history && history.length > 0 ? (
          <ol className="list-decimal pl-5 space-y-2">
            {history.slice(0, 2).map((item, idx) => (
              <li key={`${courseId}-${idx}`} className="text-gray-800">
                <span className="font-medium">{item.tourSpotName}</span>
                {item.tourSpotTime && (
                  <span className="text-gray-500 ml-2">
                    {item.tourSpotTime}
                  </span>
                )}
              </li>
            ))}
            {history.length > 2 && (
              <li className="text-gray-400 list-none">...</li>
            )}
          </ol>
        ) : (
          <div className="text-gray-500">방문 기록이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default PastTourCard;
