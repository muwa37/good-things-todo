import { Todo } from '../../types/common';
import MyLi from '../ui/MyLi';

type Props = { todo: Todo };

const TodoItem = ({ todo }: Props) => {
  return (
    <div className='p-2'>
      <MyLi liTitle={todo.title} />
    </div>
  );
};

export default TodoItem;
