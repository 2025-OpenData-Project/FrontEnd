import { cn } from "../../utils/HomeUtil";

const randomColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
};

const SpotTag = ({
  spotTags,
}: {
  spotTags: Array<{ tourSpotCategory: string }>;
}) => {
  return (
    <div className="max-w-[1000px] w-full mx-auto py-4 flex flex-wrap gap-2">
      {spotTags.map((tag) => (
        <span
          key={tag.tourSpotCategory}
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-white",
          )}
          style={{ backgroundColor: randomColor() }}
        >
          {tag.tourSpotCategory}
        </span>
      ))}
    </div>
  );
};

export default SpotTag;
