import { TextField, debounce } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { setProductParams } from "src/features/catalog/catalogSlice";

export const ProductSearch: React.FC = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
};
