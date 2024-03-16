import React, { PropsWithChildren } from "react";

type IProps = {
  visible: boolean | string | null;
} & PropsWithChildren;

const ShouldRender = ({ visible, children }: IProps) => {
  return !visible ? null : <>{children}</>;
};

export default ShouldRender;
