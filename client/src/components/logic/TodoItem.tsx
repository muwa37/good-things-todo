import { useState } from 'react';
import { Todo } from '../../types/common';
import { EditableSpan } from '../ui/EditableSpan';
import MyLi from '../ui/MyLi';

type Props = {
  todo: Todo;
  toggleIsDone?: (todoId: string, isDone: boolean) => Promise<Todo>;
  changeTodoTitle?: (todoId: string, newTitle: string) => Promise<Todo>;
};

const TodoItem = ({ todo, toggleIsDone, changeTodoTitle }: Props) => {
  const [currentTodo, setCurrentTodo] = useState(todo);

  const onToggleClick = async () => {
    if (toggleIsDone) {
      const updatedTodo = await toggleIsDone(
        currentTodo.id,
        !currentTodo.isDone
      );
      setCurrentTodo(updatedTodo);
    }
  };

  const onChangeTodoTitleHandler = async (newTitle: string) => {
    if (changeTodoTitle) {
      const updatedTodo = await changeTodoTitle(currentTodo.id, newTitle);
      setCurrentTodo(updatedTodo);
    }
  };

  return (
    <div
      className={`w-full p-2 flex items-center ${
        currentTodo.isDone ? 'text-green-700 line-through ' : 'text-blue-300'
      }`}
    >
      <button
        onClick={onToggleClick}
        className={`hover:border-fuchsia-300  size-8 rounded-full border-2  mr-4 relative ${
          currentTodo.isDone ? 'border-green-700' : 'border-blue-300'
        }`}
      >
        <div
          className={`size-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
            currentTodo.isDone ? 'bg-green-700' : 'bg-blue-300 '
          }`}
        ></div>
      </button>
      {changeTodoTitle ? (
        <EditableSpan
          title={currentTodo.title}
          changeTitle={onChangeTodoTitleHandler}
        />
      ) : (
        <MyLi liTitle={currentTodo.title} />
      )}
    </div>
  );
};

export default TodoItem;
