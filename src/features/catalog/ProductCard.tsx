import { LoadingButton } from "@mui/lab";
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "src/app/api/agent";
import { useStoreContext } from "src/app/context/StoreContext";
import { Product } from "src/app/layout/models/product";
import { priceFormat } from "src/app/util/util";

interface Props {
	product: Product;
}

const ProductCard = ({ product }: Props) => {
	const [loading, setLoading] = useState(false);
	const { setBasket } = useStoreContext();

	const handleAddItem = async (productId: number) => {
		try {
			setLoading(true);
			const basket = await agent.Basket.addItem(productId);
			setBasket(basket);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "secondary.main" }}>
						{product.name.charAt(0).toUpperCase()}
					</Avatar>
				}
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
					loading={loading}
					size="small"
					onClick={async () => await handleAddItem(product.id)}
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
