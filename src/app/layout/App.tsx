import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "src/errors/NotFound";
import ServerError from "src/errors/ServerError";
import AboutPage from "src/features/about/AboutPage";
import BasketPage from "src/features/basket/BasketPage";
import Catalog from "src/features/catalog/Catalog";
import ProductDetails from "src/features/catalog/ProductDetails";
import ContactPage from "src/features/contact/ContactPage";
import HomePage from "src/features/home/HomePage";
import { useToggle } from "src/hooks/useToggle";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

function App() {
	const { setBasket } = useStoreContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const buyerId = getCookie("buyerId");
		if (buyerId) {
			agent.Basket.get()
				.then((basket) => setBasket(basket))
				.catch((err) => console.error(err))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [setBasket]);

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

	if (loading) return <LoadingComponent message="Initialising App..." />;

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
					<Route path="/server-error" component={ServerError} />
					<Route path="/basket" component={BasketPage} />
					<Route component={NotFound} />
				</Switch>
			</Container>
		</ThemeProvider>
	);
}

export default App;
