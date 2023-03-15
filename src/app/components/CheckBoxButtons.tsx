import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useState } from "react";

interface CheckBoxButtonsProps {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export const CheckBoxButtons: React.FC<CheckBoxButtonsProps> = ({ items, checked, onChange }) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const handleChecked = (value: string) => {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];

    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  };

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          control={<Checkbox checked={checkedItems.indexOf(item) !== -1} onClick={() => handleChecked(item)} />}
          label={item}
        />
      ))}
    </FormGroup>
  );
};
