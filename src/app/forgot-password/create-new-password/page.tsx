"use client";

import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormik } from "formik";
import { createNewPasswordSchema } from "@/validation/confirmPasswordSchema";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordWithLink } from "@/api/actions/auth";
import { NewPassword } from "@/types/requests";
import { formatErrors } from "@/utils/helpers";

const CreateNewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const passwordMutation = useMutation({
    mutationKey: ["create-new-password"],
    mutationFn: (data: NewPassword) => resetPasswordWithLink(data, token!),
  });

  const handleSubmit = async (values: NewPassword) => {
    const { errors } = await passwordMutation.mutateAsync(values);
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }
    router.push("/forgot-password/success?source=passwordreset");
  };

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validationSchema: createNewPasswordSchema,
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen p-5 max-w-[500px] mx-auto">
      <p className="text-3xl font-semibold lg:text-4xl my-10">
        Create new password
      </p>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <Input
          label="Enter password"
          placeholder="Password"
          required
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          error={formik.touched && formik.errors.password}
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
          loading={passwordMutation.isPending}
          disabled={passwordMutation.isPending}
          className="bg-black text-white font-semibold p-3 hover:opacity-80 rounded-md"
        >
          Save
        </Button>
      </form>
      <div className="text-center mt-10 flex gap-2 justify-center">
        <div>Back to</div>
        <Link href="/" className="text-[#4081e9]">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default CreateNewPassword;
