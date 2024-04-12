"use client";

import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormik } from "formik";
import { ChangePasswordProps } from "@/types/entities";
import { confirmNotLoggedinSchema } from "@/validation/confirmPasswordSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="flex flex-col justify-center items-center mt-28">
      <div className="sm:w-[500px] p-5 w-full">
        <p className="text-2xl font-semibold opacity-80 sm:text-3xl lg:text-4xl">
          Create new password
        </p>
      </div>
      <form
        className="p-5 flex flex-col gap-4 -mt-6 sm:w-[500px] w-full"
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
          //   disabled={changeForLoggedInMutation.isPending && matchError}
          className="bg-[#4081e9] text-white font-semibold p-3 hover:opacity-80 rounded-md w-full"
        >
          Save
        </Button>
      </form>
      <p className="font-semibold opacity-70 text-center mt-14 mb-20">
        Back to{" "}
        <Link href="/" className="text-[#4081e9]">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default CreateNewPassword;
