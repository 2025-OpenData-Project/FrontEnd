import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../api/userApi";

const MyModal = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      // 로그인 정보 캐시 무효화
      await queryClient.setQueryData(["loginInfo"], null);
    } catch (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      console.error("로그아웃 실패:", error);
      return;
    }
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 min-w-[180px] border border-gray-200 flex flex-col items-stretch gap-2">
      <div className="flex justify-end">
        <button
          className="text-gray-400 hover:text-gray-600 text-lg font-bold"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
      </div>
      <button
        className="w-full px-3 py-2 rounded-md text-left hover:bg-gray-100 transition"
        onClick={() => {
          navigate("/home");
          setIsOpen(false);
        }}
      >
        홈
      </button>
      <button
        className="w-full px-3 py-2 rounded-md text-left hover:bg-gray-100 transition"
        onClick={() => {
          navigate("/my-page");
          setIsOpen(false);
        }}
      >
        마이페이지
      </button>
      <button
        className="w-full px-3 py-2 rounded-md text-left hover:bg-gray-100 transition text-red-500"
        onClick={() => {
          handleLogOut();
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyModal;
