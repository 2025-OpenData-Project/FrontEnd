import { useState } from "react";

import AddressBtn from "./location/AddressBtn";
import EndAddressBtn from "./location/EndAddressBtn.tsx";
import StartInputBox from "./location/StartInputBox.tsx";
import EndInputBox from "./location/EndInputBox.tsx";

const LocationRcmd = () => {
  const [startHour, setStartHour] = useState<number>(0);
  const [startMinute, setStartMinute] = useState<number>(0);
  const [endHour, setEndHour] = useState<number>(23);
  const [endMinute, setEndMinute] = useState<number>(59);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endAddress, setEndAddress] = useState<string>("");

  const DateMaker = (hour: number, minute: number) => {
    const today = new Date();
    const year = today.getFullYear(); // 년도
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월을 두 자릿수로
    const date = String(today.getDate()).padStart(2, "0"); // 날짜를 두 자릿수로
    const CHour = String(hour).padStart(2, "0");
    const CMinute = String(minute).padStart(2, "0");

    return `${year}-${month}-${date} ${CHour}:${CMinute}`;
  };

  const handleButtonClick = () => {
    // 값 검사: startX, startY, endAddress가 null 또는 빈 문자열이 아닌지 확인
    // 로그인 로직이 추가되면 추가적으로 검사를 해서 로그인이 되지 않으면 탐색이 되면 안된다.
    if (
      startX !== null &&
      startY !== null &&
      endAddress &&
      endAddress !== "장소를 선택해주세요" &&
      startHour !== null &&
      startMinute !== null &&
      endHour !== null &&
      endMinute !== null
    ) {
      const start = DateMaker(startHour, startMinute);
      const end = DateMaker(endHour, endMinute);
      console.log("Start:", start);
      console.log("End:", end);
      console.log("StartX:", startX);
      console.log("StartY:", startY);
      console.log("EndAddress:", endAddress);
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-6xl px-4 place-items-center bg-gray-100 p-5 rounded-lg">
      <AddressBtn setStartX={setStartX} setStartY={setStartY} />
      <StartInputBox
        startHour={startHour}
        startMinute={startMinute}
        endHour={endHour}
        endMinute={endMinute}
        setStartHour={setStartHour}
        setStartMinute={setStartMinute}
      />
      <EndInputBox
        endHour={endHour}
        endMinute={endMinute}
        startHour={startHour}
        startMinute={startMinute}
        setEndHour={setEndHour}
        setEndMinute={setEndMinute}
      />
      <EndAddressBtn setEndAddress={setEndAddress} />
      <button
        onClick={() => {
          handleButtonClick();
        }}
        className="h-[71px] w-[80%] bg-[#739DFF] text-white rounded-md truncate overflow-hidden whitespace-nowrap text-center px-2"
      >
        탐색하기
      </button>
    </div>
  );
};

export default LocationRcmd;
