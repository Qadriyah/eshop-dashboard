"use client";

import React from "react";
import withModal, { ModalProps } from "@/modals/withModal";
import Input from "@/components/Input";
import { useFormik } from "formik";
import Button from "@/components/Button";
import { confirmPasswordSchema } from "@/validation/confirmPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordProps } from "@/types/entities";
import { changeForLoggedin } from "@/api/actions/customer";
import { useAppSelector } from "@/lib/hooks";
import { notify } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const ChangePasswordModal: React.FC<ModalProps> = ({
  handleClose,
}): JSX.Element => {
  const [matchError, setMatchError] = React.useState<string>("");
  const loggedinUserId = useAppSelector((state) => state.user?.user?.user?.id);
  const navigate = useRouter();

  const changeForLoggedInMutation = useMutation({
    mutationKey: ["change-for-loggedin"],
    mutationFn: (data: ChangePasswordProps) =>
      changeForLoggedin(loggedinUserId!, data),
  });

  const handleSubmit = async (values: ChangePasswordProps) => {
    const { errors, message } = await changeForLoggedInMutation.mutateAsync(
      values
    );
    if (errors) {
      notify(errors[0].message, "error");
    } else {
      notify(message, "success");
      handleClose();
      navigate.push("/");
    }
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

  React.useEffect(() => {
    if (formik.values.newPassword !== formik.values.confirmPassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  }, [matchError, formik.values.confirmPassword, formik.values.newPassword]);

  return (
    <>
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
        <Input
          label="Confirm new password"
          placeholder="Confirm new password"
          required
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          type="password"
          error={
            formik.touched && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : matchError
          }
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
    </>
  );
};

export default withModal<ModalProps>(ChangePasswordModal);

// we have 3 APIs for reset password
// 1. Is for the logged in user ie :id/reset-password
// Add a password policy
// 2. not loggedinin: auth controller reset-password-requst
// reset-password route
// Show a success screen
