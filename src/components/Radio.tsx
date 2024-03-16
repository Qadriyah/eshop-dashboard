import React, { HTMLAttributes, PropsWithChildren } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type RadioProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    formLabel: string;
    defaultValue?: string;
  };

const RadioComponent: React.FC<RadioProps> = ({
  formLabel,
  children,
  defaultValue,
}): JSX.Element => {
  return (
    <div>
      <FormControl className="w-full">
        <FormLabel id="demo-radio-buttons-group-label" className="mb-1">
          <span className="text-gray-500 font-semibold text-sm">
            {formLabel}
          </span>
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={defaultValue}
          name="radio-buttons-group"
        >
          {children}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioComponent;
