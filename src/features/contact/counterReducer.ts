export interface CounterState {
	data: number;
	title: string;
}

export enum CounterActions {
	INCREMENT_COUNTER,
	DECREMENT_COUNTER,
}

const initialState: CounterState = {
	data: 42,
	title: "YARC (yet another redux counter)",
};

export default function counterReducer(
	state = initialState,
	action: { type: CounterActions }
) {
	switch (action.type) {
		case CounterActions.INCREMENT_COUNTER: {
			return {
				...state,
				data: state.data + 1,
			};
		}
		case CounterActions.DECREMENT_COUNTER: {
			return {
				...state,
				data: state.data - 1,
			};
		}
		default:
			return state;
	}
}
