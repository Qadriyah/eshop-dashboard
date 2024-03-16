import React from "react";
import { IoMdMenu } from "react-icons/io";
import NavigationComponent from "./NavigationComponent";
import UserProfile from "./UserProfile";

const SmallDeviceNav: React.FC<{}> = (): JSX.Element => {
  const [sideBar, setSideBar] = React.useState<boolean>(false);
  type Function = () => void;

  const onOpen: Function = () => setSideBar(true);
  const onClose: Function = () => setSideBar(false);

  return (
    <div className="small-device-container">
      <div
        className={
          sideBar
            ? "fixed top-0 left-0 w-[100%] hide-scroll-bar h-screen bg-black/90 z-10 duration-700 overflow-y-scroll"
            : "fixed top-0 left-[-100%] w-[100%] h-screen hide-scroll-bar bg-black/80 z-10 duration-700 overflow-y-scroll delay-200"
        }
      ></div>
      <div
        className={
          sideBar
            ? "fixed top-0 left-0 w-[65%] md:w-[40%] h-screen  bg-white z-10 duration-700 overflow-y-scroll delay-200 hide-scroll-bar"
            : "fixed top-0 left-[-100%] w-[65%] md:w-[40%] hide-scroll-bar h-screen bg-white z-10 duration-700 overflow-y-scroll"
        }
      >
        <NavigationComponent onClose={onClose} classname="w-[50px] h-[30px]" />
      </div>
      <div className="m-0 p-0 small-device-nav h-[60px] pt-2">
        <div className="p-2 pl-0 flex justify-between">
          <div className="flex">
            <img
              src="/assets/images/custom-1.png"
              alt=""
              className="rounded-full w-[80px] h-[30px] cursor-pointer -ml-3"
            />
            <IoMdMenu
              size={35}
              className="-mt-2 cursor-pointer text-black opacity-50 ml-3"
              onClick={onOpen}
            />
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default SmallDeviceNav;
