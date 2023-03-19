import { TextField, debounce } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { redirectAddParams } from "src/features/catalog/Catalog";
import { setProductParams } from "src/features/catalog/catalogSlice";

export const ProductSearch: React.FC = () => {
  const location = useLocation();
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const params = new URLSearchParams(location.search);
  const currentSearch = params.get("searchTerm");

  useEffect(() => {
    if (!currentSearch) return;
    dispatch(setProductParams({ searchTerm: currentSearch }));
  }, [currentSearch, dispatch]);

  const debouncedSearch = debounce((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    redirectAddParams("searchTerm", event.target.value);
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
