import React from "react";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

export const RadioInput: React.FC<FormControlLabelProps> = (
  props
): JSX.Element => {
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div
      className="border-dashed cursor-pointer border mb-4 hover:bg-[#c8dff5] hover:border-[dodgerblue] border-gray-400 rounded-lg w-full p-2"
      onClick={() => ref.current?.click()}
    >
      <FormControlLabel
        {...props}
        // inputRef={ref}
        value={value}
        control={control}
        label={label}
        sx={{
          ".MuiFormControlLabel-label": {
            opacity: 0.9,
            width: "100%",
            fontSize: "1.25rem",
          },
        }}
        onChange={handleClick}
      />
    </div>
  );
};
