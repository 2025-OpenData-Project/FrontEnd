import LogInBtn from "./LogInBtn";
import MainPageLogo from "./MainPageLogo";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-white shadow-sm border-b border-gray-200 p-4">
      <MainPageLogo />
      <LogInBtn />
    </nav>
  );
};

export default NavBar;
