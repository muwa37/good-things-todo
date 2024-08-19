import axios from 'axios';

export const createTodo = async (
  userId: string,
  title: string,
  isDone: boolean = false
) => {
  const { data } = await axios.post(
    `${import.meta.env.API_URL}todo/${userId}`,
    { title, isDone }
  );

  return data;
};

export const getTodosById = async (userId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.API_URL}todo/findByUser/${userId}`
  );

  return data;
};

export const updateTodo = async (
  todoId: string,
  title: string,
  isDone: boolean
) => {
  const { data } = await axios.patch(
    `${import.meta.env.API_URL}todo/${todoId}`,
    { title, isDone }
  );

  return data;
};

export const deleteTodo = async (todoId: string) => {
  const { data } = await axios.delete(
    `${import.meta.env.API_URL}todo/${todoId}`
  );

  return data;
};
