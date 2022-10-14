export const add = (previousNumber, lastNumber) =>
	(Number(previousNumber) + Number(lastNumber)).toString();

export const subtract = (previousNumber, lastNumber) =>
	(Number(previousNumber) - Number(lastNumber)).toString();

export const multiply = (previousNumber, lastNumber) =>
	(Number(previousNumber) * Number(lastNumber)).toString();

export const divide = (previousNumber, lastNumber) => {
	if (lastNumber === 0) {
		return 'No se puede dividir por cero';
	}

	return (Number(previousNumber) / Number(lastNumber)).toString();
};
