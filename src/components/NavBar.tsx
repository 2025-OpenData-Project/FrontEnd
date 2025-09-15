import { useQuery } from "@tanstack/react-query";
import { getLoginInfo } from "../api/authLoginApi";
import LogInBtn from "./LogInBtn";
import MainPageLogo from "./MainPageLogo";
import HomeUserCard from "./homeC/HomeUserCard";

const NavBar = () => {
  const { data: loginInfo, isLoading } = useQuery({
    queryKey: ["loginInfo"],
    queryFn: getLoginInfo,
    staleTime: 5 * 60 * 1000, // 5분간 캐싱 (원하는 시간으로 조정)
    refetchOnWindowFocus: false,
  });

  return (
    <nav className="flex justify-between items-center bg-white shadow-sm border-b border-gray-200 p-4">
      <MainPageLogo />
      <div className="flex items-center gap-4">
        {isLoading ? null : loginInfo ? <HomeUserCard /> : <LogInBtn />}
      </div>
    </nav>
  );
};

export default NavBar;
