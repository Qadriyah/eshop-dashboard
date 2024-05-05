import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, InputProps>(function Input(
  { label, error, className, ...props },
  ref
) {
  return (
    <label>
      <span className="opacity-50 text-sm">{label}</span>{" "}
      {props.required && <span className={`text-red-500 text-base`}>*</span>}
      <input
        ref={ref}
        {...props}
        className={`${
          className
            ? className
            : "w-full p-2 bg-white rounded-none border border-[#d3d3d3] outline-none mt-1"
        } ${error && "border-red-600 text-red-600"}`}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </label>
  );
});

export default Input;
