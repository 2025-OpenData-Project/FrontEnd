import type { ReactNode } from "react";
import NavBar from "../components/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-blue-50 to-white">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
