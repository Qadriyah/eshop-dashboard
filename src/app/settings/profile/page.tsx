"use client";

import React from "react";
import UserDetail from "../_components/UserDetail";
import { CiEdit } from "react-icons/ci";
import Card from "@/components/Card";
import { IoCamera } from "react-icons/io5";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { uploadUserImage } from "@/api/actions/customer";
import ShouldRender from "@/components/ShouldRender";
import Loader from "@/components/Loader";
import ChangePasswordModal from "../../../modals/ChangePasswordModal";
import UpdateProfile from "../../../modals/UpdateProfileModal";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserAvator } from "@/lib/features/user";

const Profile = () => {
  const dispatch = useAppDispatch();
  const loggedinUserId = Cookies.get("_session-token");
  const [selectedImage, setSelectedImage] = React.useState<string>(
    "/assets/images/user.svg"
  );
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    React.useState<boolean>(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    React.useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);

  const uploadMutation = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: (data: any) => uploadUserImage(loggedinUserId!, data),
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (!files) {
      return;
    }

    const imagePath = URL.createObjectURL(files[0]);
    setSelectedImage(imagePath);
    const formData = new FormData();
    formData.append("image", files[0]);
    const { filePath } = await uploadMutation.mutateAsync(formData);
    dispatch(updateUserAvator(filePath));
  };

  return (
    <>
      <PageHeader title="User Details" />
      <div className="flex gap-5 flex-col">
        <div className="flex-1">
          <Card>
            <div className="p-5">
              <div
                className="w-[150px] h-[150px] rounded-full border flex justify-center items-center mx-auto"
                style={{
                  backgroundImage: `url(${
                    user?.user?.avator || selectedImage
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <label
                  htmlFor="file"
                  className={`relative cursor-pointer text-gray-400 hover:text-gray-600 ${
                    uploadMutation.isPending
                      ? "-top-[50px] left-[70px]"
                      : "-top-[50px] left-[55px]"
                  }`}
                >
                  <IoCamera size={40} />
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleImageChange}
                  />
                </label>
                <ShouldRender visible={uploadMutation.isPending}>
                  <Loader />
                </ShouldRender>
              </div>
              <span>
                <h2 className=" mt-5 opacity-80 text-lg text-center">
                  {user?.fullName}
                </h2>
                <div className="font-semibold opacity-55 text-center">
                  {user?.user?.email}
                </div>
              </span>
              <div className="opacity-90 mt-3 mb-4">Details</div>
              <div className="border-t border-dashed border-[#b6b3b3] pt-3">
                <UserDetail
                  label="Email"
                  value={user?.user?.email}
                  icon={<CiEdit />}
                  onEdit={() => setOpenUpdateProfileModal(true)}
                />
                <UserDetail label="Phone number" value={user?.phone} />
                <UserDetail
                  label="Password"
                  value="**********"
                  icon={<CiEdit />}
                  onEdit={() => setOpenChangePasswordModal(true)}
                />
              </div>
            </div>
          </Card>
        </div>
        <ShouldRender visible={openChangePasswordModal}>
          <ChangePasswordModal
            title="Change password"
            open={openChangePasswordModal}
            handleClose={() => setOpenChangePasswordModal(false)}
          />
        </ShouldRender>
        <ShouldRender visible={openUpdateProfileModal}>
          <UpdateProfile
            open={openUpdateProfileModal}
            title="Change Profile"
            handleClose={() => setOpenUpdateProfileModal(false)}
          />
        </ShouldRender>
      </div>
    </>
  );
};

export default Profile;
