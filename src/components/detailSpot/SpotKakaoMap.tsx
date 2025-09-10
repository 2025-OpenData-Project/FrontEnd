import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const SpotKakaoMap = ({ xPos, yPos }: { xPos: number; yPos: number }) => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

  // SDK 로드
  useEffect(() => {
    if (document.getElementById("kakao-map-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REST_API_KEY}&autoload=false`;
    document.head.appendChild(script);
  }, [REST_API_KEY]);

  // 지도 렌더링 (좌표 변경 시마다)
  useEffect(() => {
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;

      // 기존 지도 제거
      container.innerHTML = "";

      const options = {
        center: new window.kakao.maps.LatLng(yPos, xPos),
        level: 2,
      };
      const map = new window.kakao.maps.Map(container, options);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(yPos, xPos),
      });
      marker.setMap(map);
    });
  }, [xPos, yPos]);

  return (
    <div
      id="map"
      className="max-w-[800px] w-full mx-auto py-4 my-10 h-[500px]"
    ></div>
  );
};

export default SpotKakaoMap;
