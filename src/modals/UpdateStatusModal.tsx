import React from "react";
import withModal, { ModalProps } from "./withModal";

type Iprops = ModalProps;

const UpdateStatusModal: React.FC<Iprops> = ({ children }): JSX.Element => {
  return <>{children}</>;
};

export default withModal(UpdateStatusModal);
