import React from "react";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

type IProps = FormControlLabelProps & {
  error?: string;
};

const RadioInput: React.FC<IProps> = ({ error, ...props }): JSX.Element => {
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={`border-dashed cursor-pointer border hover:bg-[#c8dff5] hover:border-[dodgerblue] border-gray-400 rounded-lg w-full p-2 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
        onClick={() => ref.current?.click()}
      >
        <FormControlLabel
          {...props}
          inputRef={ref}
          sx={{
            ".MuiFormControlLabel-label": {
              opacity: 0.9,
              width: "100%",
            },
          }}
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
    </>
  );
};

export default RadioInput;
