import { useState } from 'react';

const initialState = {
	result: '0',
	operation: '',
	action: '',
	canRestartResultText: false,
	lastNumberPicked: 0,
	previousNumber: 0,
	restartCalculator: false,
};

export const useCalculate = () => {
	const [calculation, setCalculation] = useState(initialState);

	const {
		result,
		operation,
		action,
		lastNumberPicked,
		previousNumber,
		canRestartResultText,
		restartCalculator,
	} = calculation;

	const onAddNumber = number => {
		if (restartCalculator)
			return setCalculation(() => ({
				...initialState,
				result: number,
			}));

		if (number === ',') {
			if (result.includes('.')) return;

			return setCalculation(currentCalc => ({
				...currentCalc,
				result: result + '.',
				lastNumberPicked: Number(initialState.result),
			}));
		}

		if (result === '0')
			return setCalculation(currentCalc => ({
				...currentCalc,
				result: number,
				lastNumberPicked: Number(number),
				canRestartResultText: false,
			}));

		canRestartResultText
			? setCalculation(currentCalc => ({
					...currentCalc,
					result: number,
					canRestartResultText: false,
					lastNumberPicked: Number(number),
			  }))
			: setCalculation(currentCalc => ({
					...currentCalc,
					result: result + number,
					lastNumberPicked: Number(result + number),
			  }));
	};

	const onClickAction = action => {
		if (action === 'AC') {
			setCalculation(initialState);
			return;
		}

		if (action === 'X') {
			if (restartCalculator) {
				setCalculation(() => ({
					...initialState,
					result: result,
					restartCalculator: true,
				}));
				return;
			}

			if (result.length === 1) {
				setCalculation(currentCalc => ({
					...currentCalc,
					result: initialState.result,
				}));
				return;
			}

			setCalculation(currentCalc => ({
				...currentCalc,
				result: result.slice(0, -1),
			}));
			return;
		}

		setCalculation(currentCalc => ({
			...currentCalc,
			previousNumber: Number(result),
			operation: `${result} ${action}`,
			action: action,
			canRestartResultText: true,
			restartCalculator: false,
		}));
	};

	const onEqual = equal => {
		if (action === '+') {
			setCalculation(currentCalc => ({
				...currentCalc,
				result: (previousNumber + lastNumberPicked).toString(),
				operation: `${previousNumber} ${action} ${lastNumberPicked} ${equal} `,
				previousNumber: Number(previousNumber) + Number(lastNumberPicked),
				restartCalculator: true,
			}));
		}
	};

	return {
		result,
		operation,
		action,
		onAddNumber,
		onClickAction,
		onEqual,
	};
};
