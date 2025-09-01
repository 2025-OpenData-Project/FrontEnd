import { useEffect, useState } from "react";
import SpotCongestion from "../components/detailSpot/SpotCongestion";
import TourEventList from "../components/detailSpot/TourEventList";
import SpotTitle from "../components/detailSpot/SpotTitle";
import SpotKakaoMap from "../components/detailSpot/SpotKakaoMap";
import SpotAddressCopy from "../components/detailSpot/SpotAddressCopy";
import SpotTag from "../components/detailSpot/SpotTag";

import { getTourSpotDetail } from "../api/spotDetailApi";

const Spot = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTourSpotDetail({
        tourspotId: 6536,
      });
      setData(response.result);
      console.log(response);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div className="w-full text-center py-10">로딩 중...</div>;
  }

  const { congestionLabel, tourSpotEvents, tourspotNm, address, tourSpotTags } =
    data;

  return (
    <div className="w-full mx-auto px-4 flex flex-col items-center">
      <SpotTitle title={tourspotNm} />
      {/* 혼잡도 */}
      <SpotCongestion congestion={congestionLabel} />
      <SpotTag spotTags={tourSpotTags} />

      <SpotKakaoMap xPos={address.longitude} yPos={address.latitude} />
      <SpotAddressCopy address={address.addressDetail} />
      <SpotTitle title={"관광지 소개"} />
      <div className="w-full max-w-[1000px] mx-auto py-4 text-justify text-xl">
        경복궁은 1395년 태조 이성계에 의해 조선왕조의 법궁으로 창건되었습니다.
        조선왕조 600년 역사와 함께한 대표적인 궁궐로, 웅장하고 화려한 건축미를
        자랑합니다. 근정전, 경회루, 향원정 등 아름다운 건축물들이 조화롭게
        배치되어 있어 한국 전통 건축의 진수를 보여줍니다. 특히 수문장 교대식은
        매일 오전 10시, 오후 2시, 오후 3시 30분에 진행되어 관광객들에게 큰
        볼거리를 제공합니다. 또한 한복을 입고 방문하면 무료 입장이 가능하여 더욱
        특별한 경험을 할 수 있습니다. 궁궐 내부에는 국립고궁박물관과
        국립민속박물관이 있어 조선왕조의 역사와 문화를 깊이 있게 체험할 수
        있습니다. 사계절 내내 아름다운 풍경을 자랑하며, 특히 봄의 벚꽃과 가을의
        단풍이 장관을 이룹니다.
      </div>
      {/* 이벤트 목록 */}
      <TourEventList events={tourSpotEvents} />
    </div>
  );
};

export default Spot;
