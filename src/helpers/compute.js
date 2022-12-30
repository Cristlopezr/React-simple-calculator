import { operationTypes } from './calculatorButtonTypes';

export const compute = (previousNumber, lastNumber, operation) => {
  if (operation === operationTypes.add)
    return (Number(previousNumber) + Number(lastNumber)).toString();
  if (operation === operationTypes.subtract)
    return (Number(previousNumber) - Number(lastNumber)).toString();
  if (operation === operationTypes.multiply)
    return (Number(previousNumber) * Number(lastNumber)).toString();
  if (operation === operationTypes.divide)
    return (Number(previousNumber) / Number(lastNumber)).toString();
};
