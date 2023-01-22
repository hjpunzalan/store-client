import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterActions, CounterState } from "./counterReducer";

const ContactPage = () => {
	const dispatch = useDispatch();
	const { data, title } = useSelector((state: CounterState) => state);
	return (
		<>
			<Typography variant="h2">{title}</Typography>
			<Typography component="p" variant="h5">
				The data is :{data}
			</Typography>
			<ButtonGroup>
				<Button
					onClick={() => dispatch({ type: CounterActions.DECREMENT_COUNTER })}
					variant="contained"
					color="error"
				>
					Decrement
				</Button>
				<Button
					onClick={() => dispatch({ type: CounterActions.INCREMENT_COUNTER })}
					variant="contained"
					color="primary"
				>
					Increment
				</Button>
			</ButtonGroup>
		</>
	);
};

export default ContactPage;
