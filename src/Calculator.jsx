import { ButtonGrid, Screen } from './components';
import { useCalculate } from './hooks/useCalculate';

export const Calculator = () => {
	const { result, operation, action, onAddNumber, onClickAction, onEqual } = useCalculate();

	return (
		<div className='calculator'>
			<Screen result={result} operation={operation} />
			<ButtonGrid onAddNumber={onAddNumber} onClickAction={onClickAction} onEqual={onEqual} />
		</div>
	);
};
