import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { CheckBoxButtons } from "src/app/components/CheckBoxButtons";
import { RadioButtonGroup } from "src/app/components/RadioButtonGroup";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { ProductSearch } from "src/features/catalog/ProductSearch";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "src/features/catalog/catalogSlice";
import ProductList from "./ProductList";
import { history } from "src";
import { useLocation } from "react-router-dom";

const sortOptions = [
  { value: "name", name: "Alphabetical" },
  { value: "priceDesc", name: "Price - High to low" },
  { value: "price", name: "Price - Low to high" },
];

const Catalog = () => {
  const location = useLocation();
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(
    (state) => state.catalog
  );
  const pageSize = metaData && metaData.pageSize ? productParams.pageSize : 1;
  const nDisplayItems = `${productParams.pageNumber * pageSize - pageSize + 1}-${productParams.pageNumber * pageSize}`;

  // Update page number based on url query
  const params = new URLSearchParams(location.search);
  const currentPage = params.get("page") ? parseInt(params.get("page")!) : null;

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  useEffect(() => {
    if (!currentPage) return;
    dispatch(setProductParams({ pageNumber: currentPage }));
  }, [currentPage, dispatch, location.search]);

  if (status.includes("pending")) return <LoadingComponent message="Loading Products..." />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
          />
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <CheckBoxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
          />
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <CheckBoxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        {products && <ProductList products={products} />}
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography>
            Displaying {nDisplayItems}&nbsp;
            {metaData && `of ${metaData?.totalCount} items`}
          </Typography>
          <Pagination
            color="secondary"
            size="large"
            count={metaData?.totalPages || 1}
            page={productParams.pageNumber}
            onChange={(_, page) => history.push(`catalog?page=${page}`)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
