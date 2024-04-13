"use client";

import React from "react";
import withModal, { ModalProps } from "@/modals/withModal";
import Input from "@/components/Input";
import { useFormik } from "formik";
import Button from "@/components/Button";
import { confirmPasswordSchema } from "@/validation/confirmPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ChangePasswordProps } from "@/types/entities";
import { formatErrors, notify } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/api/actions/auth";

const ChangePasswordModal: React.FC<ModalProps> = () => {
  const router = useRouter();
  const loggedinUserId = Cookies.get("_session-token");

  const changeForLoggedInMutation = useMutation({
    mutationKey: ["change-for-loggedin"],
    mutationFn: (data: ChangePasswordProps) =>
      resetPassword(loggedinUserId!, data),
  });

  const handleSubmit = async (values: ChangePasswordProps) => {
    const { errors, message } = await changeForLoggedInMutation.mutateAsync(
      values
    );
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }
    notify(message, "success");
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validationSchema: confirmPasswordSchema,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <Input
        label="Enter old password"
        placeholder="Enter old password"
        required
        name="oldPassword"
        value={formik.values.oldPassword}
        onChange={formik.handleChange}
        type="password"
        error={formik.touched && formik.errors.oldPassword}
      />
      <Input
        label="Enter new password"
        placeholder="Enter new password"
        required
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        type="password"
        error={formik.touched && formik.errors.newPassword}
      />
      <p className="-mt-5 p-1 text-sm opacity-45">
        Password should be at least 8 characters long and should contain a
        digit, uppercase and lowercase letters
      </p>
      <Input
        label="Confirm new password"
        placeholder="Confirm new password"
        required
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        type="password"
        error={formik.touched && formik.errors.confirmPassword}
      />
      <Button
        type="submit"
        loading={changeForLoggedInMutation.isPending}
        disabled={changeForLoggedInMutation.isPending}
        className="bg-black text-white font-semibold p-3 hover:opacity-80 w-[150px] rounded-md"
      >
        Save
      </Button>
    </form>
  );
};

export default withModal<ModalProps>(ChangePasswordModal);
