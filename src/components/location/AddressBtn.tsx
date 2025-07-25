import { useState } from "react";
import type { AddressBtnProps, DaumPostcodeData } from "../../utils/interface";

declare global {
  interface Window {
    daum?: any; // 지도 모듈
  }
}

function AddressBtn({ setStartX, setStartY }: AddressBtnProps) {
  const [address, setAddress] = useState("");
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY; // 카카오 REST API 키

  const openPostcodePopup = () => {
    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        const selectedAddress = data.roadAddress || data.jibunAddress;
        console.log("선택한 주소:", selectedAddress);
        setAddress(selectedAddress);

        // 주소 → 위경도 변환
        fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
            selectedAddress,
          )}`,
          {
            headers: {
              Authorization: `KakaoAK ${REST_API_KEY}`,
            },
          },
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.documents.length > 0) {
              const result = response.documents[0];
              setStartX(result.x); // 위도
              setStartY(result.y); // 경도
            } else {
              console.log("검색 결과 없음");
            }
          })
          .catch((err) => {
            console.error("좌표 검색 오류:", err);
          });
      },
    }).open();
  };

  return (
    <div className="flex rounded-tl-lg rounded-bl-lg flex-col gap-2 justify-start w-full h-[103px] bg-white p-4 text-[16px] inset-shadow-sm inset-shadow-black-500">
      내 위치
      <hr className="border-[#EFEFEF]" />
      <button
        className="h-10 w-full bg-[#739DFF] text-white rounded-md truncate overflow-hidden whitespace-nowrap text-center px-2"
        onClick={openPostcodePopup}
      >
        {address ? address : "내 위치 찾기"}
      </button>
    </div>
  );
}

export default AddressBtn;
