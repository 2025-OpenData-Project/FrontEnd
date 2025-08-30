import type { EndInputBoxProps } from "../../utils/interface";

const EndInputBox = ({ endTime, setEndTime, startTime }: EndInputBoxProps) => {
  const now = new Date();
  const minTime = startTime || now.toTimeString().slice(0, 5);

  // 오늘 23:59 또는 현재+10시간 중 더 이른 시간
  const maxDate = new Date(now.getTime() + 10 * 60 * 60 * 1000);
  const maxTime =
    maxDate.getDate() === now.getDate()
      ? maxDate.toTimeString().slice(0, 5)
      : "23:59";

  // 종료 시간은 출발 시간보다 작을 수 없음
  const realMinTime = startTime && startTime > minTime ? startTime : minTime;

  // 입력값이 min보다 작으면 min으로 자동 보정
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (startTime && value < startTime) {
      setEndTime(startTime);
      alert("도착 시간은 출발 시간보다 빠를 수 없습니다.");
    } else if (value < realMinTime) {
      setEndTime(realMinTime);
      alert("현재 시간보다 이전 시간은 선택할 수 없습니다.");
    } else if (value > maxTime) {
      setEndTime(maxTime);
      alert("최대 10시간 이내까지만 선택할 수 있습니다.");
    } else {
      setEndTime(value);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full h-[100px] bg-white p-4 text-[16px]">
      도착 시간
      <hr className="border-[#EFEFEF]" />
      <input
        type="time"
        className="border rounded px-2 py-1"
        value={endTime}
        min={realMinTime}
        max={maxTime}
        onChange={handleChange}
      />
    </div>
  );
};

export default EndInputBox;
