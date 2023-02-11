import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "src/app/api/agent";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { Product } from "src/app/layout/models/product";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "src/features/catalog/catalogSlice";
import ProductList from "./ProductList";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded]);

  if (status.includes("pending")) return <LoadingComponent message="Loading Products..." />;

  return (
    <>
      {products && <ProductList products={products} />}
      <Button variant="contained">Add Product</Button>
    </>
  );
};

export default Catalog;
