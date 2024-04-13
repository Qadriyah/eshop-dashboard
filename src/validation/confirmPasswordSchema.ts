import * as Yup from "yup";

export const confirmPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .matches(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {
      message: "Invalid password",
    })
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords don't match.")
    .required("Confirm password is required"),
});

export const createNewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {
      message: "Invalid password",
    })
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords don't match.")
    .required("Confirm password is required"),
});
