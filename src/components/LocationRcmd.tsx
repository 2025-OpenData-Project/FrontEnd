import { useState } from "react";

import AddressBtn from "./location/AddressBtn";
import EndAddressBtn from "./location/EndAddressBtn.tsx";
import StartInputBox from "./location/StartInputBox.tsx";
import EndInputBox from "./location/EndInputBox.tsx";

const LocationRcmd = () => {
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endAddress, setEndAddress] = useState<string>("");

  const handleButtonClick = () => {
    if (
      startX !== null &&
      startY !== null &&
      endAddress &&
      endAddress !== "장소를 선택해주세요" &&
      startDateTime &&
      endDateTime
    ) {
      console.log("Start DateTime:", startDateTime);
      console.log("End DateTime:", endDateTime);
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
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        setStartDateTime={setStartDateTime}
      />
      <EndInputBox
        endDateTime={endDateTime}
        startDateTime={startDateTime}
        setEndDateTime={setEndDateTime}
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
