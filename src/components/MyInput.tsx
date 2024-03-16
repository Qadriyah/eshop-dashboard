import React, { InputHTMLAttributes } from "react";

type MyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const MyInput: React.FC<MyInputProps> = ({ label, ...props }): JSX.Element => {
  return (
    <div className="mb-4">
      {label ? (
        <label
          htmlFor={props.name}
          className="text-gray-500 flex justify-start ml-1 font-semibold mb-1"
        >
          <span>{label}</span>
          <span
            className={`ml-1 text-red-500 ${
              !props.required && "hidden"
            } font-bold`}
          >
            *
          </span>
        </label>
      ) : null}
      <input
        id={props.name}
        className="w-full outline-none placeholder:text-gray-500 placeholder:font-semibold placeholder:opacity-70 text-md p-3 border border-[rgba(0, 0, 0, .2)] rounded-md text-gray-500 focus:border-gray-400"
      />{" "}
    </div>
  );
};

export default MyInput;
