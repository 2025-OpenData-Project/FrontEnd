import { useEffect, useRef, useState } from "react";

interface Place {
  id: number;
  name: string;
  coordinates: { lat: number; lng: number };
  crowdLevel: "low" | "medium" | "high";
}

interface KakaoMapProps {
  places: Place[];
  courseName: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({ places, courseName }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  // 카카오 지도 API 로딩 확인
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        setIsKakaoLoaded(true);
      } else {
        // API가 로드되지 않았으면 동적으로 로드
        const script = document.createElement("script");
        script.type = "text/javascript";
        const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.onload = () => {
          window.kakao.maps.load(() => {
            setIsKakaoLoaded(true);
          });
        };
        document.head.appendChild(script);
      }
    };

    loadKakaoMap();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isKakaoLoaded || !window.kakao?.maps) return;

    // 기존 마커들 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 지도 생성
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
      level: 8,
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
    mapInstanceRef.current = map;

    // 장소가 있으면 첫 번째 장소를 중심으로 설정
    if (places.length > 0) {
      const firstPlace = places[0];
      const center = new window.kakao.maps.LatLng(
        firstPlace.coordinates.lat,
        firstPlace.coordinates.lng,
      );
      map.setCenter(center);
    }

    // 마커 생성 및 추가
    places.forEach((place, index) => {
      const position = new window.kakao.maps.LatLng(
        place.coordinates.lat,
        place.coordinates.lng,
      );

      // 혼잡도에 따른 마커 색상 설정
      let markerColor = "#4CAF50"; // 기본: 녹색 (여유)
      if (place.crowdLevel === "medium") {
        markerColor = "#FF9800"; // 주황색 (보통)
      } else if (place.crowdLevel === "high") {
        markerColor = "#F44336"; // 빨간색 (혼잡)
      }

      // 마커 이미지 설정
      const markerImage = new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;base64,${btoa(`
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="12" fill="${markerColor}" stroke="white" stroke-width="2"/>
            <text x="15" y="19" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${index + 1}</text>
          </svg>
        `)}`,
        new window.kakao.maps.Size(30, 30),
      );

      const marker = new window.kakao.maps.Marker({
        position: position,
        map: map,
        image: markerImage,
      });

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 150px;">
            <div style="font-weight: bold; margin-bottom: 5px;">${index + 1}. ${place.name}</div>
            <div style="font-size: 12px; color: #666;">
              혼잡도: ${
                place.crowdLevel === "low"
                  ? "🟢 여유"
                  : place.crowdLevel === "medium"
                    ? "🟡 보통"
                    : "🔴 혼잡"
              }
            </div>
          </div>
        `,
      });

      // 마커 클릭 시 인포윈도우 표시
      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });

    // 경로선 그리기 (2개 이상의 장소가 있을 때)
    if (places.length > 1) {
      const path = places.map(
        (place) =>
          new window.kakao.maps.LatLng(
            place.coordinates.lat,
            place.coordinates.lng,
          ),
      );

      const polyline = new window.kakao.maps.Polyline({
        path: path,
        strokeWeight: 3,
        strokeColor: "#FF6B6B",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      polyline.setMap(map);
    }
  }, [places, courseName, isKakaoLoaded]);

  if (!isKakaoLoaded) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-2">🗺️</div>
          <p className="text-sm">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
      }}
    />
  );
};

export default KakaoMap;
