import React, { HTMLAttributes, PropsWithChildren } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "../components/Button";

type ModalProps = HTMLAttributes<HTMLElement> &
  PropsWithChildren & {
    title: string;
    open: boolean;
    handleClose: () => void;
    onConfirm: () => void;
  };

const ModalComponent: React.FC<ModalProps> = ({
  title,
  open,
  children,
  handleClose,
  onConfirm,
}): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="font-semibold">{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className="font-bold p-2 sm:p-3 w-24 rounded-lg bg-transparent hover:bg-[#eafdfd] hover:opacity-80 hover:text-[#3875d7] text-black m-2 opacity-90"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className="font-bold p-2 sm:p-3 w-24 rounded-lg text-white hover:opacity-80 bg-[#4081e9]"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalComponent;
