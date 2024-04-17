export type LoginCredentials = {
  email: string;
  password: string;
};

export type NewPasswordType = {
  password: string;
  confirmPassword: string;
};

export type ChangePasswordRequest = {
  oldPassword?: string;
  newPassword: string;
  confirmPassword?: string;
};
