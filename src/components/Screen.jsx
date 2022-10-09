export const Screen = ({ result, operation }) => {
	return (
		<div className='calculator__screen'>
			<p className='screen__result'>{result}</p>
			<p className='screen__operation'>{operation}</p>
		</div>
	);
};
