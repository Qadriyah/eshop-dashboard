"use client";

import React from "react";
import Input from "@/components/Input";
import withModal from "@/modals/withModal";
import { FormikValues, useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/api/actions/customer";
import Cookies from "js-cookie";
import Button from "@/components/Button";
import { updateSchema } from "@/validation/updateUserSchema";
import { formatErrors } from "@/utils/helpers";

const UpdateEmail: React.FC = (): JSX.Element => {
  const userId = Cookies.get("_session-token");

  const loggedinUser = useQuery({
    queryKey: ["loggedin-user"],
    queryFn: () => getUser(userId!),
  }).data?.user;

  const [user] = React.useState<{ email: string }>({
    email: `${loggedinUser?.email || ""}`,
  });
  const updateMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: any) => updateUser(userId!, data),
  });

  const handleSubmit = async (values: FormikValues) => {
    const { errors } = await updateMutation.mutateAsync(values);
    if (errors) {
      formik.setErrors(formatErrors(errors));
    }
    console.log(errors, "eeee", updateMutation.data, ">>>>>>");
  };

  const formik = useFormik({
    initialValues: user,
    onSubmit: handleSubmit,
    validationSchema: updateSchema,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        placeholder="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        type="email"
        required
        error={formik.touched && formik.errors.email}
      />
      <Button
        className="bg-black p-3 w-20 text-white rounded-md"
        type="submit"
        loading={updateMutation.isPending}
        disabled={updateMutation.isPending}
      >
        Save
      </Button>
    </form>
  );
};

export default withModal(UpdateEmail);
