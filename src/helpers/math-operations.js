export const add = (previousNumber, lastNumberPicked) =>
	(Number(previousNumber) + Number(lastNumberPicked)).toString();

export const subtract = (previousNumber, lastNumberPicked) =>
	(Number(previousNumber) - Number(lastNumberPicked)).toString();

export const multiply = (previousNumber, lastNumberPicked) =>
	(Number(previousNumber) * Number(lastNumberPicked)).toString();

export const divide = (previousNumber, lastNumberPicked) =>
	(Number(previousNumber) / Number(lastNumberPicked)).toString();
