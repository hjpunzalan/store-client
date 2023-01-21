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
import agent from "src/app/api/agent";
import { useStoreContext } from "src/app/context/StoreContext";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { Product } from "src/app/layout/models/product";
import { priceFormat } from "src/app/util/util";
import NotFound from "src/errors/NotFound";

interface Props {}

const ProductDetails = (props: Props) => {
	const { id } = useParams<{ id: string }>();
	const { basket, setBasket, removeItem } = useStoreContext();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(0);
	const [submitting, setSubmitting] = useState(false);

	const item = basket?.items.find((item) => item.productId === product?.id);

	const updateQuantity = useCallback(async () => {
		if (!product) return;
		const itemQuantity = item?.quantity || 0;
		const diff = Math.abs(quantity - itemQuantity);

		try {
			setSubmitting(true);
			if (quantity > itemQuantity) {
				const b = await agent.Basket.addItem(product.id, diff);
				setBasket(b);
			} else {
				await agent.Basket.removeItem(product.id, diff);
				removeItem(product.id, diff);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	}, [item?.quantity, product, quantity, removeItem, setBasket]);

	useEffect(() => {
		if (item) {
			setQuantity(item.quantity);
		}
		agent.Catalog.details(parseInt(id))
			.then((data) => {
				setProduct(data);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, [id, item]);

	if (loading) return <LoadingComponent message="Loading product..." />;
	if (!product) return <NotFound />;
	return (
		<Grid container spacing={6}>
			<Grid item xs={6}>
				<img
					src={product.pictureUrl}
					alt={product.name}
					style={{ width: "100%" }}
				/>
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
							loading={submitting}
							disabled={
								quantity === item?.quantity || (!item && quantity === 0)
							}
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
