import type { ReactNode } from "react";
import NavBar from "../components/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh]">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
