import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { counterSlice } from 'src/features/contact/counterSlice';

// export function configureStore() {
// 	return createStore(counterReducer);
// }

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
	},
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hook
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
