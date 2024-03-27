"use client";

import React from "react";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notify } from "@/utils/helpers";
import { logoutUser } from "@/api/actions/auth";
import withAuth from "@/app/withAuth";
import { Space } from "antd";
import { me } from "@/api/actions/profile";

type IProps = {
  isAuthenticated: string;
};

const UserProfile: React.FC<IProps> = ({ isAuthenticated }): JSX.Element => {
  const navigate = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
    enabled: !!isAuthenticated,
  });

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
    navigate.replace("/");
  };

  return (
    <Dropdown
      id="image"
      showImage={true}
      image={data?.profile?.user?.avator || "/assets/images/user.svg"}
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
                  data?.profile?.user?.avator || "/assets/images/user.svg"
                })`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div>
              <h2 className="font-bold">{data?.profile?.fullName}</h2>
              <div className="text-sm text-black opacity-50">
                {data?.profile?.user?.email}
              </div>
            </div>
          </Space>
        </div>
        <div
          className="w-full cursor-pointer p-3 text-black hover:font-bold hover:text-[#3875d7] hover:bg-[#ededed]"
          onClick={onLogout}
        >
          Sign Out
        </div>
      </div>
    </Dropdown>
  );
};

export default withAuth(UserProfile);
