import React, { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";

type IProps = SelectProps &
  PropsWithChildren & {
    boxWidth?: string | number;
  };

const SelectComponent: React.FC<IProps> = ({
  children,
  label,
  boxWidth = "100%",
  ...props
}): JSX.Element => {
  return (
    <Box sx={{ width: boxWidth }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select {...props}>{children}</Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
