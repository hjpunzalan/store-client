import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "../src/app/layout/styles.css";
import { StoreProvider } from "./app/context/StoreContext";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

export const history = createBrowserHistory();

root.render(
	<BrowserRouter>
		<Router history={history}>
			<StoreProvider>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</StoreProvider>
		</Router>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
