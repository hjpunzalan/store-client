import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React from "react";

interface RadioButtonGroupProps {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, onChange, selectedValue }) => {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, name }) => (
          <FormControlLabel key={name} value={value} control={<Radio />} label={name} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
