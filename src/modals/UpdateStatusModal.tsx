import React from "react";
import withModal, { ModalProps } from "./withModal";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import { Radio } from "@mui/material";
import { SALE_STATUS } from "@/utils/constants";
import { SaleType } from "@/types/entities";
import { useFormik } from "formik";
import Button from "@/components/Button";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { GetSales, updateSale } from "@/api/actions/sales";
import { notify } from "@/utils/helpers";

type Iprops = ModalProps & {
  order: SaleType;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<GetSales, Error>>;
};

const UpdateStatusModal: React.FC<Iprops> = ({
  order,
  refetch,
  handleClose,
}): JSX.Element => {
  const updateStatusMutation = useMutation({
    mutationKey: ["update-status"],
    mutationFn: (data: any) => updateSale(order.id, data),
  });

  const handleSubmit = async (values: any) => {
    const { errors } = await updateStatusMutation.mutateAsync(values);
    if (errors) {
      notify(errors[0].message, "error");
      return;
    }
    refetch();
    notify("Order status has been updated successfully", "success");
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      status: order.status,
    },
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <RadioComponent
        id="status"
        name="status"
        formLabel=""
        value={formik.values.status}
      >
        <RadioInput
          ref_={false}
          value={SALE_STATUS.processing}
          label="Processing"
          onChange={formik.handleChange}
          control={<Radio />}
        />
        <RadioInput
          ref_={false}
          value={SALE_STATUS.completed}
          label="Completed"
          onChange={formik.handleChange}
          control={<Radio />}
        />
        <RadioInput
          ref_={false}
          value={SALE_STATUS.delivering}
          label="Delivering"
          onChange={formik.handleChange}
          control={<Radio />}
        />
        <RadioInput
          ref_={false}
          value={SALE_STATUS.returned}
          label="Returned"
          onChange={formik.handleChange}
          control={<Radio />}
        />
      </RadioComponent>
      <div className="flex justify-end">
        <Button
          id="submit"
          type="submit"
          // loading={props.loading}
          // disabled={props.loading}
          className="p-3 rounded-lg text-white bg-black hover:bg-gray-600 hover:opacity-70"
          style={{ backgroundColor: "#000" }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default withModal<Iprops>(UpdateStatusModal);
