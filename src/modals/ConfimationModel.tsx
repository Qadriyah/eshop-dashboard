import React from "react";
import ModalComponent from "./ModalComponent";
import { PiWarningCircleThin } from "react-icons/pi";

type ConfirmationModelProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  handleClose: () => void;
  open: boolean;
};

const ConfirmationModel: React.FC<ConfirmationModelProps> = ({
  open,
  title,
  message,
  onConfirm,
  handleClose,
}): JSX.Element => {
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title={title}
      onConfirm={onConfirm}
    >
      <div className="p-5 flex flex-col justify-center items-center md:w-[500px]">
        <PiWarningCircleThin fill="orange" size={80} />
        <p className="mt-5 mb-6 text-black opacity-80">{message}</p>
      </div>
    </ModalComponent>
  );
};

export default ConfirmationModel;
