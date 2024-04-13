"use client";

import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { emailSchema } from "@/validation/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { formatErrors } from "@/utils/helpers";
import Link from "next/link";
import { resetPasswordRequest } from "@/api/actions/auth";

const ForgotPassword = () => {
  const router = useRouter();

  const emailMutation = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (data: { email: string }) => resetPasswordRequest(data),
  });

  const handleSubmit = async (values: { email: string }) => {
    const { errors } = await emailMutation.mutateAsync(values);
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }
    router.push("/forgot-password/success?source=instructions");
  };

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: emailSchema,
    validateOnBlur: true,
  });

  return (
    <div className="flex flex-col justify-center items-center p-5 h-screen max-w-[500px] mx-auto">
      <h2 className="text-3xl font-semibold lg:text-4xl my-10">
        Forgot Password?
      </h2>
      <form className="flex gap-5 flex-col" onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
          label="Enter your email to reset your password"
          error={formik.touched && formik.errors?.email && formik.errors?.email}
        />
        <Button
          type="submit"
          loading={emailMutation.isPending}
          disabled={emailMutation.isPending}
          className="bg-black text-white font-semibold p-3 hover:opacity-80 rounded-md"
        >
          Send instructions
        </Button>
        <div className="text-center mt-10 flex gap-2 justify-center">
          <div>Back to</div>
          <Link href="/" className="text-[#4081e9]">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
