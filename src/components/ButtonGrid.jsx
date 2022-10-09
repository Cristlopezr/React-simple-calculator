import { Button } from './Button';
import { calculator, actionTypes } from '../helpers';

const classNames = {
	equalButton: 'equal',
	actionButton: 'action-btn',
	digitButton: 'digitButton',
};

const equal = '=';

export const ButtonGrid = ({ onAddNumber, onClickAction }) => {
	return (
		<div className='calculator__buttons'>
			{calculator.map(digit =>
				actionTypes.includes(digit) ? (
					<Button
						key={digit}
						digit={digit}
						classes={`${classNames.actionButton} ${classNames.digitButton}`}
						handleClick={onClickAction}
					/>
				) : digit === equal ? (
					<Button
						key={digit}
						digit={digit}
						classes={`${classNames.equalButton} ${classNames.digitButton}`}
						handleClick={onClickAction}
					/>
				) : (
					<Button
						key={digit}
						digit={digit}
						classes={classNames.digitButton}
						handleClick={onAddNumber}
					/>
				)
			)}
		</div>
	);
};
