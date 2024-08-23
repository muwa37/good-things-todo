import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteTodo, getTodosById, updateTodo } from '../api/todo';
import CreateTodoForm from '../components/logic/CreateTodoForm';
import ErrorModal from '../components/logic/ErrorModal';
import TodoItem from '../components/logic/TodoItem';
import PageTitle from '../components/ui/PageTitle';
import { selectToken, selectUser } from '../store/user/selectors';
import { Todo } from '../types/common';

const TodoList = () => {
  const userId = useSelector(selectUser)?.id;
  const token = useSelector(selectToken);

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (userId) {
          const res = await getTodosById(userId, token);
          setTodoList(res);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setIsLoadingFailed(true);
          setLoadingErrorMessage(error.response?.data?.message);
        }
      }
    };

    fetchTodos();
  }, [token, userId]);

  const onErrorModalCloseHandler = () => {
    setIsLoadingFailed(false);
  };

  const addNewTodo = (newTodo: Todo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  const toggleTodoIsDone = async (todoId: string, isDone: boolean) => {
    try {
      if (userId) {
        const updatedTodo = await updateTodo({ todoId, token, isDone });
        if (updatedTodo) {
          setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
              todo.id === todoId ? updatedTodo : todo
            )
          );
          return updatedTodo;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoadingFailed(true);
        setLoadingErrorMessage(error.response?.data?.message);
      }
    }
    return null;
  };

  const changeTodoTitle = async (todoId: string, newTitle: string) => {
    try {
      if (userId) {
        const updatedTodo = await updateTodo({
          todoId,
          token,
          title: newTitle,
        });
        if (updatedTodo) {
          setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
              todo.id === todoId ? updatedTodo : todo
            )
          );
          return updatedTodo;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoadingFailed(true);
        setLoadingErrorMessage(error.response?.data?.message);
      }
    }
    return null;
  };

  const removeTodo = async (todoId: string) => {
    try {
      if (userId) {
        const removedTodoId = await deleteTodo(todoId, token);
        if (removedTodoId) {
          setTodoList((prevTodoList) =>
            prevTodoList.filter((todo) => todo.id !== todoId)
          );
          return removedTodoId;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoadingFailed(true);
        setLoadingErrorMessage(error.response?.data?.message);
      }
    }
    return null;
  };

  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <div
        className={
          isLoadingFailed
            ? 'bg-black bg-opacity-50 fixed h-screen w-screen top-0 left-0'
            : 'hidden'
        }
      ></div>

      <ErrorModal
        isActive={isLoadingFailed}
        onModalCloseHandler={onErrorModalCloseHandler}
        message={loadingErrorMessage}
      />

      <PageTitle pageTitle='Your Good Things ToDo' />

      <div className='h-full w-full flex flex-col items-center justify-evenly'>
        <h3 className='text-3xl font-bold'>
          make world a bit better step by step :)
        </h3>
        <CreateTodoForm onTodoCreated={addNewTodo} />
        <ul className=' w-2/3 h-[300px] flex flex-col items-center justify-start overflow-auto'>
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleIsDone={toggleTodoIsDone}
              changeTodoTitle={changeTodoTitle}
              deleteTodo={removeTodo}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
