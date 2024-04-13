"use client";

import React from "react";
import Dropdown from "./Dropdown";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { notify } from "@/utils/helpers";
import { logoutUser } from "@/api/actions/auth";
import { Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUser } from "@/lib/features/user";
import { PiSignOutBold } from "react-icons/pi";

const UserProfile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const data = useAppSelector((state) => state.user.user);

  const logoutMuutation = useMutation({
    mutationFn: () => logoutUser(),
  });

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    const { errors } = await logoutMuutation.mutateAsync();
    if (errors) {
      notify("Something went wrong", "error");
      return;
    }
    router.push("/");
  };

  React.useEffect(() => {
    (async () => {
      await dispatch(getUser());
    })();
  }, [dispatch]);

  return (
    <Dropdown
      id="image"
      showImage={true}
      image={data?.user?.avator || "/assets/images/user.svg"}
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
      open={open}
    >
      <div className="w-[300px] p-0">
        <div className="flex border-b border-[#d3d3d3] p-3">
          <Space direction="horizontal">
            <div
              className="h-[40px] w-[40px] rounded-full"
              style={{
                backgroundImage: `url(${
                  data?.user?.avator || "/assets/images/user.svg"
                })`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div>
              <h2 className="font-bold">{data?.fullName}</h2>
              <div className="text-sm text-black opacity-50">
                {data?.user?.email}
              </div>
            </div>
          </Space>
        </div>
        <div
          className="w-full cursor-pointer p-3 text-black hover:font-bold hover:text-[#3875d7] hover:bg-[#ededed] flex gap-1 items-center"
          onClick={onLogout}
        >
          <PiSignOutBold size={16} />
          <p>Sign Out</p>
        </div>
      </div>
    </Dropdown>
  );
};

export default UserProfile;
