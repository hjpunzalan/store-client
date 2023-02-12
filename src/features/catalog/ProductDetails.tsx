import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { priceFormat } from "src/app/util/util";
import NotFound from "src/errors/NotFound";
import { addBasketItemAsync, removeBasketItemAsync } from "src/features/basket/basketSlice";
import { fetchProductAsync, productSelectors } from "src/features/catalog/catalogSlice";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { basket, status: basketStatus } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) => productSelectors.selectById(state, id));
  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((item) => item.productId === product?.id);

  const updateQuantity = useCallback(async () => {
    if (!product) return;
    const itemQuantity = item?.quantity || 0;
    const diff = Math.abs(quantity - itemQuantity);

    try {
      if (quantity > itemQuantity) {
        dispatch(addBasketItemAsync({ productId: product.id, quantity: diff }));
      } else {
        dispatch(removeBasketItemAsync({ productId: product.id, quantity: diff }));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, item?.quantity, product, quantity]);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [dispatch, id, item, product]);

  if (productStatus === "pendingFetchProduct") return <LoadingComponent message="Loading product..." />;
  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {priceFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Types</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantiy in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} alignItems="stretch" mt={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity < 0) return;
                setQuantity(newQuantity);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              onClick={updateQuantity}
              loading={basketStatus.includes("pending")}
              disabled={quantity === item?.quantity || (!item && quantity === 0)}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              sx={{ height: "100%" }}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
