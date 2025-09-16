import { cn } from "../../utils/HomeUtil";

const SpotTag = ({
  spotTags,
}: {
  spotTags: Array<{
    tourSpotCategory: string;
    tagColor: string;
  }>;
}) => {
  return (
    <div className="max-w-[1000px] w-full mx-auto py-4 flex flex-wrap gap-2">
      {spotTags.map((tag) => (
        <span
          key={tag.tourSpotCategory}
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-white",
          )}
          style={{ backgroundColor: tag.tagColor }}
        >
          {tag.tourSpotCategory}
        </span>
      ))}
    </div>
  );
};

export default SpotTag;
