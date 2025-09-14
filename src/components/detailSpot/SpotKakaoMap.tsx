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
    // 지도 초기화 함수
    const initMap = () => {
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
    };

    // 이미 SDK가 로드되어 있으면 바로 지도 초기화
    if (window.kakao?.maps) {
      window.kakao.maps.load(initMap);
      return;
    }

    // 아직 로드 안 되어 있으면 script 추가
    if (!document.getElementById("kakao-map-sdk")) {
      const script = document.createElement("script");
      script.id = "kakao-map-sdk";
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REST_API_KEY}&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
      document.head.appendChild(script);
    }
  }, [REST_API_KEY, xPos, yPos]);

  return (
    <div
      id="map"
      className="max-w-[800px] w-full mx-auto py-4 my-10 h-[500px]"
    ></div>
  );
};

export default SpotKakaoMap;
