"use client";

import React from "react";
import UserDetail from "../UserDetail";
import { CiEdit } from "react-icons/ci";
import Card from "@/components/Card";
import { IoCamera, IoImagesSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, uploadUserImage } from "@/api/actions/customer";
import ShouldRender from "@/components/ShouldRender";
import Loader from "@/components/Loader";
import ChangePasswordModal from "../ChangePasswordModal";
import UpdateProfile from "../UpdateProfile";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserAvator } from "@/lib/features/user";

const Profile: React.FC = (): JSX.Element => {
  const loggedinUserId = Cookies.get("_session-token");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = React.useState<string>(
    "/assets/images/user.svg"
  );
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    React.useState<boolean>(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    React.useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const uploadMutation = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: (data: any) => uploadUserImage(loggedinUserId!, data),
  });

  const handleImageChange = async () => {
    const files = fileInputRef?.current?.files as FileList;
    const imagePath = URL.createObjectURL(files[0]);
    setSelectedImage(imagePath);
    const formData = new FormData();
    formData.append("image", files[0]);
    const { filePath } = await uploadMutation.mutateAsync(formData);
    dispatch(updateUserAvator(filePath));
  };

  const closeChangePasswordModalFn = (): void =>
    setOpenChangePasswordModal(false);
  const closeUpdateProfileModal = (): void => setOpenUpdateProfileModal(false);

  return (
    <div>
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
                <ShouldRender visible={!(user?.user?.avator || selectedImage)}>
                  <IoImagesSharp fill="#ccc" size={60} />
                </ShouldRender>
                <ShouldRender visible={false}>
                  <Loader />
                </ShouldRender>
                <div
                  className="relative cursor-pointer text-gray-400 hover:text-gray-600 -top-[50px] left-[55px]"
                  onClick={() => fileInputRef?.current?.click()}
                >
                  <IoCamera size={40} />
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleImageChange}
                  />
                </div>
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
                  value={
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          className="w-2 h-2 bg-black rounded-full"
                          key={item}
                        ></div>
                      ))}
                    </div>
                  }
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
            handleClose={closeChangePasswordModalFn}
          />
        </ShouldRender>
        <ShouldRender visible={openUpdateProfileModal}>
          <UpdateProfile
            open={openUpdateProfileModal}
            title="Change Profile"
            handleClose={closeUpdateProfileModal}
          />
        </ShouldRender>
      </div>
    </div>
  );
};

export default Profile;
