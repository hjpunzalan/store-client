import { Delete } from "@mui/icons-material";
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "src/app/api/agent";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { Basket } from "src/app/models/basket";

const BasketPage = () => {
	const [loading, setLoading] = useState(true);
	const [basket, setBasket] = useState<Basket | null>(null);
	useEffect(() => {
		agent.Basket.get()
			.then((basket) => setBasket(basket))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Loading basket...." />;
	if (!basket)
		return <Typography variant="h3"> Your basket is Empty</Typography>;
	return (
		<div>
			<h1>Buyer Id = {basket.buyerId}</h1>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Subtotal</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{basket.items.map((item) => (
							<TableRow
								key={item.productId}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{item.name}
								</TableCell>
								<TableCell align="right">
									{Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(item.price / 100)}
								</TableCell>
								<TableCell align="right">{item.quantity}</TableCell>
								<TableCell align="right">
									{Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format((item.quantity * item.price) / 100)}
								</TableCell>
								<TableCell>
									<IconButton color="error">
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default BasketPage;
