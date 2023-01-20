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

	const handleRemoveItem = async (productId: number, quantity = 1, name:string) => {
		try {
		setStatus({ loading: true, name });
			const b = await agent.Basket.removeItem(productId, quantity);
			removeItem(productId, quantity);
		} catch (error) {
			console.error(error);
		} finally {
		setStatus({ loading: false, name: "" });e);
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
										loading={status.loading && status.name === "remove" + item.productId}
										onClick={() => handleRemoveItem(item.productId,1, item.productId + "rem")}
										color="error"
									>
										<Remove />
									</LoadingButton>

									{item.quantity}
									<LoadingButton
											loading={status.loading && status.name === "add" + item.productId}
										onClick={() => handleAddItem(item.productId, item.name)}
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
										loading={status.loading}
										onClick={() =>
											handleRemoveItem(item.productId, item.quantity, item.name)
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
