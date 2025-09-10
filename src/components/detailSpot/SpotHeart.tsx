import { Heart } from "lucide-react";

const SpotHeart = ({
  heart,
  setHeart,
}: {
  heart: boolean;
  setHeart: (heart: boolean) => void;
}) => {
  const handleHeartClick = () => {
    setHeart(!heart);
  };
  return (
    <div className="mx-auto py-4 mt-10">
      <button onClick={handleHeartClick}>
        <Heart
          size={36}
          className={heart ? "text-red-500 fill-red-500" : "text-gray-400"}
          fill={heart ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
};

export default SpotHeart;
