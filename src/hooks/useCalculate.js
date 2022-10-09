import { useState } from 'react';
import { actionTypes } from '../helpers';

const calculatorInitialState = {
	result: '0',
	operation: '',
	action: '',
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
		action,
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

		setCalculator(currentCalc => ({
			...currentCalc,
			previousNumber: Number(result),
			operation: `${result} ${action}`,
			action: action,
			canRestartResultText: true,
			canRestartCalculator: false,
		}));
	};

	const onCompute = equal => {
		if (action === actionTypes.add) {
			setCalculator(currentCalc => ({
				...currentCalc,
				result: (previousNumber + lastNumberPicked).toString(),
				operation: `${previousNumber} ${action} ${lastNumberPicked} ${equal} `,
				previousNumber: Number(previousNumber) + Number(lastNumberPicked),
				canRestartCalculator: true,
			}));
		}
	};

	return {
		result,
		operation,
		action,
		onConcatNumber,
		onClickAction,
		onCompute,
	};
};
