export const Screen = ({ bigText, smallText }) => {
  return (
    <div className='calculator__screen'>
      <p className='screen__result'>{bigText}</p>
      <p className='screen__operation'>{smallText}</p>
    </div>
  );
};
