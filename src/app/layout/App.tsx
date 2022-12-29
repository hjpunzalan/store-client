import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import Catalog from "src/features/catalog/Catalog";
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
			<Header toggleDarkMode={toggleDarkMode} />
			<Container>
				<Catalog />
			</Container>
		</ThemeProvider>
	);
}

export default App;
