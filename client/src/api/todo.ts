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

export const registration = async ({
  name,
  tag,
  password,
}: {
  name: string;
  tag: string;
  password: string;
}) => {
  const { data } = await axios.post(`${import.meta.env.API_URL}login/`, {
    name,
    tag,
    password,
  });

  return data;
};
