import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CounterState } from "./counterReducer";

interface Props {}

const ContactPage = (props: Props) => {
	const { data, title } = useSelector((state: CounterState) => state);
	return (
		<>
			<Typography variant="h2">{title}</Typography>
			<Typography component="p" variant="h5">
				The data is :{data}
			</Typography>
		</>
	);
};

export default ContactPage;
