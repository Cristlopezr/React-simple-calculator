import { useState } from 'react';
import { operationTypes, actionTypes, add, subtract, multiply, divide } from '../helpers';

const initialState = {
	currentText: '0',
	previousText: '',
	operation: '',
	lastNumber: 0,
	previousNumber: 0,
	canRestartResultText: false,
	/*canRestartCalculator: false, */
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
		/*canRestartCalculator */
	} = calculator;

	const onConcatNumber = number => {
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
			? setCalculator(currentCalc => ({ ...currentCalc, currentText: number }))
			: setCalculator(currentCalc => ({
					...currentCalc,
					currentText: currentCalc.currentText + number,
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

	const onCompute = op => {
		if (canRestartResultText === false) {
			if (operation === operationTypes.add) {
				setCalculator(currentCalc => ({
					...currentCalc,
					currentText: add(previousNumber, Number(currentText)),
				}));
			}
			if (operation === operationTypes.subtract)
				setCalculator(currentCalc => ({
					...currentCalc,
					currentText: subtract(previousNumber, Number(currentText)),
				}));
			if (operation === operationTypes.multiply)
				setCalculator(currentCalc => ({
					...currentCalc,
					currentText: multiply(previousNumber, Number(currentText)),
				}));
			if (operation === operationTypes.divide)
				setCalculator(currentCalc => ({
					...currentCalc,
					currentText: divide(previousNumber, Number(currentText)),
				}));
		}

		setCalculator(currentCalc => ({
			...currentCalc,
			previousText: `${currentCalc.currentText} ${op}`,
			previousNumber: Number(currentCalc.currentText),
			canRestartResultText: true,
			operation: op,
		}));
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
