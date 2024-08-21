import MyButton from '../ui/MyButton';

type Props = {
  message: string;
  onModalCloseHandler: () => void;
  isActive: boolean;
};

const ErrorModal = ({ message, onModalCloseHandler, isActive }: Props) => {
  return (
    <div
      className={
        isActive
          ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-3/4 border-2 p-3 rounded-xl bg-stone-700 border-red-300 text-red-300'
          : 'hidden'
      }
    >
      <div className='absolute top-4 right-4'>
        <MyButton buttonText='close' onClickFn={onModalCloseHandler} />
      </div>
      <div className='p-2 h-full w-full flex flex-col items-center justify-evenly'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold'>An Error ocurred...</h2>
          <h3 className='text-2xl fort-semibold italic'>{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
