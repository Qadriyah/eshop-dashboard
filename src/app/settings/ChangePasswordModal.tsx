"use client";

import React from "react";
import withModal from "@/modals/withModal";
import Input from "@/components/Input";
import { FormikValues, useFormik } from "formik";
import Button from "@/components/Button";
import { ChangePasswordProps } from "@/types/entities";

type IProps = {
  closeModal: () => void;
};

const ChangePasswordModal: React.FC<IProps> = ({ closeModal }): JSX.Element => {
  const [password] = React.useState<ChangePasswordProps>({
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  });

  const handleSubmit = (values: FormikValues) => {
    console.log(values, ">>>>>>");
    closeModal();
  };

  const formik = useFormik({
    initialValues: password,
    onSubmit: handleSubmit,
    validateOnBlur: true,
  });

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
          error={formik.touched && formik.errors.confirmPassword}
        />
        <Button
          type="submit"
          className="bg-black text-white font-semibold p-3 hover:opacity-80 w-[100px] rounded-md"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default withModal<IProps>(ChangePasswordModal);
