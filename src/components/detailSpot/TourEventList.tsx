import TourEventCard from "./TourEventCard";
import type { TourEvent } from "../../utils/interface";

interface TourEventListProps {
  events: TourEvent[];
}

const TourEventList = ({ events }: TourEventListProps) => {
  if (!events?.length) {
    return (
      <p className="text-gray-500 text-center py-6">
        등록된 이벤트가 없습니다.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto max-w-[1000px] w-full mx-auto py-4 mb-10">
      <div className="flex flex-nowrap gap-4 py-4 min-w-fit">
        {events.map((event) => (
          <TourEventCard key={event.tourspotEventId} event={event} />
        ))}
      </div>
    </div>
  );
};

export default TourEventList;
