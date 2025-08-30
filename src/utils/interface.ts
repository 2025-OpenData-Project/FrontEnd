export interface SlideData {
  image: string;
  name: string;
  description: string;
}

export interface SlideShowProps {
  data: SlideData[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export interface AddressBtnProps {
  setStartX: (x: number | null) => void;
  setStartY: (y: number | null) => void;
}

export interface EndInputBoxProps {
  endTime: string;
  setEndTime: (dateTime: string) => void;
  startTime: string;
}

export interface StartInputBoxProps {
  startTime: string;
  setStartTime: (dateTime: string) => void;
  endTime: string;
}

export interface EndAddressBtnProps {
  setEndAddress: (address: string) => void;
}

export interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
}
// interface 에서는 data에서 더 많은 값을 받아와도 필요한 값만 정의해서 사용할 수 있다.

export interface QnA {
  question: string;
  answer: string;
  index: number;
}

export interface TourSpotEvent {
  tourspotEventId: number;
  eventName: string;
  eventPeriod: string;
  eventPlace: string;
  eventX: number;
  eventY: number;
  tourspotThumbnail: string;
  tourspotUrl: string;
}

export interface TourEventCardProps {
  event: TourSpotEvent;
}

export interface TourEvent {
  tourspotEventId: number;
  eventName: string;
  eventPeriod: string;
  eventPlace: string;
  eventX: number;
  eventY: number;
  tourspotThumbnail: string;
  tourspotUrl: string;
}
