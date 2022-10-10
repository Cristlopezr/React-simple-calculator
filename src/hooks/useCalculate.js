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

		if (calculatorAction === actionTypes.add && canRestartCalculator === false)
			return setCalculator(currentCalc => ({
				...currentCalc,
				...add(previousNumber, lastNumberPicked, action),
			}));

		if (calculatorAction === actionTypes.subtract && canRestartCalculator === false)
			return setCalculator(currentCalc => ({
				...currentCalc,
				...subtract(previousNumber, lastNumberPicked, action),
			}));

		if (calculatorAction === actionTypes.multiply && canRestartCalculator === false)
			return setCalculator(currentCalc => ({
				...currentCalc,
				...multiply(previousNumber, lastNumberPicked, action),
			}));

		if (calculatorAction === actionTypes.divide && canRestartCalculator === false) {
			if (lastNumberPicked === 0) return;
			return setCalculator(currentCalc => ({
				...currentCalc,
				...divide(previousNumber, lastNumberPicked, action),
			}));
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
		const canRestart = {
				canRestartCalculator: true,
				canRestartResultText: false,
			},
			operation = `${previousNumber} ${calculatorAction} ${lastNumberPicked} ${equal} `;

		if (calculatorAction === actionTypes.add)
			return setCalculator(currentCalc => ({
				...currentCalc,
				...add(previousNumber, lastNumberPicked, calculatorAction),
				...canRestart,
				operation,
			}));

		if (calculatorAction === actionTypes.subtract)
			return setCalculator(currentCalc => ({
				...currentCalc,
				...subtract(previousNumber, lastNumberPicked, calculatorAction),
				...canRestart,
				operation,
			}));

		if (calculatorAction === actionTypes.multiply)
			return setCalculator(currentCalc => ({
				...currentCalc,
				...multiply(previousNumber, lastNumberPicked, calculatorAction),
				...canRestart,
				operation,
			}));

		if (calculatorAction === actionTypes.divide) {
			if (lastNumberPicked === 0) return;
			return setCalculator(currentCalc => ({
				...currentCalc,
				...divide(previousNumber, lastNumberPicked, calculatorAction),
				...canRestart,
				operation,
			}));
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
