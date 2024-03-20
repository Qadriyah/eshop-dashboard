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
    <label className="font-[500]">
      <span className="opacity-50">{label}</span>{" "}
      <span
        className={`text-red-500 font-extrabold text-base ${
          !props.required && "hidden"
        }`}
      >
        *
      </span>
      <input
        ref={ref}
        {...props}
        className={`${
          className
            ? className
            : "w-full p-2 bg-white rounded-none border border-[#d3d3d3] outline-none mt-1 font-normal"
        } ${error && "border-red-600 text-red-600"}`}
      />
      {error && <div className="text-red-600">{error}</div>}
    </label>
  );
});

export default Input;
