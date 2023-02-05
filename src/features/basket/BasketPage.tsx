import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { priceFormat } from "src/app/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "src/features/basket/basketSlice";
import BasketSummary from "./BasketSummary";

const BasketPage = () => {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  if (!basket) return <Typography variant="h3"> Your basket is Empty</Typography>;
  return (
    <Stack spacing={4}>
      <h1>Buyer Id = {basket.buyerId}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{
                  textDecoration: "unset",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center" component={Link} to={`/catalog/${item.productId}`}>
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                    <span style={{ textDecoration: "none" }}>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{priceFormat(item.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status.includes("pendingRemoveItem" + item.productId)}
                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1 }))}
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>

                  {item.quantity}
                  <LoadingButton
                    loading={status.includes("pendingAddItem" + item.productId)}
                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId, quantity: 1 }))}
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{priceFormat(item.quantity * item.price)}</TableCell>
                <TableCell>
                  <LoadingButton
                    loading={status.includes("pendingRemoveItem" + item.productId)}
                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1 }))}
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6} display="flex" flexDirection="column" gap={2}>
          <BasketSummary />
          <Button variant="contained" size="large" component={Link} to="/checkout">
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BasketPage;
