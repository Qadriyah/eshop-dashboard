"use client";

import React from "react";
import { Divider, Space } from "antd";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import type { NextPage } from "next";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatErrors } from "@/utils/helpers";
import { loginValidationSchema } from "@/validation/loginSchema";
import { loginWithCredentials, loginWithGoogle } from "@/api/actions/auth";
import { LoginCredentials } from "@/types/requests";
import Link from "next/link";

const SignIn: NextPage = () => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginCredentials) => loginWithCredentials(data),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["login"],
      }),
  });

  const googleLoginMutation = useMutation({
    mutationKey: ["glogin"],
    mutationFn: () => loginWithGoogle(),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["glogin"],
      }),
  });

  const handleSubmit = async (values: LoginCredentials) => {
    const { errors } = await loginMutation.mutateAsync(values);
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }

    router.replace("/home");
  };

  const onLogin = async () => {
    const { authUrl, errors } = await googleLoginMutation.mutateAsync();
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }
    window.location.href = authUrl!;
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col md:flex-row max-w-[1700px]">
      <div className="flex-1 justify-center items-center p-10 sm:p-20 md:p-10 lg:p-20 bg-white">
        <div
          className="md:hidden cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/images/dlogo.png"
            width={70}
            height={70}
            alt="logo"
            className="mx-auto"
          />
        </div>
        <div className="text-center my-10">
          <h2 className="text-black font-bold mb-3 text-2xl sm:text-3xl">
            Sign In
          </h2>
        </div>
        <div>
          <Button
            onMouseOver={() => (ref.current!.style.color = "#3875d7")}
            onMouseLeave={() => (ref.current!.style.color = "rgb(55, 65, 81)")}
            className="w-full border border-[rgba(0 ,0, 0, .2)] rounded-md p-3 flex justify-center items-center btn-background hover:border-gray-400"
            onClick={onLogin}
          >
            <FcGoogle className="h-[25px] w-[25px]" />
            <div
              className=" opacity-90 font-semibold ml-2 text-gray-700"
              ref={ref}
            >
              Sign in with Google
            </div>
          </Button>
        </div>
        <Divider
          style={{ marginTop: 40, marginBottom: 40 }}
          className="text-2xl"
        >
          <div className="text-xl opacity-40">Or with email</div>
        </Divider>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Space direction="vertical" className="w-full">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  formik.touched && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
              />
              <div className="flex justify-between">
                <div></div>
                <Link
                  href="/forgot-password"
                  className="text-[#3875d7] opacity-80 text-right mt-1 mb-5 font-semibold cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
                className="w-full outline-none text-md p-2 border-none rounded-md text-white hover:opacity-80 bg-[#4081e9]"
              >
                Sigin In
              </Button>
            </Space>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden md:block bg-[#4081e9] min-h-screen p-10 lg:p-20">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image
            src="/assets/images/dlogo.png"
            width={70}
            height={40}
            alt="logo"
            className="mx-auto"
          />
          <p className="text-white text-center mt-5 text-3xl font-bold">
            Delightful Beauty
          </p>
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

export default SignIn;
