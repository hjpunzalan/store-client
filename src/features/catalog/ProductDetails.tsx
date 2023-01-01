import {
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "src/app/api/agent";
import { Product } from "src/app/layout/models/product";

interface Props {}

const ProductDetails = (props: Props) => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		agent.Catalog.details(parseInt(id))
			.then((data) => {
				setProduct(data);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <h3>Loading...</h3>;
	if (!product) return <h3>Product not found!</h3>;
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
					{Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(product.price / 100)}
				</Typography>
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
			</Grid>
		</Grid>
	);
};

export default ProductDetails;
