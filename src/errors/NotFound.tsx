import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Container component={Paper}>
			<Typography gutterBottom variant="h3">
				Ooops - we could not find what you are looking for
			</Typography>
			<Divider />
			<Button fullWidth component={Link} to="/catalog">
				Go back to catalog
			</Button>
		</Container>
	);
};

export default NotFound;
