import LogInBtn from "./LogInBtn";
import MainPageLogo from "./MainPageLogo";
import HomeUserCard from "./homeC/HomeUserCard";

// 쿠키에서 accesstoken 읽기 함수
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
  return null;
}

const NavBar = () => {
  const accessToken = getCookie("accesstoken");

  return (
    <nav className="flex justify-between items-center bg-white shadow-sm border-b border-gray-200 p-4">
      <MainPageLogo />
      <div className="flex items-center gap-4">
        {accessToken ? <HomeUserCard /> : <LogInBtn />}
      </div>
    </nav>
  );
};

export default NavBar;
