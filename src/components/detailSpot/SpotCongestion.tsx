import { cn } from "../../utils/HomeUtil";

const SpotCongestion = ({ congestion }: { congestion: string }) => {
  const getCongestionColor = (congestion: string) => {
    switch (congestion) {
      case "붐빔":
        return "bg-red-500";
      case "약간 붐빔":
        return "bg-orange-500";
      case "보통":
        return "bg-yellow-500";
      case "여유":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto py-4">
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-white",
          getCongestionColor(congestion),
        )}
      >
        {congestion}
      </span>
    </div>
  );
};

export default SpotCongestion;
