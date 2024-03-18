import React from "react";
import { PiWarningCircleThin } from "react-icons/pi";
import withModal, { ModalProps } from "./withModal";

type IProps = ModalProps & {
  message: string;
};

const ConfirmationModel: React.FC<IProps> = ({ message }): JSX.Element => {
  return (
    <div className="p-5 flex flex-col justify-center items-center md:w-[500px]">
      <PiWarningCircleThin fill="orange" className="w-[100px] h-[100px]" />
      <div className="mx-6 text-black">{message}</div>
    </div>
  );
};

export default withModal<IProps>(ConfirmationModel);
