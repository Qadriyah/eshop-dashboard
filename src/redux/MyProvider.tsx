"use client";

import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

const MyProvider: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export default MyProvider;
