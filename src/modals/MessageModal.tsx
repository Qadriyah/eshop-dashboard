import React from "react";
import withModal, { ModalProps } from "./withModal";

type IProps = ModalProps & {
  message: string;
  icon?: JSX.Element;
};

const MessageModal: React.FC<IProps> = ({ message, icon }) => {
  return (
    <div className="p-5 flex flex-col justify-center items-center md:w-[500px]">
      {icon}
      <div className="mx-6 my-10 text-black">{message}</div>
    </div>
  );
};

export default withModal<IProps>(MessageModal);
