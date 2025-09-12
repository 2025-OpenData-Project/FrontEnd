// NavBar.tsx
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import LogInBtn from "./LogInBtn";
import MainPageLogo from "./MainPageLogo";
import HomeUserCard from "./homeC/HomeUserCard";

const NavBar = () => {
  const [cookies] = useCookies(["access"]); // 백엔드에서 설정한 쿠키 이름
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 쿠키 값 확인
    const token = cookies.access;
    if (token) {
      setIsLoggedIn(true);
      console.log("✅ 로그인 상태 - accessToken:", token);
    } else {
      setIsLoggedIn(false);
      console.log("❌ 로그아웃 상태");
    }
  }, [cookies]); // 쿠키가 바뀌면 다시 확인

  return (
    <nav className="flex justify-between items-center bg-white shadow-sm border-b border-gray-200 p-4">
      <MainPageLogo />
      <div className="flex items-center gap-4">
        {isLoggedIn ? <HomeUserCard /> : <LogInBtn />}
      </div>
    </nav>
  );
};

export default NavBar;
