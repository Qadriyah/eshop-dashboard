import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const confirmPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Please enter the old password"),
  newPassword: Yup.string()
    .required("Please enter the new password")
    .password(),
  confirmPassword: Yup.string().required("Please confirm your password"),
});

export const confirmNotLoggedinSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Please enter the new password")
    .password(),
  confirmPassword: Yup.string().required("Please confirm your password"),
});
