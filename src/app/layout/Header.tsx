import { ShoppingCart } from "@mui/icons-material";
import {
	AppBar,
	Badge,
	IconButton,
	List,
	ListItem,
	Switch,
	Toolbar,
	Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
	toggleDarkMode: () => void;
	darkMode: boolean;
}

const midLinks = [
	{ title: "catalog", path: "/catalog" },
	{ title: "about", path: "/about" },
	{ title: "contact", path: "/contact" },
];

const rightLinks = [
	{ title: "login", path: "/login" },
	{ title: "register", path: "/register" },
];

const Header = ({ toggleDarkMode }: Props) => {
	return (
		<AppBar position="static" sx={{ mb: (theme) => theme.spacing(4) }}>
			<Toolbar>
				<Typography
					component={NavLink}
					to="/"
					variant="h6"
					sx={{ color: "inherit", textDecoration: "none" }}
				>
					Store app
				</Typography>
				<Switch onChange={toggleDarkMode} />
				<List sx={{ display: "flex" }}>
					{midLinks.map(({ title, path }) => (
						<ListItem
							component={NavLink}
							to={path}
							key={path}
							sx={{
								color: "inherit",
								typography: "h6",
								"&:hover": {
									color: "secondary.main",
								},
								"&:active": {
									color: "text.secondary",
								},
							}}
						>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>
				<IconButton size="large" sx={{ color: "inherit" }}>
					<Badge badgeContent={4} color="secondary">
						<ShoppingCart />
					</Badge>
				</IconButton>
				<List sx={{ display: "flex" }}>
					{rightLinks.map(({ title, path }) => (
						<ListItem
							component={NavLink}
							to={path}
							key={path}
							sx={{
								color: "inherit",
								typography: "h6",
								"&:hover": {
									color: "secondary.main",
								},
								"&:active": {
									color: "text.secondary",
								},
							}}
						>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
