"use client";

import React from "react";
import UserProfile from "./UserProfile";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleDrawer } from "@/lib/features/drawer";

const TopNavBar = () => {
  const dispatch = useAppDispatch();
  const drawerState = useAppSelector((state) => state.drawer);

  return (
    <div className="small-device-nav h-[75px] m-0 large-device-container bg-white flex items-center px-4">
      <div className="flex-1">
        <div onClick={() => dispatch(toggleDrawer())} id="toggler">
          <MdKeyboardDoubleArrowLeft
            className={`bg-white text-2xl rounded cursor-pointer absolute -ml-7 top-[25px] z-[60] ${
              !drawerState.open && "-rotate-180"
            }`}
          />
        </div>
      </div>
      <div className="mt-2">
        <UserProfile />
      </div>
    </div>
  );
};

export default TopNavBar;
