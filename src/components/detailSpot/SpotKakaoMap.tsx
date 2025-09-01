import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const SpotKakaoMap = ({ xPos, yPos }: { xPos: number; yPos: number }) => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
  useEffect(() => {
    // 이미 SDK가 로드돼 있으면 다시 안 불러오기
    if (document.getElementById("kakao-map-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REST_API_KEY}&autoload=false`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); // 지도를 표시할 div
        const options = {
          center: new window.kakao.maps.LatLng(yPos, xPos), // 서울 중심좌표
          level: 2, // 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(yPos, xPos),
        });
        marker.setMap(map);
      });
    };

    document.head.appendChild(script);
  }, [REST_API_KEY, xPos, yPos]);

  return (
    <div
      id="map"
      className="max-w-[800px] w-full mx-auto py-4 my-10 h-[500px]"
    ></div>
  );
};

export default SpotKakaoMap;
