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
  const [preferences, setPreferences] = useState<any[]>([]);
  const [tourHistory, setTourHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ures = await getUserInfo();
        const pres = await getUserPreferences();
        const tres = await getUserTourHistory();

        setUserInfo((prev) => ({
          ...prev,
          email: ures.data?.result?.email ?? "",
          membership: ures.data?.result?.membership ?? "",
          name: ures.data?.result?.name ?? "",
        }));
        setPreferences(pres.data?.result ?? []);
        setTourHistory(tres.data?.result ?? []);
        console.log(pres.data?.result);
        console.log(ures.data?.result);
        console.log(tres.data?.result);
      } catch (error) {
        console.error("데이터 로딩 중 오류:", error);
        setPreferences([]);
        setTourHistory([]);
      }
    };
    fetchData();
  }, []);

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
        {!tourHistory || tourHistory.length === 0 ? (
          <div className="text-gray-500">기록이 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tourHistory.map((c) => (
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
        {!preferences || preferences.length === 0 ? (
          <div className="text-gray-500">등록된 선호 관광지가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
            {preferences.map((spot) => (
              <TourCard
                key={spot.tourspotId}
                id={spot.tourspotId?.toString() ?? ""}
                name={spot.tourspotNm ?? ""}
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
