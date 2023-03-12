import { Grid } from "@mui/material";
import { Product } from "src/app/layout/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((p) => (
          <Grid item xs={4} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
