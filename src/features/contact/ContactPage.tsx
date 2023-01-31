import { Button, ButtonGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/app/store/configureStore';
import { decrement, increment } from 'src/features/contact/counterSlice';

const ContactPage = () => {
	const dispatch = useAppDispatch();
	const { data, title } = useAppSelector((state) => state.counter);
	return (
		<>
			<Typography variant="h2">{title}</Typography>
			<Typography component="p" variant="h5">
				The data is :{data}
			</Typography>
			<ButtonGroup>
				<Button
					onClick={() => dispatch(decrement(1))}
					variant="contained"
					color="error">
					Decrement
				</Button>
				<Button
					onClick={() => dispatch(increment(1))}
					variant="contained"
					color="primary">
					Increment
				</Button>
			</ButtonGroup>
		</>
	);
};

export default ContactPage;
