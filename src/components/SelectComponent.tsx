import React, { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectProps = PropsWithChildren & {
  label: string;
  value?: string;
  boxWidth?: string | number;
  handleChange?: (event: SelectChangeEvent) => void;
  defaultValue?: string;
  name_?: string;
};

const SelectComponent: React.FC<SelectProps> = ({
  label,
  value,
  children,
  handleChange,
  boxWidth = 150,
  defaultValue,
  name_,
}): JSX.Element => {
  return (
    <Box sx={{ width: boxWidth }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          defaultValue={defaultValue}
          onChange={handleChange}
          name={name_}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
