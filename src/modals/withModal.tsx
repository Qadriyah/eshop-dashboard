import React from "react";
import Button from "@/components/Button";
import ShouldRender from "@/components/ShouldRender";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export type ModalProps = {
  key?: string;
  title: string;
  subTitle?: string;
  open: boolean;
  handleOk?: () => void;
  handleClose: () => void;
  okText?: string;
  okBtnColor?: string;
  loading?: boolean;
};

export default function withModal<T>(WrappedComponent: any) {
  return function NewComponent(props: ModalProps & T) {
    const handleOk = () => {
      if (props.handleOk) {
        props.handleOk();
      }
    };

    return (
      <Dialog open={props.open} onClose={props.handleClose} fullWidth={true}>
        <DialogTitle>
          <div className="font-bold text-xl">{props.title}</div>
          <ShouldRender visible={!!props.subTitle}>
            <div className="mt-2">{props.subTitle}</div>
          </ShouldRender>
        </DialogTitle>
        <DialogContent dividers>
          <div className="px-5 text-xl">
            <WrappedComponent {...props} />
          </div>
        </DialogContent>
        <DialogActions className="p-5">
          <div className="text-xl">
            <Button
              onClick={props.handleClose}
              className="p-3 rounded-lg text-black hover:text-blue-600 bg-white"
            >
              Close
            </Button>
            {props.handleOk && (
              <Button
                onClick={handleOk}
                loading={props.loading}
                disabled={props.loading}
                className="p-3 rounded-lg text-white bg-black hover:bg-gray-600"
                style={{ backgroundColor: "#000" }}
              >
                Ok
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    );
  };
}
