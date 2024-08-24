import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addFriend,
  getFriendsById,
  removeFriend,
  searchUsersByTag,
} from '../api/user';
import ErrorModal from '../components/logic/ErrorModal';
import FriendModal from '../components/logic/FriendModal';
import MyButton from '../components/ui/MyButton';
import MyInput from '../components/ui/MyInput';
import PageTitle from '../components/ui/PageTitle';
import { selectToken, selectUser } from '../store/user/selectors';
import { User } from '../types/common';

const Friends = () => {
  const userId = useSelector(selectUser)?.id;
  const token = useSelector(selectToken);

  const [searchValue, setSearchValue] = useState<string>('');
  const [friends, setFriends] = useState<User[]>([]);
  const [foundedUsers, setFoundedUsers] = useState<User[]>([]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [chosenFriend, setChosenFriend] = useState<User | null>(null);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (userId) {
          const friends = await getFriendsById(userId, token);
          setFriends(friends);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setIsLoadingFailed(true);
          setLoadingErrorMessage(error.response?.data?.message);
        }
      }
    };
    fetchFriends();
  }, [userId, token]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSearchHandler = async () => {
    try {
      const users = await searchUsersByTag(searchValue, token);
      setFoundedUsers(users);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoadingFailed(true);
        setLoadingErrorMessage(error.response?.data?.message);
      }
    }
  };

  const onAddToFriendsHandler = async (friendId: string) => {
    try {
      if (userId) {
        const updatedFriends = await addFriend(userId, token, friendId);
        setFriends(updatedFriends);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoadingFailed(true);
        setLoadingErrorMessage(error.response?.data?.message);
      }
    }
  };

  const onRemoveFromFriendsHandler = async (friendId: string) => {
    try {
      if (userId) {
        const updatedFriends = await removeFriend(userId, token, friendId);
        setFriends(updatedFriends);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoadingFailed(true);
        setLoadingErrorMessage(error.response?.data?.message);
      }
    }
  };

  const onFriendClickHandler = (friend: User) => {
    setIsModalActive(true);
    setChosenFriend(friend);
  };

  const onModalCloseHandler = () => {
    setIsModalActive(false);
    setChosenFriend(null);
  };

  const onErrorModalCloseHandler = () => {
    setIsLoadingFailed(false);
  };

  return (
    <section
      className={`flex flex-col w-full h-full items-center justify-evenly relative `}
    >
      <div
        className={
          isModalActive
            ? 'bg-black bg-opacity-50 fixed h-screen w-screen top-0 left-0'
            : 'hidden'
        }
      ></div>

      <ErrorModal
        isActive={isLoadingFailed}
        onModalCloseHandler={onErrorModalCloseHandler}
        message={loadingErrorMessage}
      />

      <FriendModal
        isActive={isModalActive}
        onModalCloseHandler={onModalCloseHandler}
        chosenFriend={chosenFriend}
      />

      <PageTitle pageTitle='Friends' />
      <div className='h-full w-full flex items-center justify-evenly'>
        <div className='h-full w-1/3 m-2 p-2 border-2 rounded-2xl border-yellow-200'>
          <div className='flex flex-col justify-evenly items-center'>
            <h3 className='text-xl font-bold text-blue-300'>
              looking for someone? type in unique user tag!
            </h3>
            <div className='flex items-center justify-center'>
              <MyInput
                type='text'
                onChange={(e) => onSearchChange(e)}
                value={searchValue}
                placeholder='search'
              />
              <MyButton buttonText='find' onClickFn={onSearchHandler} />
            </div>
          </div>
          <div className=' w-full flex flex-col'>
            <div className='h-[380px] w-full overflow-auto flex flex-col items-center justify-start '>
              {foundedUsers.map((user) => (
                <div
                  key={user.tag}
                  className='flex w-full items-center justify-between p-2'
                >
                  <div className='flex items-center justify-start'>
                    <p>{user.name} -</p>
                    <p>({user.tag})</p>
                  </div>
                  <MyButton
                    buttonText='add to friends'
                    onClickFn={() => onAddToFriendsHandler(user.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='h-full w-1/3 flex flex-col items-center border-2 rounded-2xl border-yellow-200'>
          <h3 className='text-xl font-bold text-blue-300'>your friends list</h3>
          <div className='h-[380px] w-full overflow-auto flex flex-col items-center justify-start '>
            {friends.map((friend) => (
              <div
                key={friend.tag}
                className='flex w-full items-center justify-between p-2'
              >
                <div className='flex items-center justify-start'>
                  <p>{friend.name} - </p>
                  <p className='italic'>@{friend.tag}</p>
                </div>
                <div className='flex'>
                  <MyButton
                    buttonText='show todo list'
                    onClickFn={() => onFriendClickHandler(friend)}
                  />
                  <MyButton
                    buttonText='remove'
                    onClickFn={() => onRemoveFromFriendsHandler(friend.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Friends;
