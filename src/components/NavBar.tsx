import { useEffect, useState } from "react";
import LogInBtn from "./LogInBtn";
import MainPageLogo from "./MainPageLogo";
import HomeUserCard from "./homeC/HomeUserCard";

// 쿠키 읽기 함수
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("access");
    if (token) {
      setIsLoggedIn(true);
      console.log("✅ 로그인 상태 - accessToken:", token);
    } else {
      setIsLoggedIn(false);
      console.log("❌ 로그아웃 상태");
    }
  }, []);

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
