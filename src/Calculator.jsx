import { ButtonGrid, Screen } from './components';
import { useCalculator } from './hooks/useCalculator';

export const Calculator = () => {
	const { currentText, previousText, onConcatNumber, onEqual, onCompute, onAction } =
		useCalculator();

	return (
		<div className='calculator'>
			<Screen currentText={currentText} previousText={previousText} />
			<ButtonGrid
				onConcatNumber={onConcatNumber}
				onEqual={onEqual}
				onCompute={onCompute}
				onAction={onAction}
			/>
		</div>
	);
};
