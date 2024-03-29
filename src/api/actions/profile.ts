import { ProfileType } from "@/types/entities";
import { getApi, patchApi, postApi } from "..";
import { getItem, setItem } from "../localstorage";

export type SessionDataType = {
  email: string;
};

export type GetProfile = {
  statusCode: number;
  profile: ProfileType;
};

export type UpdateProfile = {
  statusCode: number;
  profile: ProfileType;
  message: string;
};

export type UploadProfileImage = {
  statusCode: number;
  message: string;
  filename: string;
};

export const me = async (): Promise<GetProfile> => {
  const user = getItem<ProfileType>("user");
  if (user) {
    return {
      profile: user,
      statusCode: 200,
    };
  }
  const response = await getApi<GetProfile>({
    url: "/profile/me",
  });
  setItem("user", response.profile);
  return response;
};

export const uploadProfileImage = async (
  userId: string,
  data: FormData
): Promise<UploadProfileImage> => {
  const response = await postApi<UploadProfileImage>({
    url: `/files/upload/user/${userId}/avatar`,
    data,
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateProfile = async (
  userId: string,
  data: any
): Promise<UpdateProfile> => {
  const response = await patchApi<UpdateProfile>({
    url: `/profile/${userId}`,
    data,
  });
  return response;
};
