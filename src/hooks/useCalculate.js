import { useState } from 'react';

const initialState = {
	result: '0',
	operation: '',
	action: '',
	restart: false,
	lastNumberPicked: 0,
	previousNumberPicked: 0,
};

export const useCalculate = () => {
	const [calculation, setCalculation] = useState(initialState);

	const { result, operation, action, lastNumberPicked, previousNumberPicked } = calculation;

	const onAddNumber = number => {
		if (calculation.result === '0')
			return setCalculation(currentCalc => ({
				...currentCalc,
				result: number,
				lastNumberPicked: number,
			}));

		calculation.restart
			? setCalculation(currentCalc => ({
					...currentCalc,
					result: number,
					restart: false,
					lastNumberPicked: number,
			  }))
			: setCalculation(currentCalc => ({
					...currentCalc,
					result: currentCalc.result + number,
					lastNumberPicked: Number(currentCalc.result + number),
			  }));
	};

	const onClickAction = action => {
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
	console.log(lastNumberPicked);

	return {
		result,
		operation,
		action,
		onAddNumber,
		onClickAction,
	};
};
