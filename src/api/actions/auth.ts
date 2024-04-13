import { ApiResponse, ChangePasswordProps, ErrorType } from "@/types/entities";
import { patchApi, postApi } from "..";
import { LoginCredentials, NewPassword } from "@/types/requests";

export type SessionDataType = {
  email: string;
};

export interface LoginResponse extends ApiResponse {
  statusCode: number;
  message: string;
}

export interface GoogleAuthResponse extends ApiResponse {
  statusCode: number;
  authUrl: string;
}

export type CredentialsType = {
  email: string;
  password: string;
};

export interface ChangePasswordResponse extends ApiResponse {
  statusCode: number;
  message: string;
}

export interface EmailPasswordResponse extends ApiResponse {
  statusCode: number;
  message: string;
  accessToken: string;
}

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

export const resetPassword = async (
  id: string,
  data: ChangePasswordProps
): Promise<ChangePasswordResponse> => {
  const response = await patchApi<ChangePasswordResponse>({
    url: `/users/${id}/reset-password`,
    data,
  });

  return response;
};

export const resetPasswordRequest = async (data: {
  email: string;
}): Promise<EmailPasswordResponse> => {
  const response = await postApi<EmailPasswordResponse>({
    url: "/auth/reset-password-request",
    data,
  });

  return response;
};

export const resetPasswordWithLink = async (
  data: NewPassword,
  token: string
): Promise<ChangePasswordResponse> => {
  const response = await postApi<ChangePasswordResponse>({
    url: `/auth/reset-password-request/link?token=${token}`,
    data,
  });

  return response;
};
