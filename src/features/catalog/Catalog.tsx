import { Button } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "src/features/catalog/catalogSlice";
import ProductList from "./ProductList";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status, filtersLoaded } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (status.includes("pending")) return <LoadingComponent message="Loading Products..." />;

  return (
    <>
      {products && <ProductList products={products} />}
      <Button variant="contained">Add Product</Button>
    </>
  );
};

export default Catalog;
