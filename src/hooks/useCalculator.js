import { useReducer } from 'react';
import { reducer } from '../helpers';
import { ACTIONS, initialState } from '../helpers/reducer';

export const useCalculator = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { bigText, smallText, disableButtons } = state;

	const onConcatNumber = number => {
		dispatch({ type: ACTIONS.CONCAT_NUMBER, payload: number });
	};

	const onAction = action => {
		dispatch({ type: ACTIONS.ACTION, payload: action });
	};

	const onCompute = op => {
		dispatch({ type: ACTIONS.COMPUTE, payload: op });
	};

	const onEqual = () => {
		dispatch({ type: ACTIONS.EQUAL });
	};

	return {
		bigText,
		smallText,
		disableButtons,
		onConcatNumber,
		onEqual,
		onCompute,
		onAction,
	};
};
