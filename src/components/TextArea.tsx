import React, { TextareaHTMLAttributes } from "react";

type IProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

type Ref = HTMLTextAreaElement;

const TextArea = React.forwardRef<Ref, IProps>(function TextArea(
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
      <textarea
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

export default TextArea;
