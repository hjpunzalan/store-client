import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
			background: {
				default: paletteType === "light" ? "#eaeaeaea" : "#121212",
			},
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<ToastContainer theme="colored" position="bottom-right" hideProgressBar />
			<CssBaseline />
			<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/catalog" component={Catalog} />
					<Route path="/catalog/:id" component={ProductDetails} />
					<Route path="/about" component={AboutPage} />
					<Route path="/contact" component={ContactPage} />
				</Switch>
			</Container>
		</ThemeProvider>
	);
}

export default App;
