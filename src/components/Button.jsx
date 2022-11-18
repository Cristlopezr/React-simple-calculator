export const Button = ({
	digit,
	classes,
	handleClick,
	disableButton,
	theme,
}) => {
	return (
		<>
			<button
				onClick={() => handleClick(digit)}
				className={
					disableButton
						? theme
							? `${classes} disableButtonLight`
							: `${classes} disableButtonDark`
						: `${classes}`
				}
				disabled={disableButton}
			>
				{digit}
			</button>
		</>
	);
};
