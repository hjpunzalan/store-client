import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "src/features/catalog/catalogSlice";
import ProductList from "./ProductList";
import { ProductSearch } from "src/features/catalog/ProductSearch";

const sortOptions = [
  { value: "name", name: "Alphabetical" },
  { value: "priceDesc", name: "Price - High to low" },
  { value: "priceAsc", name: "Price - Low to high" },
];

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (status.includes("pending")) return <LoadingComponent message="Loading Products..." />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioGroup>
              {sortOptions.map(({ value, name }) => (
                <FormControlLabel key={name} value={value} control={<Radio />} label={name} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel key={brand} control={<Checkbox />} label={brand} />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel key={type} control={<Checkbox />} label={type} />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        {products && <ProductList products={products} />}
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography>Display 1-6 of 20 items</Typography>
          <Pagination color="secondary" size="large" count={10} page={2} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
