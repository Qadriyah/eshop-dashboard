import React, { PropsWithChildren } from "react";
import SideNavBar from "@/components/SideNavBar";
import TopNavBar from "@/components/TopNavBar";
import "react-phone-number-input/style.css";

const RootLayout: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <div className="page-layout-open w-full" id="page-layout">
      <SideNavBar />
      <main className="duration-300">
        <TopNavBar />
        <div className="m-0 bg-[#f4f9fd] h-[86vh] p-5 overflow-y-scroll hide-scroll-bar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
