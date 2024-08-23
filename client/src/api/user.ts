import axios from 'axios';

export const searchUserByTag = async (tag: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}users/searchByTag/search?query=${tag}`
  );

  return data;
};

export const getFriendsById = async (userId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}users/getFriends/${userId}`
  );

  return data;
};

export const addFriend = async (userId: string, friendId: string) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}users/addFriend/${userId}`,
    { friendId }
  );

  return data;
};

export const updateUser = async ({
  userId,
  name,
  tag,
  password,
  token,
}: {
  userId: string;
  name?: string;
  tag?: string;
  password?: string;
  token: string;
}) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}users/${userId}`,
    { name, tag, password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}users/${userId}`
  );

  return data;
};
