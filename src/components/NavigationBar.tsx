import React from "react";
import SmallDeviceNav from "./SmallDeviceNav";
import NavigationComponent from "./NavigationComponent";

const NavigationBar: React.FC<{}> = (): JSX.Element => {
  return (
    <>
      <div className="large-device-container">
        <NavigationComponent classname="w-[100px] h-[50px]" />
      </div>
      <SmallDeviceNav />
    </>
  );
};

export default NavigationBar;
