import LogInBtn from "./LoginBtn";
import MainPageLogo from "./MainPageLogo";

const NavBar = () => {
  const title = "서울 여유 여행";
  return (
    <nav className="flex justify-between bg-white shadow-sm border-b border-gray-200 p-4">
      <MainPageLogo />
      <LogInBtn />
    </nav>
  );
};

export default NavBar;
