import axios from 'axios';

export const searchUsersByTag = async (tag: string, token: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}users/searchByTag?query=${tag}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const getFriendsById = async (userId: string, token: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}users/getFriends/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const getFriendById = async (friendId: string, token: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}users/getOneById/${friendId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const addFriend = async (
  userId: string,
  token: string,
  friendId: string
) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}users/addFriend/${userId}`,
    { friendId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const removeFriend = async (
  userId: string,
  token: string,
  friendId: string
) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}users/removeFriend/${userId}`,
    { friendId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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

export const deleteUser = async (userId: string, token: string) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
