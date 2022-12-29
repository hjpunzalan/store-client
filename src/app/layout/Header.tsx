import { ShoppingCart } from "@mui/icons-material";
import {
	AppBar,
	Badge,
	Box,
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

const navStyles = {
	color: "inherit",
	typography: "h6",
	textDecoration: "none",
	"&:hover": {
		color: "grey.500",
	},
	"&.active": {
		color: "text.secondary",
	},
};

const Header = ({ toggleDarkMode }: Props) => {
	return (
		<AppBar position="static" sx={{ mb: (theme) => theme.spacing(4) }}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography
						component={NavLink}
						exact
						to="/"
						variant="h6"
						sx={{
							color: "inherit",
							textDecoration: "none",
							textTransform: "uppercase",
						}}
					>
						Store app
					</Typography>
					<Switch onChange={toggleDarkMode} />
				</Box>
				<List sx={{ display: "flex" }}>
					{midLinks.map(({ title, path }) => (
						<ListItem component={NavLink} to={path} key={path} sx={navStyles}>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton size="large" sx={{ color: "inherit" }}>
						<Badge badgeContent={4} color="secondary">
							<ShoppingCart />
						</Badge>
					</IconButton>
					<List sx={{ display: "flex" }}>
						{rightLinks.map(({ title, path }) => (
							<ListItem component={NavLink} to={path} key={path} sx={navStyles}>
								{title.toUpperCase()}
							</ListItem>
						))}
					</List>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
