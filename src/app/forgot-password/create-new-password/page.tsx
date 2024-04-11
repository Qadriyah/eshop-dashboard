"use client";

import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormik } from "formik";
import { ChangePasswordProps } from "@/types/entities";
import { confirmNotLoggedinSchema } from "@/validation/confirmPasswordSchema";
import withLayout from "../withLayout";
import { useRouter } from "next/navigation";

const CreateNewPassword = () => {
  const [matchError, setMatchError] = React.useState<string>("");
  const router = useRouter();

  const handleSubmit = (values: ChangePasswordProps) => {
    console.log(values, "::::");
    router.push("/forgot-password/confirmation");
  };

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      newPassword: "",
    },
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validationSchema: confirmNotLoggedinSchema,
  });

  React.useEffect(() => {
    if (formik.values.newPassword !== formik.values.confirmPassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  }, [matchError, formik.values.confirmPassword, formik.values.newPassword]);

  return (
    <div>
      <div className="pl-5 -mt-2">
        <p className="text-sm font-semibold opacity-60 sm:text-base md:mt-3 md:mb-4 mb-2 mt-3">
          Create new password
        </p>
      </div>
      <form
        className="p-5 flex flex-col gap-4 -mt-6"
        onSubmit={formik.handleSubmit}
      >
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
          // loading={changeForLoggedInMutation.isPending}
          // disabled={changeForLoggedInMutation.isPending}
          className="bg-[#4081e9] text-white font-semibold p-3 hover:opacity-80 w-[150px] rounded-md"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default withLayout(CreateNewPassword);
