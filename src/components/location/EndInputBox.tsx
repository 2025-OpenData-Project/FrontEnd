import type { EndInputBoxProps } from "../../utils/interface";

const EndInputBox = ({
  endHour,
  endMinute,
  setEndHour,
  setEndMinute,
  startHour,
  startMinute,
}: EndInputBoxProps) => {
  return (
    <div className="flex flex-col gap-2 w-full h-[103px] bg-white p-4 text-[16px] inset-shadow-sm inset-shadow-black-500">
      도착 시간
      <hr className="border-[#EFEFEF]" />
      <div className="flex gap-2">
        <select
          className="flex-1 min-w-0 border rounded px-2 py-1"
          value={endHour ?? ""}
          onChange={(e) => setEndHour(Number(e.target.value))}
        >
          <option value="">시</option>
          {Array.from({ length: 24 }, (_, i) => (
            <option
              key={i}
              value={i}
              disabled={startHour !== null && i < startHour}
            >
              {i} 시
            </option>
          ))}
        </select>
        <select
          className="flex-1 min-w-0 border rounded px-2 py-1"
          value={endMinute ?? ""}
          onChange={(e) => setEndMinute(Number(e.target.value))}
        >
          <option value="">분</option>
          {Array.from({ length: 60 }, (_, i) => (
            <option
              key={i}
              value={i}
              disabled={
                endHour === startHour && startMinute !== null && i < startMinute
              }
            >
              {i} 분
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EndInputBox;
