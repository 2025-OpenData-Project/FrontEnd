import type { TourEventCardProps } from "../../utils/interface";

const TourEventCard = ({ event }: TourEventCardProps) => {
  const {
    eventName = "이벤트명 미정",
    eventPeriod = "기간 정보 없음",
    eventPlace = "장소 정보 없음",
    tourspotThumbnail,
    tourspotUrl,
  } = event;

  return (
    <div className="rounded-xl border border-none bg-white shadow transition hover:shadow-lg w-[320px] shrink-0">
      {/* 이미지 영역 */}
      <div className="w-full h-48 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
        <img
          src={tourspotThumbnail || "/placeholder.svg"}
          alt={eventName}
          className="object-cover w-full h-full"
        />
      </div>

      {/* 내용 영역 */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{eventName}</h3>
        <p className="text-gray-500 text-sm mb-1">{eventPeriod}</p>
        <p className="text-gray-500 text-sm mb-3">{eventPlace}</p>

        {tourspotUrl && (
          <a
            href={tourspotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-blue-500 text-white rounded-md py-2 mt-2 hover:bg-blue-600 transition"
          >
            상세보기
          </a>
        )}
      </div>
    </div>
  );
};

export default TourEventCard;
