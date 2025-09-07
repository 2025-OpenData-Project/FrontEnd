import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddressBtn from "./location/AddressBtn";
import EndAddressBtn from "./location/EndAddressBtn.tsx";
import StartInputBox from "./location/StartInputBox.tsx";
import EndInputBox from "./location/EndInputBox.tsx";

import { getCourse } from "../api/homeApi.ts";

const LocationRcmd = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endAddress, setEndAddress] = useState<string>("");

  const navigate = useNavigate();

  // 오늘 날짜 구하기
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  const handleButtonClick = async () => {
    if (
      startX !== null &&
      startY !== null &&
      endAddress &&
      endAddress !== "장소를 선택해주세요" &&
      startTime &&
      endTime
    ) {
      // "YYYY-MM-DDTHH:mm:00" 형식으로 변환
      const startDateTime = `${today} ${startTime}:00`;
      const endDateTime = `${today} ${endTime}:00`;
      console.log("Start DateTime:", startDateTime);
      console.log("End DateTime:", endDateTime);
      console.log("StartX:", startX);
      console.log("StartY:", startY);
      console.log("EndAddress:", endAddress);
      try {
        const res = await getCourse({
          lat: startY,
          lon: startX,
          startTime: startDateTime,
          endTime: endDateTime,
          tourspot: endAddress,
        });
        console.log("API Response:", res);
        navigate("/courseDetail", {
          state: { courseData: res.result },
        });
      } catch (error) {
        console.error(error);
        alert("코스 추천에 실패했습니다. 다시 시도해주세요.");
      }

      // 서버로 startDateTime, endDateTime을 보내면 됩니다.
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-6xl px-4 place-items-center bg-gray-100 p-5 rounded-lg">
      <AddressBtn setStartX={setStartX} setStartY={setStartY} />
      <StartInputBox
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
      />
      <EndInputBox
        endTime={endTime}
        startTime={startTime}
        setEndTime={setEndTime}
      />
      <EndAddressBtn setEndAddress={setEndAddress} />
      <button
        onClick={handleButtonClick}
        className="h-[71px] w-[80%] bg-[#739DFF] text-white rounded-md truncate overflow-hidden whitespace-nowrap text-center px-2"
      >
        탐색하기
      </button>
    </div>
  );
};

export default LocationRcmd;
