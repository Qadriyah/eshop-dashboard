"use client";

import React from "react";
import Input from "@/components/Input";
import withModal, { ModalProps } from "@/modals/withModal";
import { FormikValues, useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/actions/customer";
import Button from "@/components/Button";
import { updateSchema } from "@/validation/updateUserSchema";
import { formatErrors, notify } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import TelInput from "@/components/TelInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { updateUserProfile } from "@/lib/features/user";

const UpdateProfile: React.FC<ModalProps> = ({ handleClose }): JSX.Element => {
  const loggedinUser = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [phone, setPhone] = React.useState<string | null>(
    `${loggedinUser?.phone || ""}`
  );
  const [error, setError] = React.useState<string>("");
  const updateMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: any) => updateUser(loggedinUser?.user?.id!, data),
  });

  const handleSubmit = async (values: FormikValues) => {
    const data = { ...values };
    if (!values.firstName) delete data.firstName;
    if (!values.lastName) delete data.lastName;
    if (phone && isValidPhoneNumber(phone)) {
      data.phone = phone;
    }

    const { errors, profile } = await updateMutation.mutateAsync(data);

    if ((phone && !isValidPhoneNumber(phone)) || errors) {
      setError("Invalid phone number");
      formik.setErrors(formatErrors(errors!));
    } else {
      notify("Profile Successfully updated", "success");
      dispatch(updateUserProfile(profile));
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: `${loggedinUser?.firstName || ""}`,
      lastName: `${loggedinUser?.lastName || ""}`,
    },
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
        error={formik.touched && formik.errors.firstName}
      />
      <Input
        label="Last name"
        placeholder="Last name"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        type="text"
        error={formik.touched && formik.errors.lastName}
      />
      <div className="w-full">
        <TelInput
          value={phone}
          onChange={(value) => {
            setError("");
            setPhone(value);
          }}
          label="Phone Number"
          error={error}
        />
      </div>
      <Button
        className="bg-black p-3 text-white rounded-md"
        type="submit"
        loading={updateMutation.isPending}
        disabled={updateMutation.isPending}
      >
        Save
      </Button>
    </form>
  );
};

export default withModal<ModalProps>(UpdateProfile);
