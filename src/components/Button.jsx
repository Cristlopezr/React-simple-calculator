export const Button = ({ digit, classes, handleClick, disableButton }) => {
	return (
		<>
			{disableButton ? (
				<button
					onClick={() => handleClick(digit)}
					className={`${classes} disableButton`}
					disabled={disableButton}
				>
					{digit}
				</button>
			) : (
				<button
					onClick={() => handleClick(digit)}
					className={`${classes}`}
					disabled={disableButton}
				>
					{digit}
				</button>
			)}
		</>
	);
};
