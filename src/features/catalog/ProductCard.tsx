import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { Product } from "src/app/layout/models/product";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { priceFormat } from "src/app/util/util";
import { addBasketItemAsync } from "src/features/basket/basketSlice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "secondary.main" }}>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
            color: "primary.main",
          },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          {priceFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/ {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes("pendingAddItem" + [product.id])}
          size="small"
          onClick={async () => await dispatch(addBasketItemAsync({ productId: product.id }))}
        >
          Add to Cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
