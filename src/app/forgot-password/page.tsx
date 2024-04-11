"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { emailSchema } from "@/validation/loginSchema";

const ResetEmail = () => {
  const [email, setEmail] = React.useState<string>("");
  const router = useRouter();

  const handleSubmit = (values: { email: string }) => {
    console.log(values, ">>>>");
  };

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: emailSchema,
    validateOnBlur: true,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
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
        <div className="p-5 sm:w-[450px] sm:mx-auto">
          <h2 className="text-2xl font-bold opacity-80 sm:text-3xl">
            Forgot Password?
          </h2>
          <p className="text-sm font-semibold opacity-60 sm:text-base">
            Enter your email to reset your password
          </p>
        </div>
        <form
          className="p-5 -mt-5 sm:w-[450px] sm:mx-auto"
          onSubmit={formik.handleSubmit}
        >
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
      <div className="hidden md:block bg-[#4081e9] min-h-screen p-10 lg:p-20">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image
            src="/assets/images/dlogo.png"
            width={70}
            height={40}
            alt="logo"
            className="mx-auto"
          />
          <div className="text-white text-center mt-5 text-3xl font-bold">
            Delightful Beauty
          </div>
        </div>
        <Image
          src="/assets/images/auth-screens.png"
          width={450}
          height={450}
          alt=""
          className="mx-auto my-20"
        />
        <p className="text-4xl text-white font-bold mt-8 text-center">
          Fast, Efficient and Reliable
        </p>
      </div>
    </div>
  );
};

export default ResetEmail;
