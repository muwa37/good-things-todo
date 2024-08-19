type Props = { liTitle: string; liText?: string };

const MyLi = ({ liTitle, liText }: Props) => {
  return (
    <li className='text-xl flex'>
      <h3 className='font-bold underline'>
        {liTitle}
        {liText && ':'}
      </h3>
      {liText && (
        <p className='italic pl-2 underline decoration-wavy'> {liText}</p>
      )}
    </li>
  );
};

export default MyLi;
