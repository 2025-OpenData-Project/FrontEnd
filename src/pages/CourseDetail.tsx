import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import KakaoMap from "../components/KakaoMap";

// API 응답 데이터 인터페이스
interface ApiCourseComponent {
  tourSpotName: string;
  tourspotId: number;
  congestionLevel: "여유" | "보통" | "혼잡";
  time: string;
  lat: number;
  lon: number;
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
  const [selectedCourse, setSelectedCourse] = useState("course1");
  const [showCrowdWarning, setShowCrowdWarning] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

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
            name: component.tourSpotName,
            type: "attraction" as const,
            typeLabel: "명소",
            time: `${timeStr}-${timeStr}`,
            duration,
            image: "/attraction.jpg", // 기본 이미지
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

  // 컴포넌트 마운트 시 API 데이터 로드 (실제로는 props나 context로 받아올 예정)
  useEffect(() => {
    // 임시로 하드코딩된 API 응답 데이터 사용
    const mockApiResponse: ApiResponse = {
      code: "COMMON_200",
      message: "성공입니다.",
      result: [
        {
          courseId: "tempCourse:a8344d40-4d02-4be8-afcd-ed24c0122970",
          courseComponentDtoList: [
            {
              tourSpotName: "강남 MICE 관광특구",
              tourspotId: 6529,
              congestionLevel: "보통",
              time: "2025-09-01T19:00",
              lat: 37.626745,
              lon: 127.094353,
            },
            {
              tourSpotName: "미아사거리역",
              tourspotId: 6553,
              congestionLevel: "보통",
              time: "2025-09-01T21:00",
              lat: 37.61327836400571,
              lon: 127.03008663628454,
            },
            {
              tourSpotName: "성신여대입구역",
              tourspotId: 6561,
              congestionLevel: "보통",
              time: "2025-09-01T22:00",
              lat: 37.59296812939267,
              lon: 127.0171260607647,
            },
            {
              tourSpotName: "혜화역",
              tourspotId: 6580,
              congestionLevel: "여유",
              time: "2025-09-01T23:00",
              lat: 37.58204391787134,
              lon: 127.00194500977393,
            },
          ],
        },
        {
          courseId: "tempCourse:1ecb04db-f5f9-45c1-8a15-ed9dd6eff3c6",
          courseComponentDtoList: [
            {
              tourSpotName: "강남 MICE 관광특구",
              tourspotId: 6529,
              congestionLevel: "여유",
              time: "2025-09-01T20:00",
              lat: 37.626745,
              lon: 127.094353,
            },
            {
              tourSpotName: "미아사거리역",
              tourspotId: 6553,
              congestionLevel: "보통",
              time: "2025-09-01T21:00",
              lat: 37.61327836400571,
              lon: 127.03008663628454,
            },
            {
              tourSpotName: "성신여대입구역",
              tourspotId: 6561,
              congestionLevel: "보통",
              time: "2025-09-01T22:00",
              lat: 37.59296812939267,
              lon: 127.0171260607647,
            },
            {
              tourSpotName: "혜화역",
              tourspotId: 6580,
              congestionLevel: "여유",
              time: "2025-09-01T23:00",
              lat: 37.58204391787134,
              lon: 127.00194500977393,
            },
          ],
        },
        {
          courseId: "tempCourse:94e2d654-5d7b-4387-b6c7-c950802ab46e",
          courseComponentDtoList: [
            {
              tourSpotName: "강남 MICE 관광특구",
              tourspotId: 6529,
              congestionLevel: "여유",
              time: "2025-09-01T21:00",
              lat: 37.626745,
              lon: 127.094353,
            },
            {
              tourSpotName: "미아사거리역",
              tourspotId: 6553,
              congestionLevel: "보통",
              time: "2025-09-01T22:00",
              lat: 37.61327836400571,
              lon: 127.03008663628454,
            },
            {
              tourSpotName: "성신여대입구역",
              tourspotId: 6561,
              congestionLevel: "보통",
              time: "2025-09-01T23:00",
              lat: 37.59296812939267,
              lon: 127.0171260607647,
            },
          ],
        },
        {
          courseId: "tempCourse:c835c5cb-4174-4dc6-bd87-fa45e78273c2",
          courseComponentDtoList: [
            {
              tourSpotName: "명동 관광특구",
              tourspotId: 6531,
              congestionLevel: "보통",
              time: "2025-09-01T20:00",
              lat: 37.5626571977151,
              lon: 126.985209080382,
            },
            {
              tourSpotName: "북창동 먹자골목",
              tourspotId: 6633,
              congestionLevel: "보통",
              time: "2025-09-01T21:00",
              lat: 37.5614811760833,
              lon: 126.978006379609,
            },
            {
              tourSpotName: "광장(전통)시장",
              tourspotId: 6585,
              congestionLevel: "보통",
              time: "2025-09-01T22:00",
              lat: 37.55918176072071,
              lon: 126.9776267740439,
            },
            {
              tourSpotName: "남대문시장",
              tourspotId: 6634,
              congestionLevel: "여유",
              time: "2025-09-01T23:00",
              lat: 37.55918176072071,
              lon: 126.9776267740439,
            },
          ],
        },
        {
          courseId: "tempCourse:46b86a1e-c311-4d34-9a67-ad6ea05dbb61",
          courseComponentDtoList: [
            {
              tourSpotName: "명동 관광특구",
              tourspotId: 6531,
              congestionLevel: "여유",
              time: "2025-09-01T21:00",
              lat: 37.5626571977151,
              lon: 126.985209080382,
            },
            {
              tourSpotName: "북창동 먹자골목",
              tourspotId: 6633,
              congestionLevel: "여유",
              time: "2025-09-01T22:00",
              lat: 37.5614811760833,
              lon: 126.978006379609,
            },
            {
              tourSpotName: "광장(전통)시장",
              tourspotId: 6585,
              congestionLevel: "여유",
              time: "2025-09-01T23:00",
              lat: 37.55918176072071,
              lon: 126.9776267740439,
            },
          ],
        },
      ],
      isSuccess: true,
    };

    const transformedCourses = transformApiDataToCourses(mockApiResponse);
    setCourses(transformedCourses);

    // 첫 번째 코스를 기본 선택
    if (transformedCourses.length > 0) {
      setSelectedCourse(transformedCourses[0].id);
    }
  }, []);

  const currentCourse = courses.find((course) => course.id === selectedCourse);

  useEffect(() => {
    // 혼잡도가 높은 다음 관광지가 있는지 확인
    if (currentCourse) {
      const firstDay = currentCourse.travelDays[0];
      const nextPlace = firstDay?.places.find((place) => !place.completed);
      if (nextPlace && nextPlace.crowdLevel === "high") {
        setShowCrowdWarning(true);
      }
    }
  }, [selectedCourse, currentCourse]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 혼잡도 경고 배너 */}
      {showCrowdWarning && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <div className="flex-1">
              <p className="font-medium">
                ⚠️ 다음 방문할 관광지가 현재 혼잡합니다.
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
                  onClick={() => setSelectedCourse(course.id)}
                  className={`w-full p-2 text-left rounded border transition-all ${
                    selectedCourse === course.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {course.name}
                      </p>
                      <div className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                        {course.duration}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 text-left">
                      {course.description}
                    </p>
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
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
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
                        {day.places.map((place, placeIndex) => (
                          <div key={place.id} className="relative">
                            {/* 장소 카드 */}
                            <div className="border rounded-lg p-3 cursor-pointer transition-all hover:shadow-sm">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                  ⋮⋮
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <p className="text-sm font-medium text-gray-900">
                                      {place.name}
                                    </p>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                      {place.typeLabel}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                                    <span>⏰ {place.time}</span>
                                    <span>
                                      👥{" "}
                                      {place.crowdLevel === "high"
                                        ? "🔴"
                                        : place.crowdLevel === "medium"
                                          ? "🟡"
                                          : "🟢"}
                                    </span>
                                  </div>
                                </div>

                                <button className="text-gray-400 hover:text-gray-600">
                                  <span className="text-xs">⋯</span>
                                </button>
                              </div>

                              {/* 장소 이미지 */}
                              <div className="mt-3">
                                <div className="w-full h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                  📷 {place.name}
                                </div>
                              </div>
                            </div>

                            {/* 이동 시간 */}
                            {placeIndex < day.places.length - 1 && (
                              <div className="text-center py-2 text-xs text-gray-500 bg-gray-50 rounded mt-2">
                                이동 시간: {place.duration}
                              </div>
                            )}
                          </div>
                        ))}
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
                <p className="text-sm font-medium">코스를 선택해주세요</p>
                <p className="text-xs">
                  왼쪽에서 원하는 여행 코스를 선택하세요
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
                제주도 여행 경로
              </p>
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
                  <p className="text-lg font-medium">코스를 선택해주세요</p>
                  <p className="text-sm">
                    왼쪽 사이드바에서 원하는 여행 코스를 선택하세요
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
