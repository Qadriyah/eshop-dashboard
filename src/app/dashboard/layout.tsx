"use client";

import React, { PropsWithChildren } from "react";
import NavigationBar from "@/components/NavigationBar";
import UserProfile from "@/components/UserProfile";

const RootLayout: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [width, setWidth] = React.useState<number>(0);

  React.useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);
  return (
    <div className="flex page-content w-full">
      <nav className={width >= 600 ? "w-[40%] max-w-[300px]" : "w-full"}>
        <NavigationBar />
      </nav>
      <main
        className={width >= 600 ? "min-w-[60%] lg:w-full w-full" : "w-full"}
      >
        <div className="small-device-nav p-4 m-0 large-device-container bg-white flex justify-between">
          <div></div>
          <div className="mt-2">
            <UserProfile />
          </div>
        </div>
        <div className="m-0 bg-[#f4f9fd] h-[86vh] p-5 overflow-y-scroll hide-scroll-bar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
