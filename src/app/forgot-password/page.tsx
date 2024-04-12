"use client";

import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { emailSchema } from "@/validation/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordEmail } from "@/api/actions/customer";
import { formatErrors, notify } from "@/utils/helpers";
import Link from "next/link";

const ResetEmail = () => {
  const router = useRouter();

  const emailMutation = useMutation({
    mutationKey: ["reset-email"],
    mutationFn: (data: { email: string }) => sendPasswordEmail(data),
  });

  const handleSubmit = async (values: { email: string }) => {
    // const { message, errors, accessToken } = await emailMutation.mutateAsync(
    //   values
    // );
    // if (errors) {
    //   formik.setErrors(formatErrors(errors));
    // } else {
    //   notify(message, "success");
    //   console.log(accessToken, ">>>>>");
    // }
    router.push("/forgot-password/create-new-password");
  };

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: emailSchema,
    validateOnBlur: true,
  });

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <div className="pl-5 sm:w-[500px]">
        <h2 className="text-2xl font-semibold opacity-80 sm:text-3xl lg:text-4xl">
          Forgot Password?
        </h2>
        <p className="text-sm font-semibold opacity-60 sm:text-base md:mt-3 md:mb-4 mb-2 mt-3">
          Enter your email to reset your password
        </p>
      </div>
      <form className="p-5 -mt-7 sm:w-[500px]" onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
          error={formik.touched && formik.errors?.email && formik.errors?.email}
        />
        <div className="flex gap-3 mt-5">
          <Button
            type="submit"
            className="p-[10px] bg-[#4081e9] text-white rounded-lg w-full"
            loading={emailMutation.isPending}
            disabled={emailMutation.isPending}
          >
            Sumbit
          </Button>
        </div>
        <p className="font-semibold opacity-70 text-center mt-14 mb-20">
          Back to{" "}
          <Link href="/" className="text-[#4081e9]">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetEmail;
