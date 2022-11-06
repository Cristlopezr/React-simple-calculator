import { useState } from 'react';
import { ButtonGrid, Screen } from './components';
import { ThemeButton } from './components/ThemeButton';
import { useCalculator } from './hooks/useCalculator';

export const Calculator = () => {
	const {
		currentText,
		previousText,
		disableButtons,
		onConcatNumber,
		onEqual,
		onCompute,
		onAction,
	} = useCalculator();

	const getCurrentTheme = () => {
		return window.matchMedia('(prefers-color-scheme: light)').matches
			? true
			: false;
	};

	const [theme, setTheme] = useState(getCurrentTheme());

	const changeTheme = () => {
		setTheme(!theme);
	};

	return (
		<div className={theme ? 'calculator light' : 'calculator'}>
			<ThemeButton changeTheme={changeTheme} theme={theme} />
			<Screen currentText={currentText} previousText={previousText} />
			<ButtonGrid
				onConcatNumber={onConcatNumber}
				onEqual={onEqual}
				onCompute={onCompute}
				onAction={onAction}
				disableButtons={disableButtons}
			/>
		</div>
	);
};
