import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "src/app/api/agent";
import { useStoreContext } from "src/app/context/StoreContext";

const BasketPage = () => {
	const { basket, setBasket, removeItem } = useStoreContext();
	const [loading, setLoading] = useState(false);

	const handleAddItem = async (productId: number) => {
		try {
			setLoading(true);
			const b = await agent.Basket.addItem(productId);
			setBasket(b);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleRemoveItem = async (productId: number, quantity = 1) => {
		try {
			setLoading(true);
			const b = await agent.Basket.removeItem(productId, quantity);
			removeItem(productId, quantity);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

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
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="right">Subtotal</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{basket.items.map((item) => (
							<TableRow
								key={item.productId}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									<Box display="flex" alignItems="center">
										<img
											src={item.pictureUrl}
											alt={item.name}
											style={{ height: 50, marginRight: 20 }}
										/>
										<span>{item.name}</span>
									</Box>
								</TableCell>
								<TableCell align="right">
									{Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(item.price / 100)}
								</TableCell>
								<TableCell align="center">
									<LoadingButton
										loading={loading}
										onClick={() => handleRemoveItem(item.productId)}
										color="error"
									>
										<Remove />
									</LoadingButton>

									{item.quantity}
									<LoadingButton
										onClick={() => handleAddItem(item.productId)}
										color="secondary"
									>
										<Add />
									</LoadingButton>
								</TableCell>
								<TableCell align="right">
									{Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format((item.quantity * item.price) / 100)}
								</TableCell>
								<TableCell>
									<LoadingButton
										loading={loading}
										onClick={() =>
											handleRemoveItem(item.productId, item.quantity)
										}
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
		</div>
	);
};

export default BasketPage;
