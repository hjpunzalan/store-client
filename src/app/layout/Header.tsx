import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
	toggleDarkMode: () => void;
}

const Header = ({ toggleDarkMode }: Props) => {
	return (
		<AppBar position="static" sx={{ mb: (theme) => theme.spacing(4) }}>
			<Toolbar>
				<Typography variant="h6">Store app</Typography>
				<Switch onChange={toggleDarkMode} />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
