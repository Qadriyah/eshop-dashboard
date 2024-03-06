"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Form, Formik, FormikValues, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { loginValidationSchema } from "@/validation/loginSchema";
import Input from "@/components/Input";
import QuickLink from "@/components/QuickLink";

interface LoginInfo {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  const handleSubmit = (
    values: FormikValues,
    { setErrors }: FormikHelpers<LoginInfo>
  ): void => {
    // We shall use setErrors to set errors that are coming from the backend
    router.push("/dashboard/products");
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-[1700px]">
      <div className="bg-[#3875d7] p-6 lg:hidden">
        <img
          src="/assets/images/custom-1.png"
          alt=""
          className="w-[110px] h-[65px] mx-auto"
        />
      </div>
      <div className="flex justify-center items-center lg:w-1/2 lg:pt-16">
        <div className="sm:p-10 p-5 pt-10 w-full sm:w-3/4 md:w-1/2 lg:w-3/4">
          <div className="mb-11 text-center">
            <h2 className="text-black font-bold mb-3 text-2xl sm:text-3xl">
              Sign In
            </h2>
            <p className="text-gray-500 font-semibold text-[16px] sm:text-[18px] opacity-70">
              Your Social Campaigns
            </p>
          </div>
          <form
            onMouseOver={() => (ref.current!.style.color = "#3875d7")}
            onMouseLeave={() => (ref.current!.style.color = "rgb(55, 65, 81)")}
            className="mb-9"
          >
            <Button
              type="button"
              className="w-full border border-[rgba(0 ,0, 0, .2)] rounded-md p-3 flex justify-center items-center btn-background focus:border-gray-400"
            >
              <FcGoogle className="h-[25px] w-[25px]" />
              <p
                className="text-gray-700 opacity-90 font-semibold ml-2"
                ref={ref}
              >
                Sign in with Google
              </p>
            </Button>
          </form>
          <div className="flex justify-center items-center mb-14">
            <span className="w-[30%] line-broken"></span>
            <span className="text-sm text-gray-500 font-semibold opacity-70 ml-2 mr-2">
              Or with email
            </span>
            <span className="w-[30%] line-broken"></span>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnBlur={false}
            validateOnMount={false}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }: FormikProps<LoginInfo>) => (
              <Form>
                <div className="mb-8">
                  <Input name="email" type="email" placeholder="Email" />
                </div>
                <Input name="password" type="password" placeholder="Password" />
                <div className="text-sm text-[#3875d7] opacity-80 text-right mt-1 mb-5 font-semibold cursor-pointer">
                  Forgot Password?
                </div>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full outline-none text-md p-3 border-none rounded-md text-white hover:opacity-80 bg-[#4081e9]"
                >
                  Sigin In
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-gray-500 mt-8 mb-6 text-center font-semibold text-[16px] sm:text-[18px] opacity-70">
            Not a member yet?{" "}
            <span className="text-[#4081e9] opacity-100 cursor-pointer">
              Sign up
            </span>
          </div>
          <div className="text-center">
            <QuickLink
              label="Terms"
              route="#"
              // classname="text-[#3875d7] m-2 text-sm opacity-80 font-semibold"
            />
            <QuickLink
              label="Plans"
              route="#"
              // classname="text-[#3875d7] m-2 text-sm opacity-80 font-semibold"
            />
            <QuickLink
              label="Contact Us"
              route="#"
              // classname="text-[#3875d7] m-2 text-sm opacity-80 font-semibold"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 bg-[#4081e9] min-h-screen p-12 pl-16 pr-16">
        <img
          src="/assets/images/custom-1.png"
          alt=""
          className="w-[130px] h-[80px] mx-auto"
        />
        <img
          src="/assets/images/auth-screens.png"
          alt=""
          className="w-full h-[450px] mt-10"
        />
        <p className="text-4xl text-white font-bold mt-8 text-center">
          Fast, Efficient and Productive
        </p>
      </div>
    </div>
  );
};

export default Login;
