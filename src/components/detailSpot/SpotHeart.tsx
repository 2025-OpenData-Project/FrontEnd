import { Heart } from "lucide-react";
import { useEffect } from "react";
import { getIsHeart, addHeart, deleteHeart } from "../../api/spotDetailApi";

const SpotHeart = ({
  heart,
  setHeart,
}: {
  heart: boolean;
  setHeart: (heart: boolean) => void;
}) => {
  useEffect(() => {
    const fetchHeartStatus = async () => {
      try {
        const tourspotId = window.location.pathname.split("/").pop();
        if (!tourspotId) return;
        const id = Number(tourspotId);
        const response = await getIsHeart(id);
        setHeart(response.result); // 서버에서 받은 좋아요 상태로 설정
      } catch (error) {
        console.error("Error fetching heart status:", error);
      }
    };
    fetchHeartStatus();
  }, [setHeart]); // setHeart가 변경될 때마다 실행

  const handleHeartClick = () => {
    if (heart) {
      // 좋아요 상태일 때 클릭하면 좋아요 취소
      const tourspotId = window.location.pathname.split("/").pop();
      if (!tourspotId) return;
      const id = Number(tourspotId);
      deleteHeart(id)
        .then(() => {
          setHeart(false);
        })
        .catch((error) => {
          console.error("Error deleting heart:", error);
        });
    } else {
      // 좋아요 상태가 아닐 때 클릭하면 좋아요 추가
      const tourspotId = window.location.pathname.split("/").pop();
      if (!tourspotId) return;
      const id = Number(tourspotId);
      addHeart(id)
        .then(() => {
          setHeart(true);
        })
        .catch((error) => {
          console.error("Error adding heart:", error);
        });
    }
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
