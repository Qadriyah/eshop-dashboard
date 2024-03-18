import React from "react";

type LoaderProps = {
  color?: string;
  size?: string;
};

const Loader: React.FC<LoaderProps> = ({ color, size }) => {
  return (
    <div
      className={`inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
        color ? color : "text-white"
      } ${size ? size : "h-6 w-6"}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
