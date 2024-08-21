import { User } from '../../types/common';
import MyButton from '../ui/MyButton';
import TodoItem from './TodoItem';

type Props = {
  isActive: boolean;
  onModalCloseHandler: () => void;
  chosenFriend: User | null;
};

const FriendModal = ({
  isActive,
  onModalCloseHandler,
  chosenFriend,
}: Props) => {
  return (
    <div
      className={
        isActive
          ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-3/4 border-2 p-3 rounded-xl bg-stone-700 border-yellow-200'
          : 'hidden'
      }
    >
      <div className='absolute top-4 right-4'>
        <MyButton buttonText='close' onClickFn={onModalCloseHandler} />
      </div>
      <div className='p-2 h-full w-full flex flex-col items-center justify-evenly'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold'>
            {chosenFriend?.name}'s good things to do
          </h2>
          <h3 className='text-2xl fort-semibold italic'>
            @{chosenFriend?.tag}
          </h3>
        </div>
        <ul className='h-2/3 w-full flex flex-col items-start justify-start'>
          {chosenFriend?.todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendModal;
