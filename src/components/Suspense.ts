import { PropsWithChildren } from "react";

type IProps = {
  fallback: JSX.Element;
  loading: boolean;
} & PropsWithChildren;

const Suspense = ({ fallback, loading, children }: IProps) => {
  return loading ? fallback : children;
};

export default Suspense;
