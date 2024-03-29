import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "src/app/router/Routes";
import { useAppDispatch } from "src/app/store/configureStore";
import { fetchCurrentUser } from "src/features/account/accountSlice";
import { fetchBasketAsync } from "src/features/basket/basketSlice";
import { useToggle } from "src/hooks/useToggle";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [dispatch, initApp]);

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
        <Routes />
      </Container>
    </ThemeProvider>
  );
}

export default App;
