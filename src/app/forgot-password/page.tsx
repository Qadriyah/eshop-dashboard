"use client";

import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { emailSchema } from "@/validation/loginSchema";
import withLayout from "./withLayout";

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
    <>
      <div className="pl-5 -mt-2">
        <p className="text-sm font-semibold opacity-60 sm:text-base md:mt-3 md:mb-4 mb-2 mt-3">
          Enter your email to reset your password
        </p>
      </div>
      <form className="p-5 -mt-7" onSubmit={formik.handleSubmit}>
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
    </>
  );
};

export default withLayout(ResetEmail);
