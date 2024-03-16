import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import Loader from "./Loader";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    loading?: boolean;
    className: string;
  };

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <button {...props} disabled={loading} className={className}>
      <div className="flex justify-center items-center flex-1">
        {loading && <Loader />}
        <div className="flex">{children}</div>
      </div>
    </button>
  );
};

export default Button;
