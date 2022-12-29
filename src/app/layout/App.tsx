import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import { Route, Switch } from "react-router-dom";
import AboutPage from "src/features/about/AboutPage";
import Catalog from "src/features/catalog/Catalog";
import ProductDetails from "src/features/catalog/ProductDetails";
import ContactPage from "src/features/contact/ContactPage";
import HomePage from "src/features/home/HomePage";
import { useToggle } from "src/hooks/useToggle";
import Header from "./Header";

function App() {
	const [darkMode, toggleDarkMode] = useToggle(false);
	const paletteType = darkMode ? "dark" : "light";

	const theme = createTheme({
		palette: {
			mode: paletteType,
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/catalog" component={Catalog} />
					<Route path="/catalog/:id" component={ProductDetails} />
					<Route path="/about" component={AboutPage} />
					<Route path="/contact" component={ContactPage} />
				</Switch>
			</Container>
		</ThemeProvider>
	);
}

export default App;
