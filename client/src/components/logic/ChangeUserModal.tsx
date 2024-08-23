import MyButton from '../ui/MyButton';

type Props = {
  newName?: string;
  newTag?: string;
  newPassword?: string;
  isActive: boolean;
  onModalCloseHandler: () => void;
};

const ChangeUserModal = ({
  newName,
  newTag,
  newPassword,
  isActive,
  onModalCloseHandler,
}: Props) => {
  return (
    <div
      className={
        isActive
          ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-3/4 border-2 p-3 rounded-xl bg-stone-700 border-green-700 text-green-700'
          : 'hidden'
      }
    >
      <div className='absolute top-4 right-4'>
        <MyButton buttonText='close' onClickFn={onModalCloseHandler} />
      </div>
      <div className='p-2 h-full w-full flex flex-col items-center justify-evenly'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold'>Changes complete!</h2>
          {newName && (
            <h3 className='text-2xl fort-semibold '>
              <p>your new name: </p>
              <p className='italic'>{newName}</p>
            </h3>
          )}
          {newTag && (
            <h3 className='text-2xl fort-semibold '>
              <p>your new name: </p>
              <p className='italic'>{newTag}</p>
            </h3>
          )}
          {newPassword && (
            <h3 className='text-2xl fort-semibold '>
              <p>your new name: </p>
              <p className='italic'>{newPassword}</p>
            </h3>
          )}
          <h2 className='text-3xl font-bold'>Please re login...</h2>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserModal;
