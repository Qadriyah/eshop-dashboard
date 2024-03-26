import React from "react";
import withModal, { ModalProps } from "./withModal";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import { Radio } from "@mui/material";
import { SALE_STATUS } from "@/utils/constants";
import { SaleStatusType } from "@/types/entities";

type Iprops = ModalProps & {
  value: any;
  setStatus: (status: SaleStatusType) => void;
};

const UpdateStatusModal: React.FC<Iprops> = ({
  value,
  setStatus,
}): JSX.Element => {
  return (
    <RadioComponent
      id="discountType"
      name="discountType"
      formLabel=""
      defaultValue={value}
      value={value}
    >
      <RadioInput
        ref_={false}
        value={SALE_STATUS.processing}
        label="Processing"
        onChange={() => setStatus(SALE_STATUS.processing as SaleStatusType)}
        control={<Radio />}
      />
      <RadioInput
        ref_={false}
        value={SALE_STATUS.completed}
        label="Completed"
        onChange={() => setStatus(SALE_STATUS.completed as SaleStatusType)}
        control={<Radio />}
      />
      <RadioInput
        ref_={false}
        value={SALE_STATUS.delivering}
        label="Delivering"
        onChange={() => setStatus(SALE_STATUS.delivering as SaleStatusType)}
        control={<Radio />}
      />
      <RadioInput
        ref_={false}
        value={SALE_STATUS.returned}
        label="Returned"
        onChange={() => setStatus(SALE_STATUS.returned as SaleStatusType)}
        control={<Radio />}
      />
    </RadioComponent>
  );
};

export default withModal<Iprops>(UpdateStatusModal);
