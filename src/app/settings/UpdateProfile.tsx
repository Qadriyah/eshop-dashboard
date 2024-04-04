"use client";

import React from "react";
import Input from "@/components/Input";
import withModal from "@/modals/withModal";
import { FormikValues, useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/actions/customer";
import Button from "@/components/Button";
import { updateSchema } from "@/validation/updateUserSchema";
import { formatErrors, notify } from "@/utils/helpers";
import { useAppSelector } from "@/lib/hooks";
import { ProfileType } from "@/types/entities";

const UpdateProfile: React.FC<{ closeModel: () => void }> = ({
  closeModel,
}): JSX.Element => {
  const loggedinUser = useAppSelector((state) => state.user.user);
  const [user] = React.useState<ProfileType>({
    firstName: `${loggedinUser?.firstName || ""}`,
    lastName: `${loggedinUser?.lastName || ""}`,
    phone: `${loggedinUser?.phone || ""}`,
  });
  const updateMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: any) => updateUser(loggedinUser?.user?.id!, data),
  });

  const handleSubmit = async (values: FormikValues) => {
    const { errors } = await updateMutation.mutateAsync(values);
    if (errors) {
      formik.setErrors(formatErrors(errors));
    } else {
      closeModel();
      notify("Profile Successfully updated", "success");
    }
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
        label="First name"
        placeholder="First name"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        type="text"
        required
        error={formik.touched && formik.errors.firstName}
      />
      <Input
        label="Last name"
        placeholder="Last name"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        type="text"
        required
        error={formik.touched && formik.errors.lastName}
      />
      <Input
        label="Phone number"
        placeholder="Phone number"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        type="text"
        required
        error={formik.touched && formik.errors.phone}
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

export default withModal<{ closeModel: () => void }>(UpdateProfile);
