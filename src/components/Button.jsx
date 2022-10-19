export const Button = ({ digit, classes, handleClick, disableButton }) => {
	return (
		<>
			<button
				onClick={() => handleClick(digit)}
				className={disableButton ? `${classes} disableButton` : `${classes}`}
				disabled={disableButton}
			>
				{digit}
			</button>
		</>
	);
};
