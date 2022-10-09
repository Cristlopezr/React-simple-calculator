import { useState } from 'react';
import { actionTypes } from '../helpers';

const calculatorInitialState = {
	result: '0',
	operation: '',
	calculatorAction: '',
	lastNumberPicked: 0,
	previousNumber: 0,
	canRestartResultText: false,
	canRestartCalculator: false,
};

export const useCalculate = () => {
	const [calculator, setCalculator] = useState(calculatorInitialState);

	const {
		result,
		operation,
		calculatorAction,
		lastNumberPicked,
		previousNumber,
		canRestartResultText,
		canRestartCalculator,
	} = calculator;

	const onConcatNumber = number => {
		/* if (canRestartCalculator)
			return setCalculator(() => ({
				...calculatorInitialState,
				result: number,
			})); */

		if (number === ',') {
			if (result.includes('.')) return;

			return setCalculator(currentCalc => ({
				...currentCalc,
				result: result + '.',
				lastNumberPicked: Number(calculatorInitialState.result),
			}));
		}

		if (result === calculatorInitialState.result)
			return setCalculator(currentCalc => ({
				...currentCalc,
				result: number,
				lastNumberPicked: Number(number),
				canRestartResultText: false,
			}));

		canRestartResultText
			? setCalculator(currentCalc => ({
					...currentCalc,
					result: number,
					canRestartResultText: false,
					lastNumberPicked: Number(number),
			  }))
			: setCalculator(currentCalc => ({
					...currentCalc,
					result: result + number,
					lastNumberPicked: Number(result + number),
			  }));
	};

	const onClickAction = action => {
		if (action === actionTypes.percentage) {
			return;
		}

		if (action === actionTypes.restart) {
			setCalculator(calculatorInitialState);
			return;
		}

		if (action === actionTypes.deleteLeft) {
			if (canRestartCalculator) {
				setCalculator(() => ({
					...calculatorInitialState,
					result: result,
					canRestartCalculator: true,
				}));
				return;
			}

			if (result.length === 1) {
				setCalculator(currentCalc => ({
					...currentCalc,
					result: calculatorInitialState.result,
				}));
				return;
			}

			setCalculator(currentCalc => ({
				...currentCalc,
				result: result.slice(0, -1),
			}));
			return;
		}

		if (calculatorAction === actionTypes.add && canRestartCalculator === false) {
			setCalculator(currentCalc => ({
				...currentCalc,
				previousNumber: Number(previousNumber) + Number(lastNumberPicked),
				result: (Number(previousNumber) + Number(lastNumberPicked)).toString(),
				operation: `${Number(previousNumber) + Number(lastNumberPicked)} ${action}`,
				calculatorAction: action,
				canRestartResultText: true,
			}));
			return;
		}

		if (calculatorAction === actionTypes.subtract && canRestartCalculator === false) {
			setCalculator(currentCalc => ({
				...currentCalc,
				previousNumber: Number(previousNumber) - Number(lastNumberPicked),
				result: (Number(previousNumber) - Number(lastNumberPicked)).toString(),
				operation: `${Number(previousNumber) - Number(lastNumberPicked)} ${action}`,
				calculatorAction: action,
				canRestartResultText: true,
			}));
			return;
		}

		if (calculatorAction === actionTypes.multiply && canRestartCalculator === false) {
			setCalculator(currentCalc => ({
				...currentCalc,
				previousNumber: Number(previousNumber) * Number(lastNumberPicked),
				result: (Number(previousNumber) * Number(lastNumberPicked)).toString(),
				calculatorAction: action,
				canRestartResultText: true,
			}));
		}

		if (calculatorAction === actionTypes.divide && canRestartCalculator === false) {
			setCalculator(currentCalc => ({
				...currentCalc,
				previousNumber: Number(previousNumber) / Number(lastNumberPicked),
				result: (Number(previousNumber) / Number(lastNumberPicked)).toString(),
				calculatorAction: action,
				canRestartResultText: true,
			}));
		}

		setCalculator(currentCalc => ({
			...currentCalc,
			operation: `${result} ${action}`,
			previousNumber: Number(result), //0
			calculatorAction: action,
			canRestartResultText: true,
			canRestartCalculator: false,
		}));
	};

	const onCompute = equal => {
		if (calculatorAction === actionTypes.add) {
			setCalculator(currentCalc => ({
				...currentCalc,
				result: (previousNumber + lastNumberPicked).toString(),
				operation: `${previousNumber} ${calculatorAction} ${lastNumberPicked} ${equal} `,
				previousNumber: Number(previousNumber) + Number(lastNumberPicked),
				canRestartCalculator: true,
			}));
			return;
		}

		if (calculatorAction === actionTypes.subtract) {
			setCalculator(currentCalc => ({
				...currentCalc,
				result: (previousNumber - lastNumberPicked).toString(),
				operation: `${previousNumber} ${calculatorAction} ${lastNumberPicked} ${equal} `,
				previousNumber: Number(previousNumber) - Number(lastNumberPicked),
				canRestartCalculator: true,
			}));
			return;
		}

		if (calculatorAction === actionTypes.multiply) {
			setCalculator(currentCalc => ({
				...currentCalc,
				result: (previousNumber * lastNumberPicked).toString(),
				operation: `${previousNumber} ${calculatorAction} ${lastNumberPicked} ${equal} `,
				previousNumber: Number(previousNumber) * Number(lastNumberPicked),
				canRestartCalculator: true,
			}));
			return;
		}

		if (calculatorAction === actionTypes.divide) {
			setCalculator(currentCalc => ({
				...currentCalc,
				result: (previousNumber / lastNumberPicked).toString(),
				operation: `${previousNumber} ${calculatorAction} ${lastNumberPicked} ${equal} `,
				previousNumber: Number(previousNumber) / Number(lastNumberPicked),
				canRestartCalculator: true,
			}));
			return;
		}
	};

	return {
		result,
		operation,
		onConcatNumber,
		onClickAction,
		onCompute,
	};
};
