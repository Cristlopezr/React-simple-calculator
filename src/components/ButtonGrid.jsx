import { Button } from './Button';
import { calculator, actionTypes, operationTypes } from '../helpers';

const classNames = {
	equalButton: 'equal',
	actionButton: 'action-btn',
	digitButton: 'digitButton',
};

const equal = '=';

export const ButtonGrid = ({ onConcatNumber, onEqual, onCompute, onAction, disableButtons }) => {
	return (
		<div className='calculator__buttons'>
			{calculator.map(digit =>
				Object.values(operationTypes).includes(digit) ? (
					<Button
						key={digit}
						digit={digit}
						classes={`${classNames.actionButton} ${classNames.digitButton}`}
						handleClick={onCompute}
						disableButton={disableButtons}
					/>
				) : Object.values(actionTypes).includes(digit) ? (
					<Button
						key={digit}
						digit={digit}
						classes={`${classNames.actionButton} ${classNames.digitButton}`}
						handleClick={onAction}
						disableButton={disableButtons}
					/>
				) : digit === equal ? (
					<Button
						key={digit}
						digit={digit}
						classes={`${classNames.equalButton} ${classNames.digitButton}`}
						handleClick={onEqual}
						disableButton={disableButtons}
					/>
				) : (
					<Button
						key={digit}
						digit={digit}
						classes={classNames.digitButton}
						handleClick={onConcatNumber}
					/>
				)
			)}
		</div>
	);
};
