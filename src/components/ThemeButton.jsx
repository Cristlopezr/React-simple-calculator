export const ThemeButton = ({ changeTheme, theme }) => {
	return (
		<div className='themeButton' onClick={changeTheme}>
			<button className={`${theme ? null : 'themeButtonTransition'}`}></button>
		</div>
	);
};
