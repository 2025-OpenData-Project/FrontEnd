import { useEffect, useState } from "react";
import MyTitle from "../components/myPage/MyTitle";
import MyDetailBox from "../components/myPage/MyDetailBox";
import PastTourCard from "../components/PastTourCard";
import TourCard from "../components/homeC/TourCard";
import {
  getUserInfo,
  getUserPreferences,
  getUserTourHistory,
} from "../api/userApi";
import type { userInfoProps } from "../utils/interface";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    email: "",
    membership: "",
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const ures = await getUserInfo();
      const pres = await getUserPreferences();
      const tres = await getUserTourHistory();
      setUserInfo((prev) => ({
        ...prev,
        email: ures.data.result.email,
        membership: ures.data.result.membership,
        name: ures.data.result.name,
      }));
      console.log(pres.data);
      console.log(ures.data);
      console.log(tres.data);
    };
    fetchData();
  }, []);

  const mockCourses = [
    {
      courseId: "C-001",
      startDtm: "2025-09-04T08:42:52.043Z",
      endDtm: "2025-09-04T12:10:00.000Z",
      history: [
        {
          tourSpotTime: "09:00",
          tourSpotName: "경복궁",
          tourspotId: 6536,
          lat: 37.5796,
          lon: 126.977,
        },
        {
          tourSpotTime: "10:30",
          tourSpotName: "북촌 한옥마을",
          tourspotId: 7001,
          lat: 37.5826,
          lon: 126.983,
        },
        {
          tourSpotTime: "11:30",
          tourSpotName: "인사동",
          tourspotId: 7022,
          lat: 37.574,
          lon: 126.9857,
        },
        {
          tourSpotTime: "11:30",
          tourSpotName: "인사동",
          tourspotId: 7022,
          lat: 37.574,
          lon: 126.9857,
        },
        {
          tourSpotTime: "11:30",
          tourSpotName: "인사동",
          tourspotId: 7022,
          lat: 37.574,
          lon: 126.9857,
        },
        {
          tourSpotTime: "11:30",
          tourSpotName: "인사동",
          tourspotId: 7022,
          lat: 37.574,
          lon: 126.9857,
        },
      ],
    },
    {
      courseId: "C-002",
      startDtm: "2025-08-12T09:00:00.000Z",
      endDtm: "2025-08-12T13:00:00.000Z",
      history: [
        {
          tourSpotTime: "09:30",
          tourSpotName: "남산타워",
          tourspotId: 8001,
          lat: 37.5512,
          lon: 126.9882,
        },
      ],
    },
  ];

  const mockPreferred = [
    {
      tourspotId: 6536,
      tourspotNm: "경복궁",
      congestionLabel: "보통",
      imageUrl: "",
    },
    {
      tourspotId: 7001,
      tourspotNm: "북촌 한옥마을",
      congestionLabel: "여유",
      imageUrl: "",
    },
    {
      tourspotId: 7022,
      tourspotNm: "인사동",
      congestionLabel: "약간 붐빔",
      imageUrl: "",
    },
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 flex flex-col items-center">
      <MyTitle title="마이페이지" />
      <MyDetailBox
        email={userInfo.email}
        membership={userInfo.membership}
        name={userInfo.name}
      />

      {/* 과거 코스 */}
      <div className="w-full mt-8">
        <h2 className="text-2xl font-semibold mb-4">과거 코스</h2>
        {mockCourses.length === 0 ? (
          <div className="text-gray-500">기록이 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mockCourses.map((c) => (
              <PastTourCard
                key={c.courseId}
                courseId={c.courseId}
                startDtm={c.startDtm}
                endDtm={c.endDtm}
                history={c.history}
                onClick={(id) => console.log("clicked course", id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 선호 관광지 */}
      <div className="w-full my-10 ">
        <h2 className="text-2xl font-semibold mb-4">선호 관광지</h2>
        {mockPreferred.length === 0 ? (
          <div className="text-gray-500">등록된 선호 관광지가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
            {mockPreferred.map((spot) => (
              <TourCard
                key={spot.tourspotId}
                id={spot.tourspotId.toString()}
                name={spot.tourspotNm}
                congestion={spot.congestionLabel ?? "정보 없음"}
                imageUrl={spot.imageUrl ?? ""}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
