import { useState } from 'react';
import { operationTypes, actionTypes, add, subtract, multiply, divide } from '../helpers';

const initialState = {
	currentText: '0',
	previousText: '',
	operation: '',
	lastNumber: 0,
	previousNumber: 0,
	/* 	canRestartResultText: false,
	canRestartCalculator: false, */
};

export const useCalculator = () => {
	const [calculator, setCalculator] = useState(initialState);

	const {
		currentText,
		previousText,
		operation,
		lastNumber,
		previousNumber,
		/* canRestartResultText,
		canRestartCalculator */
	} = calculator;

	const onConcatNumber = number => {
		if (number === ',')
			return currentText.includes('.')
				? setCalculator(currentCalc => ({ ...currentCalc }))
				: setCalculator(currentCalc => ({
						...currentCalc,
						currentText: currentCalc.currentText + '.',
				  }));

		currentText === initialState.currentText
			? setCalculator(currentCalc => ({ ...currentCalc, currentText: number }))
			: setCalculator(currentCalc => ({
					...currentCalc,
					currentText: currentCalc.currentText + number,
			  }));
	};

	const onAction = action => {
		if (action === actionTypes.restart) return setCalculator(initialState);
	};

	const onCompute = operation => {
		if (operation === operationTypes.add) return add;
		if (operation === operationTypes.subtract) return subtract;
		if (operation === operationTypes.multiply) return multiply;
		if (operation === operationTypes.divide) return divide;
	};

	const onEqual = () => {
		//onCompute();
	};

	return {
		currentText,
		previousText,
		onConcatNumber,
		onEqual,
		onCompute,
		onAction,
	};
};
