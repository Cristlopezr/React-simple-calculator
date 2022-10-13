export const Screen = ({ currentText, previousText }) => {
	return (
		<div className='calculator__screen'>
			<p className='screen__result'>{currentText}</p>
			<p className='screen__operation'>{previousText}</p>
		</div>
	);
};
