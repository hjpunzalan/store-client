import {
	Alert,
	Button,
	Container,
	Divider,
	Paper,
	Typography,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

interface Props {}

const ServerError = (props: Props) => {
	const history = useHistory();
	const { state } = useLocation<{
		error: { detail: string; title: string };
	}>();
	return (
		<Container component={Paper}>
			{state?.error ? (
				<>
					<Typography variant="h1" sx={{ typography: "h5" }}>
						{state.error.title}
					</Typography>
					<Divider sx={{ mb: (theme) => theme.spacing(2) }} />

					<Alert severity="error">
						<Typography>
							{state.error.detail || "Internal server error"}
						</Typography>
					</Alert>
				</>
			) : (
				<Typography variant="h1" sx={{ typography: "h5" }}>
					Server Error
				</Typography>
			)}
			<Button
				onClick={() => {
					history.push("/catalog");
				}}
			>
				Go back to the store
			</Button>
		</Container>
	);
};

export default ServerError;
