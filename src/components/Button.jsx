export const Button = ({ digit, classes, handleClick }) => {
	return (
		<button onClick={() => handleClick(digit)} className={`${classes}`}>
			{digit}
		</button>
	);
};
