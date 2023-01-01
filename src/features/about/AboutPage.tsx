import {
	Alert,
	AlertTitle,
	Button,
	ButtonGroup,
	Container,
	List,
	ListItem,
	Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "src/app/api/agent";

interface Props {}

const AboutPage = (props: Props) => {
	const [validationErrors, setValidationErrors] = useState<string[] | null>(
		null
	);
	return (
		<Container>
			<Typography gutterBottom variant="h2">
				Errors for testing purposes
			</Typography>
			<ButtonGroup fullWidth>
				<Button
					variant="contained"
					onClick={() => {
						agent.TestErrors.get400Error();
					}}
				>
					Test 400 Error
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						agent.TestErrors.get401Error();
					}}
				>
					Test 401 Error
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						agent.TestErrors.get404Error();
					}}
				>
					Test 404 Error
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						agent.TestErrors.get500Error();
					}}
				>
					Test 500 Error
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						agent.TestErrors.getValidationError().catch((err) => {
							setValidationErrors(err);
						});
					}}
				>
					Test Validation Error
				</Button>
			</ButtonGroup>
			{validationErrors && validationErrors?.length > 0 && (
				<Alert severity="error" onClose={() => setValidationErrors(null)}>
					<AlertTitle>Validation Errors</AlertTitle>
					<List>
						{validationErrors.map((err, i) => (
							<ListItem key={i}>{err}</ListItem>
						))}
					</List>
				</Alert>
			)}
		</Container>
	);
};

export default AboutPage;
