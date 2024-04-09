import React from "react";
import PhoneInput, {
  DefaultInputComponentProps,
} from "react-phone-number-input";

type IProps = DefaultInputComponentProps & {
  label?: string;
  error?: string;
  onChange: (value: any) => void;
};

const TelInput: React.FC<IProps> = ({ label, error, ...props }) => {
  return (
    <label className="font-[500]">
      <span className="opacity-50 text-sm">{label}</span>{" "}
      <span
        className={`text-red-500 font-extrabold ${!props.required && "hidden"}`}
      >
        *
      </span>
      <PhoneInput
        {...props}
        defaultCountry="US"
        placeholder="Phone number"
        className="p-2 w-full border border-[#d3d3d3]"
        numberInputProps={{
          style: {
            outline: "2px solid transparent",
            outlineOffset: "2px",
            backgroundColor: "white",
          },
        }}
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </label>
  );
};

export default TelInput;
