import React, { PropsWithChildren } from "react";
import ModalComponent from "./ModalComponent";

type ModalProps = PropsWithChildren & {
  open: boolean;
  title: string;
  handleClose: () => void;
  onConfirm: () => void;
};

const AddModal: React.FC<ModalProps> = ({
  open,
  title,
  handleClose,
  onConfirm,
  children,
}): JSX.Element => {
  return (
    <ModalComponent
      title={title}
      open={open}
      handleClose={handleClose}
      onConfirm={onConfirm}
    >
      {children}
    </ModalComponent>
  );
};

export default AddModal;
