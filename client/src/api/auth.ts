import axios from 'axios';

export const login = async ({
  tag,
  password,
}: {
  tag: string;
  password: string;
}) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}auth/login/`,
    {
      tag,
      password,
    }
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
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}auth/registration/`,
    {
      name,
      tag,
      password,
    }
  );

  return data;
};
