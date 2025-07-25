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
  endHour: number;
  endMinute: number;
  setEndHour: (x: number) => void;
  setEndMinute: (x: number) => void;
  startHour: number;
  startMinute: number;
}

export interface StartInputBoxProps {
  startHour: number;
  startMinute: number;
  setStartHour: (x: number) => void;
  setStartMinute: (x: number) => void;
  endHour: number;
  endMinute: number;
}

export interface EndAddressBtnProps {
  setEndAddress: (address: string) => void;
}

export interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
}
// interface 에서는 data에서 더 많은 값을 받아와도 필요한 값만 정의해서 사용할 수 있다.
