import type { EndInputBoxProps } from "../../utils/interface";

const EndInputBox = ({
  endDateTime,
  setEndDateTime,
  startDateTime,
}: EndInputBoxProps) => {
  // 현재 시간을 기본값으로 설정
  const now = new Date();
  const defaultDateTime = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm 형식

  return (
    <div className="flex flex-col gap-2 w-full h-[100px] bg-white p-4 text-[16px] inset-shadow-sm inset-shadow-black-500">
      도착 일시
      <hr className="border-[#EFEFEF]" />
      <input
        type="datetime-local"
        className="border rounded px-2 py-1"
        value={endDateTime || defaultDateTime}
        min={startDateTime || defaultDateTime}
        onChange={(e) => setEndDateTime(e.target.value)}
      />
    </div>
  );
};

export default EndInputBox;
