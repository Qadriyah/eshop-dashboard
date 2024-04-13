"use client";

import React from "react";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/actions/customer";
import UserDetail from "../../_components/UserDetail";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(userId),
  }).data?.user;

  return (
    <div className="">
      <PageHeader title="User Details" />
      <div className="flex gap-5 flex-col">
        <div className="flex-1">
          <Card>
            <div className="p-5">
              <div
                className="w-[150px] h-[150px] rounded-full border flex justify-center items-center mx-auto"
                style={{
                  backgroundImage: `url(${
                    user?.avator || "/assets/images/user.svg"
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <span>
                <h2 className=" mt-5 opacity-80 text-lg text-center">
                  {user?.profile?.fullName}
                </h2>
                <div className="font-semibold opacity-55 text-center">
                  {user?.email}
                </div>
              </span>
              <div className="opacity-90 mt-3 mb-4">Details</div>
              <div className="border-t border-dashed border-[#b6b3b3] pt-3">
                <UserDetail label="Email" value={user?.email!} />
                <UserDetail
                  label="Phone number"
                  value={user?.profile?.phone!}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
