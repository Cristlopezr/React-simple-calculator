import { actionTypes, operationTypes } from './calculatorButtonTypes';
import { compute } from './compute';

export const ACTIONS = {
	CONCAT_NUMBER: 'concat_number',
	ACTION: 'action',
	COMPUTE: 'compute',
	EQUAL: 'equal',
};

export const initialState = {
	bigText: '0',
	smallText: '',
	operation: '',
	lastNumber: 0,
	previousNumber: '',
	canRestartBigText: false,
	canRestartCalculator: false,
	disableButtons: false,
};

export const reducer = (state, { type, payload }) => {
	switch (type) {
		case ACTIONS.CONCAT_NUMBER:
			if (state.canRestartCalculator)
				return {
					...initialState,
					bigText: payload,
					lastNumber: Number(payload),
				};

			if (state.canRestartBigText)
				return {
					...state,
					bigText: payload,
					canRestartBigText: false,
					lastNumber: Number(payload),
				};

			if (payload === ',') {
				if (state.bigText.includes('.')) return state;

				return {
					...state,
					bigText: state.bigText + '.',
				};
			}

			if (state.bigText === initialState.bigText)
				return {
					...state,
					bigText: payload,
					lastNumber: Number(payload),
				};

			return {
				...state,
				bigText: state.bigText + payload,
				lastNumber: Number(state.bigText + payload),
			};

		case ACTIONS.ACTION:
			if (payload === actionTypes.percentage) return state;

			if (payload === actionTypes.restart) return initialState;

			if (payload === actionTypes.deleteLeft) {
				if (state.smallText)
					return {
						...state,
						smallText: initialState.smallText,
						lastNumber: Number(state.bigText),
					};
				if (state.bigText.length === 1) return initialState;
				return {
					...state,
					bigText: state.bigText.slice(0, -1),
				};
			}

		case ACTIONS.COMPUTE:
			if (!state.canRestartBigText && state.operation) {
				if (state.lastNumber === 0 && state.operation === operationTypes.divide)
					return {
						bigText: 'No se puede dividir entre cero',
						disableButtons: true,
						canRestartCalculator: true,
					};

				return {
					...state,
					bigText: compute(state.previousNumber, state.lastNumber, state.operation),
					smallText: `${compute(
						state.previousNumber,
						state.lastNumber,
						state.operation
					)} ${payload}`,
					previousNumber: compute(state.previousNumber, state.lastNumber, state.operation),
					canRestartBigText: true,
					operation: payload,
				};
			}

			return {
				...state,
				smallText: `${state.bigText} ${payload}`,
				previousNumber: Number(state.bigText),
				canRestartBigText: true,
				canRestartCalculator: false,
				operation: payload,
			};

		case ACTIONS.EQUAL:
			if (state.lastNumber === 0 && state.operation === operationTypes.divide) {
				return {
					bigText: 'No se puede dividir entre cero',
					disableButtons: true,
					canRestartCalculator: true,
				};
			}

			if (state.previousNumber === initialState.previousNumber) return state;

			return {
				...state,
				bigText: compute(state.previousNumber, state.lastNumber, state.operation),
				smallText: `${state.previousNumber} ${state.operation} ${state.lastNumber}`,
				previousNumber: compute(state.previousNumber, state.lastNumber, state.operation),
				canRestartBigText: true,
			};
		default:
			return state;
	}
};
