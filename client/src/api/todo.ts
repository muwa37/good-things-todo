import axios from 'axios';

export const createTodo = async (
  userId: string,
  title: string,
  isDone: boolean = false
) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}todo/${userId}`,
    { title, isDone }
  );

  return data;
};

export const getTodosById = async (userId: string, token: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}todo/findByUser/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const updateTodo = async ({
  todoId,
  token,
  title,
  isDone,
}: {
  todoId: string;
  token: string;
  title?: string;
  isDone?: boolean;
}) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}todo/${todoId}`,
    { title, isDone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteTodo = async (todoId: string) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}todo/${todoId}`
  );

  return data;
};
