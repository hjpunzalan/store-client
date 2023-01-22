import { createStore } from "redux";
import counterReducer from "src/features/contact/counterReducer";

export function configureStore() {
	return createStore(counterReducer);
}
