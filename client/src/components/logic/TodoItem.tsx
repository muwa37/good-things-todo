import { Todo } from '../../types/common';
import MyLi from '../ui/MyLi';

type Props = { todo: Todo; toggleIsDone?: () => void };

const TodoItem = ({ todo, toggleIsDone }: Props) => {
  return (
    <div
      className={`w-full p-2 flex items-center ${
        todo.isDone ? 'text-green-700 line-through ' : 'text-blue-300'
      }`}
    >
      <button
        onClick={toggleIsDone}
        className={`hover:border-fuchsia-300  size-8 rounded-full border-2  mr-4 relative ${
          todo.isDone ? 'border-green-700' : 'border-blue-300'
        }`}
      >
        <div
          className={`size-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
            todo.isDone ? 'bg-green-700' : 'bg-blue-300 '
          }`}
        ></div>
      </button>
      <MyLi liTitle={todo.title} />
    </div>
  );
};

export default TodoItem;
