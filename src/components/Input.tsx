import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { BsInfoCircleFill } from "react-icons/bs";

type InputTypes = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const Input: React.FC<InputTypes> = ({ label, ...props }): JSX.Element => {
  const [field, { error }] = useField(props);

  return (
    <div className="mb-4">
      {label ? (
        <label
          htmlFor={field.name}
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
        {...field}
        {...props}
        id={field.name}
        name={field.name}
        className={`w-full outline-none placeholder:text-gray-500 placeholder:font-semibold placeholder:opacity-70 text-md p-3 border border-[rgba(0, 0, 0, .2)] rounded-md text-gray-500 focus:border-gray-400 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error ? (
        <div className="text-red-500 flex justify-start items-center ml-1">
          <BsInfoCircleFill />
          <span className="ml-2">{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
