import type { StartInputBoxProps } from "../../utils/interface";

const StartInputBox = ({
  startHour,
  startMinute,
  setStartHour,
  setStartMinute,
  endHour,
  endMinute,
}: StartInputBoxProps) => {
  return (
    <div className="flex flex-col gap-2 w-full h-[103px] bg-white p-4 text-[16px] inset-shadow-sm inset-shadow-black-500">
      출발 시간
      <hr className="border-[#EFEFEF]" />
      <div className="flex gap-2">
        <select
          className="flex-1 border min-w-0 rounded px-2 py-1"
          value={startHour ?? ""}
          onChange={(e) => setStartHour(Number(e.target.value))}
        >
          <option value="">시</option>
          {Array.from({ length: 24 }, (_, i) => (
            <option
              key={i}
              value={i}
              disabled={endHour !== null && i > endHour}
            >
              {i} 시
            </option>
          ))}
        </select>
        <select
          className="flex-1 min-w-0 border rounded px-2 py-1"
          value={startMinute ?? ""}
          onChange={(e) => setStartMinute(Number(e.target.value))}
        >
          <option value="">분</option>
          {Array.from({ length: 60 }, (_, i) => (
            <option
              key={i}
              value={i}
              disabled={
                endHour === startHour && endMinute !== null && i > endMinute
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

export default StartInputBox;
