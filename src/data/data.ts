import type { SlideData } from "../utils/interface";

export const touristSpots: SlideData[] = [
  {
    image: "https://placehold.co/800x400",
    name: "북촌 한옥마을",
    description: "전통 한옥의 아름다움을 느낄 수 있는 조용한 골목길",
  },
  {
    image: "https://placehold.co/800x400",
    name: "이화동 벽화마을",
    description: "알록달록한 벽화와 함께하는 예술적인 산책",
  },
  {
    image: "https://placehold.co/800x400",
    name: "서울숲",
    description: "도심 속 자연을 만끽할 수 있는 힐링 공간",
  },
  {
    image: "https://placehold.co/800x400",
    name: "청계천",
    description: "도심을 가로지르는 평화로운 물길",
  },
];

export const locations = [
  "장소를 선택해주세요",
  "4·19 카페거리",
  "DDP(동대문디자인플라자)",
  "DMC(디지털미디어시티)",
  "가락시장",
  "가로수길",
  "가산디지털단지역",
  "강남 MICE 관광특구",
  "강남역",
  "강서한강공원",
  "고덕역",
  "고속터미널역",
  "고척돔",
  "교대역",
  "구로디지털단지역",
  "구로역",
  "군자역",
  "금호동 맛집거리",
  "기타",
  "남대문시장",
  "남산공원",
  "남구로역",
  "대림역",
  "덕수궁",
  "덕수궁길·정동길",
  "동대문 관광특구",
  "동대문역",
  "뚝섬역",
  "DDP(동대문디자인플라자)",
  "디지털미디어시티",
  "명동 관광특구",
  "미아사거리역",
  "발산역",
  "방배역 먹자골목",
  "보신각",
  "북서울꿈의숲",
  "북창동 먹자골목",
  "북한산우이역",
  "북촌한옥마을",
  "사당역",
  "삼각지역",
  "서울 광장",
  "서울숲공원",
  "서울대공원",
  "서울식물원·마곡나루역",
  "서울역",
  "선릉역",
  "성수카페거리",
  "성신여대입구역",
  "수유역",
  "신논현역·논현역",
  "신도림역",
  "신림역",
  "신촌·이대역",
  "서울식물원",
  "시청역",
  "양재역",
  "연신내역",
  "연남동",
  "여의도",
  "여의도한강공원",
  "오목교역·목동운동장",
  "왕십리역",
  "용산역",
  "용리단길",
  "이촌한강공원",
  "이태원 관광특구",
  "이태원역",
  "장지역",
  "장한평역",
  "청담동 명품거리",
  "청계산",
  "청와대",
  "청량리 제기동 일대 전통시장",
  "총신대입구(이수)역",
  "충정로역",
  "합정역",
  "혜화역",
  "홍대 관광특구",
  "홍대입구역(2호선)",
  "회기역",
  "해방촌·경리단길",
  "홍대입구역",
  "이태원 앤틱가구거리",
  "창동 신경제 중심지",
  "창덕궁·종묘",
  "청계산",
  "청와대",
  "명동",
];

export const touristSpotsResponse = {
  code: "200",
  message: "성공",
  result: {
    tourspotNm: "북촌한옥마을",
    address: {
      addressKorNm: "서울특별시 종로구 계동길 37",
      addressDetail: "북촌한옥마을 일대",
      latitude: "37.5796",
      longitude: "126.9825",
    },
    congestionLabel: "보통",
    tourSpotEvents: [
      {
        tourspotEventId: 1,
        eventName: "한옥 체험 프로그램",
        eventPeriod: "2025-08-01 ~ 2025-08-31",
        eventPlace: "북촌문화센터",
        eventX: 37.5796,
        eventY: 126.9825,
        tourspotThumbnail: "https://placehold.co/300x200",
        tourspotUrl: "https://bukchon.seoul.go.kr",
      },
      {
        tourspotEventId: 2,
        eventName: "전통 차 체험",
        eventPeriod: "2025-08-15 ~ 2025-09-15",
        eventPlace: "한옥 찻집",
        eventX: 37.5798,
        eventY: 126.9827,
        tourspotThumbnail: "https://placehold.co/300x200",
        tourspotUrl: "https://bukchon.seoul.go.kr/tea",
      },
    ],
    tourSpotTags: [
      {
        tourSpotCategory: "문화유산",
      },
      {
        tourSpotCategory: "전통건축",
      },
      {
        tourSpotCategory: "체험",
      },
      {
        tourSpotCategory: "사진촬영",
      },
    ],
  },
  isSuccess: true,
};

export const faqData = [
  {
    question: "코스 추천은 어떻게 이루어지나요?",
    answer:
      "사용자의 위치, 선호도, 혼잡도 정보를 종합하여 최적의 여행 코스를 추천해드립니다.",
  },
  {
    question: "혼잡도 정보는 얼마나 정확한가요?",
    answer:
      "한국관광공사의 실시간 데이터와 예측 모델을 활용하여 높은 정확도의 혼잡도 정보를 제공합니다.",
  },
  {
    question: "코스 변경이 가능한가요?",
    answer:
      "네, 여행 중에도 실시간으로 코스를 변경하고 대체 관광지를 추천받을 수 있습니다.",
  },
  {
    question: "무료로 이용할 수 있나요?",
    answer:
      "기본 기능은 무료로 이용 가능하며, 프리미엄 기능은 유료 플랜을 통해 이용하실 수 있습니다.",
  },
  {
    question: "어떤 지역을 지원하나요?",
    answer:
      "현재 서울, 부산, 제주도 등 주요 관광지를 지원하며, 지속적으로 확대하고 있습니다.",
  },
  {
    question: "모바일에서도 이용할 수 있나요?",
    answer: "네, 웹과 모바일 모두에서 최적화된 서비스를 제공합니다.",
  },
  {
    question: "여행 기록을 저장할 수 있나요?",
    answer: "마이페이지에서 과거 여행 기록을 확인하고 관리할 수 있습니다.",
  },
  {
    question: "언어 설정을 변경할 수 있나요?",
    answer:
      "한국어, 영어, 일본어, 중국어를 지원하며 마이페이지에서 변경 가능합니다.",
  },
];
