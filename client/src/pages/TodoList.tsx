import { useEffect, useState } from 'react';
import TodoItem from '../components/logic/TodoItem';
import PageTitle from '../components/ui/PageTitle';
import { Todo } from '../types/common';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    setTodos([
      { title: 'test', isDone: false },
      { title: 'example', isDone: true },
    ]);
  }, [todos]);
  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <PageTitle pageTitle='Your Good Things ToDo' />
      <div className='h-full w-full flex flex-col items-center justify-evenly'>
        <h3 className='text-2xl font-bold'>
          make world a bit better step by step :)
        </h3>
        <ul className=' w-2/3 h-3/4 flex flex-col items-center justify-start overflow-hidden'>
          {todos.map((todo) => (
            <TodoItem todo={todo} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
