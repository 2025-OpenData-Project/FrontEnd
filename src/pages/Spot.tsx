import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SpotCongestion from "../components/detailSpot/SpotCongestion";
import TourEventList from "../components/detailSpot/TourEventList";
import SpotTitle from "../components/detailSpot/SpotTitle";
import SpotKakaoMap from "../components/detailSpot/SpotKakaoMap";
import SpotAddressCopy from "../components/detailSpot/SpotAddressCopy";
import SpotTag from "../components/detailSpot/SpotTag";
import SpotHeart from "../components/detailSpot/SpotHeart";

import { getTourSpotDetail } from "../api/spotDetailApi";
import { getLoginInfo } from "../api/authLoginApi";

const Spot = () => {
  const [heart, setHeart] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const { id } = useParams();
  const { data: loginInfo, isLoading } = useQuery({
    queryKey: ["loginInfo"],
    queryFn: getLoginInfo,
    staleTime: 5 * 60 * 1000, // 5분간 캐싱 (원하는 시간으로 조정)
    retry: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const tourspotId = Number(id);
      const response = await getTourSpotDetail({
        tourspotId,
      });
      console.log(response.result);
      setData(response.result);
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div className="w-full text-center py-10">로딩 중...</div>;
  }

  const {
    congestionLabel,
    tourSpotEvents,
    tourspotNm,
    address,
    tourSpotTags,
    imageUrl,
    content,
  } = data;

  const safeCongestionLabel = congestionLabel ?? "정보 없음";
  const safeTourSpotEvents = Array.isArray(tourSpotEvents)
    ? tourSpotEvents
    : [];
  const safeAddress = address ?? {
    longitude: 0,
    latitude: 0,
    addressDetail: "주소 정보 없음",
  };

  return (
    <div className="w-full mx-auto px-4 flex flex-col items-center">
      <section className="flex items-center justify-start gap-2 w-full max-w-[1000px]">
        <SpotTitle title={tourspotNm} />
        {isLoading ? null : loginInfo ? (
          <SpotHeart heart={heart} setHeart={setHeart} />
        ) : null}
      </section>

      {/* 혼잡도 */}
      <SpotCongestion congestion={safeCongestionLabel} />
      <SpotTag spotTags={tourSpotTags} />
      {imageUrl && (
        <div className="w-full max-w-[500px] max-h-[500px] mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt={tourspotNm}
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
        </div>
      )}
      <SpotTitle title={"관광지 소개"} />
      <div className="w-full max-w-[1000px] mx-auto py-4 text-justify text-xl">
        {content || "소개 정보가 없습니다."}
      </div>
      <SpotKakaoMap xPos={safeAddress.longitude} yPos={safeAddress.latitude} />
      <SpotAddressCopy address={safeAddress.addressDetail} />

      {/* 이벤트 목록 */}
      <SpotTitle title={"진행중인 이벤트"} />
      <TourEventList events={safeTourSpotEvents} />
    </div>
  );
};

export default Spot;
