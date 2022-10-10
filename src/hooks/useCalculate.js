import { useState } from 'react';
import { actionTypes, add, subtract, multiply, divide } from '../helpers';

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
		if (canRestartCalculator)
			return setCalculator(() => ({
				...calculatorInitialState,
				result: number,
			}));

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
		if (action === actionTypes.percentage) return;

		if (action === actionTypes.restart) return setCalculator(calculatorInitialState);

		if (action === actionTypes.deleteLeft) {
			if (canRestartCalculator)
				return setCalculator(() => ({
					...calculatorInitialState,
					result: result,
					canRestartCalculator: true,
				}));

			if (result.length === 1)
				return setCalculator(currentCalc => ({
					...currentCalc,
					result: calculatorInitialState.result,
				}));

			setCalculator(currentCalc => ({
				...currentCalc,
				result: result.slice(0, -1),
			}));
			return;
		}

		if (calculatorAction === actionTypes.add && canRestartCalculator === false) {
			const calculator = add(previousNumber, lastNumberPicked, action);
			setCalculator(currentCalc => ({
				...currentCalc,
				...calculator,
			}));
			return;
		}

		if (calculatorAction === actionTypes.subtract && canRestartCalculator === false) {
			const calculator = subtract(previousNumber, lastNumberPicked, action);
			setCalculator(currentCalc => ({
				...currentCalc,
				...calculator,
			}));
			return;
		}
		if (calculatorAction === actionTypes.multiply && canRestartCalculator === false) {
			const calculator = multiply(previousNumber, lastNumberPicked, action);
			setCalculator(currentCalc => ({
				...currentCalc,
				...calculator,
			}));
			return;
		}

		if (calculatorAction === actionTypes.divide && canRestartCalculator === false) {
			if (lastNumberPicked === 0) return;
			const calculator = divide(previousNumber, lastNumberPicked, action);
			setCalculator(currentCalc => ({
				...currentCalc,
				...calculator,
			}));
			return;
		}

		setCalculator(currentCalc => ({
			...currentCalc,
			operation: `${result} ${action}`,
			previousNumber: Number(result),
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
			if (lastNumberPicked === 0) return;
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
