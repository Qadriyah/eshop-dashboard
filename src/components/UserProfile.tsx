"use client";

import React from "react";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/api";

const UserProfile: React.FC<{}> = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useRouter();
  const mutation = useMutation({
    mutationFn: () =>
      postApi({ url: "/auth/logout", data: {}, customHeaders: {} }),
  });

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dropdown
      id="image"
      showImage={true}
      image="/assets/images/man_image.png"
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
      open={open}
    >
      <div className="w-[300px] p-0">
        <div className="flex border-b border-[#d3d3d3]">
          <img
            src="/assets/images/man_image.png"
            alt=""
            className="w-[55px] h-[55px] rounded-lg m-4 cursor-pointer"
          />
          <span className="mt-4">
            <h2 className="font-bold text-lg">Max Smith</h2>
            <p className="text-sm text-black opacity-50 font-semibold">
              maxsmith98@email.com
            </p>
          </span>
        </div>
        <div className="pl-4 pr-4 mt-2">
          <p
            className="w-full cursor-pointer rounded-lg p-2 text-black opacity-80 font-semibold hover:font-bold hover:text-[#3875d7] hover:bg-[#ededed]"
            onClick={() => {
              mutation.mutate();
              console.log(mutation?.data, ":::::::");
              if (mutation?.data) {
                navigate.push("/");
              }

              handleClose();
            }}
          >
            Sign Out
          </p>
        </div>
      </div>
    </Dropdown>
  );
};

export default UserProfile;
