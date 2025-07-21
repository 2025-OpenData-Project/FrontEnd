import { MapPin } from "lucide-react";

const MainPageLogo = () => {
  const title: string = "서울 여유 여행";
  const subtitle: string = "붐비는 곳은 피하고, 여유롭게 즐기는 서울 관광";
  //번역을 생각해서 변수로 문자 선언

  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-12 h-12 text-blue-600" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default MainPageLogo;
