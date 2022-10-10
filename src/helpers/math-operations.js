export const add = (previousNumber, lastNumberPicked, calculatorAction) => ({
	previousNumber: Number(previousNumber) + Number(lastNumberPicked),
	result: (Number(previousNumber) + Number(lastNumberPicked)).toString(),
	operation: `${Number(previousNumber) + Number(lastNumberPicked)} ${calculatorAction}`,
	calculatorAction,
	canRestartResultText: true,
});

export const subtract = (previousNumber, lastNumberPicked, calculatorAction) => ({
	previousNumber: Number(previousNumber) - Number(lastNumberPicked),
	result: (Number(previousNumber) - Number(lastNumberPicked)).toString(),
	operation: `${Number(previousNumber) - Number(lastNumberPicked)} ${calculatorAction}`,
	calculatorAction,
	canRestartResultText: true,
});

export const multiply = (previousNumber, lastNumberPicked, calculatorAction) => ({
	previousNumber: Number(previousNumber) * Number(lastNumberPicked),
	result: (Number(previousNumber) * Number(lastNumberPicked)).toString(),
	operation: `${Number(previousNumber) * Number(lastNumberPicked)} ${calculatorAction}`,
	calculatorAction,
	canRestartResultText: true,
});

export const divide = (previousNumber, lastNumberPicked, calculatorAction) => ({
	previousNumber: Number(previousNumber) / Number(lastNumberPicked),
	result: (Number(previousNumber) / Number(lastNumberPicked)).toString(),
	operation: `${Number(previousNumber) / Number(lastNumberPicked)} ${calculatorAction}`,
	calculatorAction,
	canRestartResultText: true,
});
