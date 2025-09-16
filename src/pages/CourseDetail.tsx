import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { X, AlertTriangle } from "lucide-react";
import KakaoMap from "../components/courseDetail/KakaoMap.tsx";
import {
  likeCourse,
  unlikeCourse,
  getRelatedTourSpots,
} from "../api/courseDetailApi.ts";

// API 응답 데이터 인터페이스
interface ApiCourseComponent {
  addressId: number;
  tourSpotName: string;
  tourspotId: number;
  congestionLevel: "여유" | "보통" | "혼잡";
  time: string;
  lat: number;
  lon: number;
  tourspotImg?: string;
}

interface ApiCourse {
  courseId: string;
  courseComponentDtoList: ApiCourseComponent[];
}

interface ApiResponse {
  code: string;
  message: string;
  result: ApiCourse[];
  isSuccess: boolean;
}

interface Place {
  id: number;
  addressId: number;
  name: string;
  type: "attraction" | "restaurant" | "accommodation";
  typeLabel: string;
  time: string;
  duration: string;
  image: string;
  crowdLevel: "low" | "medium" | "high";
  coordinates: { lat: number; lng: number };
  completed: boolean;
}

interface TravelDay {
  day: number;
  date: string;
  startTime: string;
  places: Place[];
}

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  travelDays: TravelDay[];
}

const CourseDetail = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showCrowdWarning, setShowCrowdWarning] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [selectedPlaceForAlternatives, setSelectedPlaceForAlternatives] =
    useState<Place | null>(null);
  const [likedCourses, setLikedCourses] = useState<Set<string>>(new Set());
  const [relatedTourSpots, setRelatedTourSpots] = useState<any[]>([]);
  const [isLoadingRelatedSpots, setIsLoadingRelatedSpots] = useState(false);

  // 좋아요 토글 함수
  const toggleCourseLike = async (courseId: string) => {
    try {
      // tempCourse: 접두사 제거
      const cleanCourseId = courseId.replace("tempCourse:", "");
      console.log("원본 courseId:", courseId);
      console.log("정리된 courseId:", cleanCourseId);

      if (likedCourses.has(courseId)) {
        // 좋아요 취소
        await unlikeCourse(cleanCourseId);
        setLikedCourses((prev) => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
      } else {
        // 좋아요 등록
        const response = await likeCourse(cleanCourseId);

        // API 응답의 isSuccess 필드 확인
        if (response.isSuccess) {
          setLikedCourses((prev) => new Set(prev).add(courseId));
          console.log(`좋아요 등록 성공: ${cleanCourseId}`);
        } else {
          console.error("좋아요 등록 실패:", response.message);
          alert(`좋아요 등록에 실패했습니다: ${response.message}`);
        }
      }
    } catch (error: any) {
      console.error("좋아요 처리 중 오류:", error);

      if (error.response?.status === 401) {
        alert("인증이 필요합니다. 로그인 후 다시 시도해주세요.");
      } else if (error.response?.data?.message) {
        alert(`좋아요 등록에 실패했습니다: ${error.response.data.message}`);
      } else {
        alert(
          "좋아요 처리 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.",
        );
      }
    }
  };

  // 연관 관광지 조회 함수
  const fetchRelatedTourSpots = async (addressId: number) => {
    try {
      setIsLoadingRelatedSpots(true);
      console.log("연관 관광지 조회 - addressId:", addressId);
      const response = await getRelatedTourSpots(addressId);

      if (response.isSuccess) {
        // 중복 제거 (tourSpotName 기준) 및 최대 10개로 제한
        const uniqueSpots = response.result
          .filter(
            (spot, index, self) =>
              index ===
              self.findIndex((s) => s.tourSpotName === spot.tourSpotName),
          )
          .slice(0, 10); // 최대 10개만 표시
        setRelatedTourSpots(uniqueSpots);
      } else {
        console.error("연관 관광지 조회 실패:", response.message);
        setRelatedTourSpots([]);
      }
    } catch (error: any) {
      console.error("연관 관광지 조회 중 오류:", error);
      setRelatedTourSpots([]);

      if (error.response?.status === 404) {
        alert("연관 관광지를 찾을 수 없습니다.");
      } else if (error.response?.status === 500) {
        alert("서버 에러가 발생했습니다. 관리자에게 문의해주세요.");
      } else {
        alert("연관 관광지 조회 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoadingRelatedSpots(false);
    }
  };

  // 현재 시간을 기준으로 방문해야 할 관광지를 찾는 함수
  const getCurrentPlaceIndex = (places: Place[]) => {
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes(); // HHMM 형태로 변환

    for (let i = 0; i < places.length; i++) {
      const placeTime = places[i].time.split("-")[0]; // "10:00-11:00"에서 "10:00" 추출
      const [hour, minute] = placeTime.split(":").map(Number);
      const placeTimeNum = hour * 100 + minute;

      // 다음 장소와 비교하여 현재 시간이 범위 내에 있는지 확인
      if (i === places.length - 1) {
        // 마지막 장소인 경우
        return currentTime >= placeTimeNum ? i : i - 1;
      } else {
        const nextPlaceTime = places[i + 1].time.split("-")[0];
        const [nextHour, nextMinute] = nextPlaceTime.split(":").map(Number);
        const nextPlaceTimeNum = nextHour * 100 + nextMinute;

        if (currentTime >= placeTimeNum && currentTime < nextPlaceTimeNum) {
          return i;
        }
      }
    }
    return 0; // 기본값
  };

  // 관광지 완료 토글 함수
  const togglePlaceCompleted = (placeId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === selectedCourse
          ? {
              ...course,
              travelDays: course.travelDays.map((day) => ({
                ...day,
                places: day.places.map((place) =>
                  place.id === placeId
                    ? { ...place, completed: !place.completed }
                    : place,
                ),
              })),
            }
          : course,
      ),
    );
  };

  // API 데이터를 컴포넌트에서 사용할 형태로 변환하는 함수
  const transformApiDataToCourses = (apiResponse: ApiResponse): Course[] => {
    return apiResponse.result.map((apiCourse, index) => {
      // 시간을 파싱하여 날짜와 시간 정보 추출
      const firstTime = new Date(
        apiCourse.courseComponentDtoList[0]?.time || "",
      );
      const dateStr = firstTime.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
      });

      const startTimeStr = firstTime.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // 혼잡도 변환 함수
      const convertCongestionLevel = (
        level: string,
      ): "low" | "medium" | "high" => {
        switch (level) {
          case "여유":
            return "low";
          case "보통":
            return "medium";
          case "혼잡":
            return "high";
          default:
            return "medium";
        }
      };

      // 장소 데이터 변환
      const places: Place[] = apiCourse.courseComponentDtoList.map(
        (component, placeIndex) => {
          const time = new Date(component.time);
          const timeStr = time.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          // 다음 장소와의 시간 차이 계산 (마지막 장소는 0분)
          let duration = "0분";
          if (placeIndex < apiCourse.courseComponentDtoList.length - 1) {
            const nextTime = new Date(
              apiCourse.courseComponentDtoList[placeIndex + 1].time,
            );
            const diffMinutes = Math.round(
              (nextTime.getTime() - time.getTime()) / (1000 * 60),
            );
            duration = `${diffMinutes}분`;
          }

          return {
            id: component.tourspotId,
            addressId: component.addressId,
            name: component.tourSpotName,
            type: "attraction" as const,
            typeLabel: "명소",
            time: `${timeStr}-${timeStr}`,
            duration,
            image: component.tourspotImg || "/attraction.jpg", // API 이미지 또는 기본 이미지
            crowdLevel: convertCongestionLevel(component.congestionLevel),
            coordinates: { lat: component.lat, lng: component.lon },
            completed: false,
          };
        },
      );

      return {
        id: apiCourse.courseId,
        name: `코스${index + 1}`,
        description: `${apiCourse.courseComponentDtoList.length}개 장소 방문`,
        duration: `${Math.ceil(apiCourse.courseComponentDtoList.length / 4)}박 ${Math.ceil(apiCourse.courseComponentDtoList.length / 4) + 1}일`,
        travelDays: [
          {
            day: 1,
            date: dateStr,
            startTime: startTimeStr,
            places,
          },
        ],
      };
    });
  };

  // 컴포넌트 마운트 시 API 데이터 로드
  useEffect(() => {
    // React Router state에서 API 응답 데이터를 받아옴
    const courseData = location.state?.courseData;

    if (!courseData || courseData.length === 0) {
      alert("코스 데이터가 없습니다. 홈에서 다시 검색해주세요.");
      navigate("/home");
      return;
    }

    if (courseData && courseData.length > 0) {
      // 전달받은 데이터를 API 응답 형식으로 변환
      const apiResponse: ApiResponse = {
        code: "COMMON_200",
        message: "성공입니다.",
        result: courseData,
        isSuccess: true,
      };

      const transformedCourses = transformApiDataToCourses(apiResponse);
      setCourses(transformedCourses);

      // URL 파라미터에 courseId가 있으면 해당 코스를 선택, 없으면 첫 번째 코스 선택
      if (params.courseId) {
        const courseExists = transformedCourses.find(
          (course) => course.id === params.courseId,
        );
        if (courseExists) {
          setSelectedCourse(params.courseId);
        } else {
          // 파라미터의 코스 ID가 존재하지 않으면 첫 번째 코스로 리다이렉트
          if (transformedCourses.length > 0) {
            navigate(`/courseDetail/${transformedCourses[0].id}`, {
              replace: true,
              state: location.state,
            });
          }
        }
      } else {
        // URL에 courseId가 없으면 첫 번째 코스로 리다이렉트
        if (transformedCourses.length > 0) {
          navigate(`/courseDetail/${transformedCourses[0].id}`, {
            replace: true,
            state: location.state,
          });
        }
      }
    } else {
      // 데이터가 없을 경우 빈 상태로 처리
      setCourses([]);
      setSelectedCourse(null);
    }
  }, [location.state, params.courseId, navigate, location]);

  const currentCourse = courses.find((course) => course.id === selectedCourse);

  useEffect(() => {
    // 혼잡도가 높은 다음 관광지가 있는지 확인
    if (currentCourse) {
      const firstDay = currentCourse.travelDays[0];
      const currentIndex = getCurrentPlaceIndex(firstDay.places);
      const nextPlace = firstDay?.places[currentIndex];

      if (nextPlace && nextPlace.crowdLevel === "high") {
        setShowCrowdWarning(true);
      } else {
        setShowCrowdWarning(false);
      }
    }
  }, [selectedCourse, currentCourse]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 혼잡도 경고 배너 */}
      {showCrowdWarning && currentCourse && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <div className="flex-1">
              <p className="font-medium">
                ⚠️{" "}
                {
                  currentCourse.travelDays[0]?.places[
                    getCurrentPlaceIndex(currentCourse.travelDays[0].places)
                  ]?.name
                }
                이 현재 혼잡합니다.
              </p>
              <p className="text-sm">대체 명소를 확인해보세요.</p>
            </div>
            <button
              onClick={() => setShowCrowdWarning(false)}
              className="text-red-700 hover:text-red-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* 왼쪽 사이드바 - 코스 선택 */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          {/* 헤더 */}
          <div className="p-4 border-b border-gray-200">
            <div className="mb-4">
              <div className="text-lg text-gray-600 mt-1">
                {currentCourse ? (
                  <>서울 {currentCourse.travelDays[0]?.date}</>
                ) : (
                  "코스를 선택해주세요"
                )}
              </div>
              {location.state?.searchParams && (
                <div className="text-sm text-gray-500 mt-2">
                  <div>목적지: {location.state.searchParams.tourspot}</div>
                  <div>
                    시간: {location.state.searchParams.startTime} ~{" "}
                    {location.state.searchParams.endTime}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 코스 선택 네비게이션 */}
          <div className="p-3">
            <p className="text-xs font-medium text-gray-700 mb-2">
              여행 코스 선택
            </p>
            <div className="flex flex-col space-y-2">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() =>
                    navigate(`/courseDetail/${course.id}`, {
                      state: location.state,
                    })
                  }
                  className={`w-full p-2 text-left rounded border transition-all ${
                    selectedCourse === course.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {course.name}
                      </p>
                      <div className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                        {course.duration}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-600 text-left">
                        {course.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCourseLike(course.id);
                        }}
                        className={`flex items-center justify-center text-base w-8 h-8 rounded-full transition-colors ${likedCourses.has(
                          course.id,
                        )}`}
                      >
                        <span
                          className={
                            likedCourses.has(course.id)
                              ? "text-red-500"
                              : "text-gray-400"
                          }
                        >
                          {likedCourses.has(course.id) ? "♥" : "♡"}
                        </span>
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <button className="flex-1 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                취소
              </button>
              <button className="flex-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                적용
              </button>
            </div>
          </div>
        </div>

        {/* 중간 사이드바 - 선택된 코스 상세 정보 */}
        <div className="w-96 bg-white border-r border-gray-200 min-h-screen">
          {currentCourse ? (
            <>
              {/* 코스 헤더 */}
              <div className="p-4 border-b border-gray-200">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {currentCourse.name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {currentCourse.description}
                </p>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
                  {currentCourse.duration}
                </div>
              </div>

              {/* 일차별 코스 상세 */}
              <div className="p-4">
                <div className="space-y-4">
                  {currentCourse.travelDays.map((day) => (
                    <div
                      key={day.day}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {day.day}일차
                        </p>
                        <span className="text-xs text-gray-600">
                          {day.date}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        시작: {day.startTime}
                      </div>

                      <div className="space-y-3">
                        {day.places.map((place, placeIndex) => {
                          const currentPlaceIndex = getCurrentPlaceIndex(
                            day.places,
                          );
                          const isCurrentPlace =
                            placeIndex === currentPlaceIndex;
                          const crowdLevelColors = {
                            high: "border-red-500",
                            medium: "border-yellow-500",
                            low: "border-green-500",
                          };
                          const crowdLevelBg = {
                            high: "bg-red-100",
                            medium: "bg-yellow-100",
                            low: "bg-green-100",
                          };

                          return (
                            <div key={place.id} className="relative">
                              {/* 장소 카드 */}
                              <div
                                className={`border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-sm ${
                                  isCurrentPlace
                                    ? `${crowdLevelColors[place.crowdLevel]} border-4 bg-blue-50`
                                    : `${crowdLevelColors[place.crowdLevel]} border-opacity-50`
                                } ${place.completed ? "opacity-60" : ""}`}
                                onClick={() => {
                                  setSelectedPlaceForAlternatives(place);
                                  setShowSideDrawer(true);
                                  // 연관 관광지 조회 (addressId 사용)
                                  console.log("관광지 클릭 - place:", place);
                                  console.log(
                                    "사용할 addressId:",
                                    place.addressId,
                                  );
                                  fetchRelatedTourSpots(place.addressId);
                                }}
                              >
                                <div className="flex items-start space-x-3">
                                  {/* 순서 번호 */}
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                      place.crowdLevel === "high"
                                        ? "bg-red-500"
                                        : place.crowdLevel === "medium"
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                    }`}
                                  >
                                    {placeIndex + 1}
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <p className="text-sm font-medium text-gray-900">
                                        {place.name}
                                      </p>
                                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                        {place.typeLabel}
                                      </span>
                                      {isCurrentPlace && (
                                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded font-medium">
                                          현재 방문
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex items-center space-x-3 text-xs text-gray-600">
                                      <span>⏰ {place.time}</span>
                                      <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${crowdLevelBg[place.crowdLevel]}`}
                                      >
                                        👥{" "}
                                        {place.crowdLevel === "high"
                                          ? "혼잡"
                                          : place.crowdLevel === "medium"
                                            ? "보통"
                                            : "여유"}
                                      </span>
                                    </div>
                                  </div>

                                  {/* 완료 체크박스 */}
                                  <div className="flex flex-col items-center space-y-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        togglePlaceCompleted(place.id);
                                      }}
                                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                        place.completed
                                          ? "bg-green-500 border-green-500 text-white"
                                          : "border-gray-300 hover:border-green-400"
                                      }`}
                                    >
                                      {place.completed && (
                                        <span className="text-xs">✓</span>
                                      )}
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600">
                                      <span className="text-xs">⋯</span>
                                    </button>
                                  </div>
                                </div>

                                {/* 장소 이미지 */}
                                <div className="mt-3">
                                  {place.image &&
                                  place.image !== "/attraction.jpg" ? (
                                    <img
                                      src={place.image}
                                      alt={place.name}
                                      className="w-full h-16 object-cover rounded"
                                      onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.nextElementSibling?.classList.remove(
                                          "hidden",
                                        );
                                      }}
                                    />
                                  ) : null}
                                  <div
                                    className={`w-full h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs cursor-pointer hover:bg-gray-300 transition-colors ${place.image && place.image !== "/attraction.jpg" ? "hidden" : ""}`}
                                  >
                                    📷 {place.name} 사진
                                  </div>
                                </div>

                                {/* 관광지 추가 버튼 (현재 방문지인 경우) */}
                                {isCurrentPlace && (
                                  <div className="mt-3 flex justify-center">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors flex items-center space-x-1">
                                      <span>+</span>
                                      <span>주변 관광지 추가</span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* 이동 시간 */}
                              {placeIndex < day.places.length - 1 && (
                                <div className="text-center py-2 text-xs text-gray-500 bg-gray-50 rounded mt-2 flex items-center justify-center space-x-2">
                                  <span>🚶‍♂️</span>
                                  <span>이동 시간: {place.duration}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">🗺️</div>
                <p className="text-sm font-medium">
                  {courses.length === 0
                    ? "추천 코스가 없습니다"
                    : "코스를 선택해주세요"}
                </p>
                <p className="text-xs">
                  {courses.length === 0
                    ? "검색 조건을 변경해서 다시 시도해보세요"
                    : "왼쪽에서 원하는 여행 코스를 선택하세요"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽 지도 패널 */}
        <div className="flex-1 bg-white">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-900">
                서울 여행 경로
              </p>
              {location.state?.searchParams?.tourspot && (
                <p className="text-sm text-gray-600">
                  목적지: {location.state.searchParams.tourspot}
                </p>
              )}
            </div>
          </div>

          {/* 지도 영역 */}
          <div className="h-[calc(100vh-120px)] bg-gray-100 relative">
            {currentCourse ? (
              <KakaoMap
                places={currentCourse.travelDays[0].places}
                courseName={currentCourse.name}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">🗺️</div>
                  <p className="text-lg font-medium">
                    {courses.length === 0
                      ? "추천 코스가 없습니다"
                      : "코스를 선택해주세요"}
                  </p>
                  <p className="text-sm">
                    {courses.length === 0
                      ? "다른 조건으로 다시 검색해보세요"
                      : "왼쪽 사이드바에서 원하는 여행 코스를 선택하세요"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사이드 드로어 - 주변 관광지 추천 */}
        {showSideDrawer && (
          <div className="fixed inset-0 z-50 flex">
            {/* 배경 오버레이 */}
            <div
              className="flex-1 bg-transparent"
              onClick={() => setShowSideDrawer(false)}
            />

            {/* 드로어 내용 */}
            <div className="w-96 bg-white shadow-xl overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedPlaceForAlternatives?.name} 주변 관광지
                  </p>
                  <button
                    onClick={() => setShowSideDrawer(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  혼잡도가 낮은 순으로 정렬되었습니다
                </p>
              </div>

              <div className="p-4 space-y-4">
                {/* 현재 선택된 관광지 정보 */}
                {selectedPlaceForAlternatives && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-blue-900">
                        현재 선택: {selectedPlaceForAlternatives.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedPlaceForAlternatives.crowdLevel === "high"
                            ? "bg-red-100"
                            : selectedPlaceForAlternatives.crowdLevel ===
                                "medium"
                              ? "bg-yellow-100"
                              : "bg-green-100"
                        }`}
                      >
                        {selectedPlaceForAlternatives.crowdLevel === "high"
                          ? "혼잡"
                          : selectedPlaceForAlternatives.crowdLevel === "medium"
                            ? "보통"
                            : "여유"}
                      </span>
                    </div>
                    <p className="text-xs text-blue-700">
                      ⏰ {selectedPlaceForAlternatives.time}
                    </p>
                  </div>
                )}

                {/* 연관 관광지 목록 */}
                {!isLoadingRelatedSpots && relatedTourSpots.length > 0 && (
                  <div className="mb-3 px-1">
                    <p className="text-sm text-gray-600">
                      총 {relatedTourSpots.length}개의 연관 관광지를 찾았습니다
                    </p>
                  </div>
                )}
                {isLoadingRelatedSpots ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-600">
                        연관 관광지를 불러오는 중...
                      </span>
                    </div>
                  </div>
                ) : relatedTourSpots.length > 0 ? (
                  relatedTourSpots.map((spot) => (
                    <div
                      key={spot.id}
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900 text-sm">
                          {spot.tourSpotName}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                            {spot.middleCtgr}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {spot.largeCtgr}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      연관 관광지가 없습니다
                    </p>
                    <p className="text-xs text-gray-500">
                      이 관광지 주변에는 추천할 만한 다른 관광지가 없습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
