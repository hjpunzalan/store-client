import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { useMemo } from "react";
import { useAppSelector } from "src/app/store/configureStore";
import { priceFormat } from "src/app/util/util";

export default function BasketSummary() {
const {basket} = useAppSelector(state=>state.basket)
	const subTotal = useMemo(() => {
		return (
			basket?.items.reduce((sum, item) => {
				const itemPrice = item.quantity * item.price;
				return sum + itemPrice;
			}, 0) || 0
		);
	}, [basket]);

	const deliveryFee = subTotal > 10000 ? 0 : 500;
	if (!basket) return null;

	return (
		<>
			<TableContainer component={Paper} variant={"outlined"}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align="right">{priceFormat(subTotal)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Delivery fee*</TableCell>
							<TableCell align="right">{priceFormat(deliveryFee)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align="right">
								{priceFormat(deliveryFee + subTotal)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<span style={{ fontStyle: "italic" }}>
									*Orders over $100 qualify for free delivery
								</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
