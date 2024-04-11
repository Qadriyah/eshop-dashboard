"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { emailSchema } from "@/validation/loginSchema";
import Link from "next/link";
import PageLayout from "./PageLayout";

const ResetEmail = () => {
  const router = useRouter();

  const handleSubmit = (values: { email: string }) => {
    console.log(values, ">>>>");
    router.push("/forgot-password/create-new-password");
  };

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: emailSchema,
    validateOnBlur: true,
  });

  return (
    <PageLayout>
      <div>
        <div
          className="cursor-pointer md:hidden mt-20"
          onClick={() => router.push("/")}
        >
          <Image
            src="/assets/images/dlogo.png"
            width={70}
            height={40}
            alt="logo"
            className="mx-auto"
          />
          <div className="text-black text-center mt-5 text-xl opacity-90 font-bold">
            Delightful Beauty
          </div>
        </div>
        <div className="sm:w-[450px] md:w-full max-w-[550px] sm:mx-auto md:pl-10 md:pr-10">
          <p className="font-semibold opacity-70 text-center mt-14 mb-20 hidden md:block">
            Already a member?{" "}
            <Link href="/" className="text-[#4081e9]">
              Sign In
            </Link>
          </p>
          <div className="p-5">
            <h2 className="text-2xl font-semibold opacity-80 sm:text-3xl lg:text-4xl">
              Forgot Password?
            </h2>
            <p className="text-sm font-semibold opacity-60 sm:text-base md:mt-3 md:mb-4 mb-2 mt-3">
              Enter your email to reset your password
            </p>
          </div>
          <form className="p-5 -mt-5" onSubmit={formik.handleSubmit}>
            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              error={
                formik.touched && formik.errors?.email && formik.errors?.email
              }
            />
            <div className="flex gap-3 mt-5">
              <Button
                type="submit"
                className="p-[10px] bg-[#4081e9] text-white rounded-lg"
              >
                Sumbit
              </Button>
              <Button
                type="submit"
                className="p-[10px] bg-blue-100 hover:bg-[#4081e9] hover:text-white text-bg-[#4081e9] rounded-lg"
                onClick={() => router.replace("/")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResetEmail;
