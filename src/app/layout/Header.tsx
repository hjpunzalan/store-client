import { AppBar, Toolbar, Typography } from "@mui/material";

type Props = {};

const Header = (props: Props) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6">Store app</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
