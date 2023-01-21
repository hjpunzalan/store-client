import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
	Box,
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
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "src/app/api/agent";
import { useStoreContext } from "src/app/context/StoreContext";
import { priceFormat } from "src/app/util/util";
import BasketSummary from "./BasketSummary";

const BasketPage = () => {
	const { basket, setBasket, removeItem } = useStoreContext();
	const [status, setStatus] = useState({
		loading: false,
		name: "",
	});

	const handleAddItem = async (productId: number, name: string) => {
		try {
			setStatus({ loading: true, name });
			const b = await agent.Basket.addItem(productId);
			setBasket(b);
		} catch (error) {
			console.error(error);
		} finally {
			setStatus({ loading: false, name: "" });
		}
	};

	const handleRemoveItem = async (
		productId: number,
		quantity = 1,
		name: string
	) => {
		try {
			setStatus({ loading: true, name });
			await agent.Basket.removeItem(productId, quantity);
			removeItem(productId, quantity);
		} catch (error) {
			console.error(error);
		} finally {
			setStatus({ loading: false, name: "" });
		}
	};

	if (!basket)
		return <Typography variant="h3"> Your basket is Empty</Typography>;
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
									<Box
										display="flex"
										alignItems="center"
										component={Link}
										to={`/catalog/${item.productId}`}
									>
										<img
											src={item.pictureUrl}
											alt={item.name}
											style={{ height: 50, marginRight: 20 }}
										/>
										<span style={{ textDecoration: "none" }}>{item.name}</span>
									</Box>
								</TableCell>
								<TableCell align="right">{priceFormat(item.price)}</TableCell>
								<TableCell align="center">
									<LoadingButton
										loading={
											status.loading && status.name === "rem" + item.productId
										}
										onClick={() =>
											handleRemoveItem(
												item.productId,
												1,
												"rem" + item.productId
											)
										}
										color="error"
									>
										<Remove />
									</LoadingButton>

									{item.quantity}
									<LoadingButton
										loading={
											status.loading && status.name === "add" + item.productId
										}
										onClick={() =>
											handleAddItem(item.productId, "add" + item.productId)
										}
										color="secondary"
									>
										<Add />
									</LoadingButton>
								</TableCell>
								<TableCell align="right">
									{priceFormat(item.quantity * item.price)}
								</TableCell>
								<TableCell>
									<LoadingButton
										loading={
											status.loading && status.name === "del" + item.productId
										}
										onClick={() =>
											handleRemoveItem(
												item.productId,
												item.quantity,
												"del" + item.productId
											)
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
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary />
				</Grid>
			</Grid>
		</Stack>
	);
};

export default BasketPage;
