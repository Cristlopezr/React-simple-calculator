import { useState } from 'react';

const initialState = {
	result: '0',
	operation: '',
	action: '',
	restart: false,
	lastNumberPicked: 0,
	previousNumber: 0,
};

export const useCalculate = () => {
	const [calculation, setCalculation] = useState(initialState);

	const { result, operation, action, lastNumberPicked, previousNumber, restart } = calculation;

	const onAddNumber = number => {
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
			}));

		restart
			? setCalculation(currentCalc => ({
					...currentCalc,
					result: number,
					restart: false,
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
			if (result.length === 1)
				return setCalculation(currentCalc => ({
					...currentCalc,
					result: initialState.result,
				}));

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
			restart: true,
		}));
	};

	const onEqual = equal => {
		if (action === '+') {
			setCalculation(currentCalc => ({
				...currentCalc,
				result: Number(previousNumber) + Number(lastNumberPicked),
				operation: `${previousNumber} ${action} ${lastNumberPicked} ${equal} `,
				previousNumber: Number(previousNumber) + Number(lastNumberPicked),
			}));
		}
	};

	/* const onClickAction = action => {
		if (action === 'AC') {
			setCalculation(initialState);
			return;
		}

		if (action === '+') {
			setCalculation(currentCalc => ({
				...currentCalc,
				operation: `${currentCalc.result} ${action}`,
				restart: true,
			}));
			return;
		}

		if (action === '=') {
			if (calculation.action === '+') {
				setCalculation(currentCalc => ({
					...currentCalc,
					result: Number(currentCalc.result) + lastNumberPicked,
					operation: ` ${currentCalc.result} ${action}`,
					lastNumberPicked: Number(currentCalc.result),
				}));
				return;
			}
			setCalculation(currentCalc => ({
				...currentCalc,
				operation: `${currentCalc.result}`,
				action: action,
			}));
			return;
		}

		setCalculation(currentCalc => ({
			...currentCalc,
			operation: `${currentCalc.result} ${action}`,
			action: action,
			restart: true,
			lastNumberPicked: Number(currentCalc.result),
		}));
	};
	console.log(lastNumberPicked); */

	return {
		result,
		operation,
		action,
		onAddNumber,
		onClickAction,
		onEqual,
	};
};
