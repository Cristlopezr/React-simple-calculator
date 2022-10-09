import { ButtonGrid, Screen } from './components';
import { useCalculate } from './hooks/useCalculate';

export const Calculator = () => {
	const { result, operation, onConcatNumber, onClickAction, onCompute } = useCalculate();

	return (
		<div className='calculator'>
			<Screen result={result} operation={operation} />
			<ButtonGrid
				onConcatNumber={onConcatNumber}
				onClickAction={onClickAction}
				onCompute={onCompute}
			/>
		</div>
	);
};
