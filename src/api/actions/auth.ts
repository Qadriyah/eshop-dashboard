import { ErrorType } from "@/types/entities";
import { postApi } from "..";
import { LoginCredentials } from "@/types/requests";

export type SessionDataType = {
  email: string;
};

export type LoginResponse = {
  statusCode: number;
  message: string;
  errors?: ErrorType[];
};

export type GoogleAuthResponse = {
  statusCode: number;
  authUrl: string;
  errors?: ErrorType[];
};

export type CredentialsType = {
  email: string;
  password: string;
};

export const loginWithGoogle = async (): Promise<GoogleAuthResponse> => {
  const response = await postApi<GoogleAuthResponse>({
    url: "/auth/google-auth-url",
  });
  return response;
};

export const loginWithCredentials = async (
  data: LoginCredentials
): Promise<LoginResponse> => {
  const response = await postApi<LoginResponse>({
    url: "/auth/login",
    data,
  });
  return response;
};

export const logoutUser = async (): Promise<LoginResponse> => {
  const response = await postApi<LoginResponse>({
    url: "/auth/logout",
  });
  return response;
};
