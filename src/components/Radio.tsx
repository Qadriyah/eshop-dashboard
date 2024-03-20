import React, { HTMLAttributes, PropsWithChildren } from "react";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type RadioProps = RadioGroupProps &
  PropsWithChildren & {
    formLabel: string;
  };

const RadioComponent: React.FC<RadioProps> = ({
  formLabel,
  children,
  ...props
}): JSX.Element => {
  return (
    <FormControl className="w-full">
      <FormLabel id="demo-radio-buttons-group-label" className="mb-1">
        <span className="text-gray-500 text-xl">{formLabel}</span>
      </FormLabel>
      <RadioGroup {...props}>{children}</RadioGroup>
    </FormControl>
  );
};

export default RadioComponent;
