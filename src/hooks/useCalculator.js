import { useState } from 'react';
import { operationTypes, actionTypes, add, subtract, multiply, divide } from '../helpers';

const initialState = {
	currentText: '0',
	previousText: '',
	operation: '',
	lastNumber: 0,
	previousNumber: 0,
	canRestartResultText: false,
	canRestartCalculator: false,
};

export const useCalculator = () => {
	const [calculator, setCalculator] = useState(initialState);

	const {
		currentText,
		previousText,
		operation,
		lastNumber,
		previousNumber,
		canRestartResultText,
		canRestartCalculator,
	} = calculator;

	const onConcatNumber = number => {
		if (canRestartCalculator)
			return setCalculator(() => ({ ...initialState, currentText: number }));

		if (canRestartResultText)
			setCalculator(currentCalc => ({
				...currentCalc,
				currentText: '',
				canRestartResultText: false,
			}));

		if (number === ',') {
			if (currentText.includes('.')) return;

			return setCalculator(currentCalc => ({
				...currentCalc,
				currentText: currentCalc.currentText + '.',
			}));
		}

		currentText === initialState.currentText
			? setCalculator(currentCalc => ({
					...currentCalc,
					currentText: number,
					lastNumber: Number(currentCalc.currentText + number),
			  }))
			: setCalculator(currentCalc => ({
					...currentCalc,
					currentText: currentCalc.currentText + number,
					lastNumber: Number(currentCalc.currentText + number),
			  }));
	};

	const onAction = action => {
		if (action === actionTypes.percentage) return;
		if (action === actionTypes.restart) return setCalculator(initialState);
		if (action === actionTypes.deleteLeft) {
			if (currentText.length === 1)
				return setCalculator(currentCalc => ({
					...currentCalc,
					currentText: initialState.currentText,
				}));

			return setCalculator(currentCalc => ({
				...currentCalc,
				currentText: currentCalc.currentText.slice(0, -1),
			}));
		}
	};

	const compute = operation => {
		if (operation === operationTypes.add) {
			setCalculator(currentCalc => ({
				...currentCalc,
				currentText: add(previousNumber, lastNumber),
			}));
		}

		if (operation === operationTypes.subtract)
			setCalculator(currentCalc => ({
				...currentCalc,
				currentText: subtract(previousNumber, lastNumber),
			}));

		if (operation === operationTypes.multiply)
			setCalculator(currentCalc => ({
				...currentCalc,
				currentText: multiply(previousNumber, lastNumber),
			}));

		if (operation === operationTypes.divide)
			setCalculator(currentCalc => ({
				...currentCalc,
				currentText: divide(previousNumber, lastNumber),
			}));
	};

	const onCompute = op => {
		if (canRestartResultText === false) {
			compute(operation);
		}

		setCalculator(currentCalc => ({
			...currentCalc,
			previousText: `${currentCalc.currentText} ${op}`,
			previousNumber: Number(currentCalc.currentText),
			canRestartResultText: true,
			canRestartCalculator: false,
			operation: op,
		}));
	};

	const onEqual = () => {
		compute(operation);

		setCalculator(currentCalc => ({
			...currentCalc,
			previousText: `${currentCalc.previousNumber} ${operation} ${lastNumber} =`,
			previousNumber: Number(currentCalc.currentText),
			canRestartCalculator: true,
			canRestartResultText: true,
		}));
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
