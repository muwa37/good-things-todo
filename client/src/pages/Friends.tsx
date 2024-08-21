import { ChangeEvent, useEffect, useState } from 'react';
import FriendModal from '../components/logic/FriendModal';
import MyButton from '../components/ui/MyButton';
import MyInput from '../components/ui/MyInput';
import PageTitle from '../components/ui/PageTitle';
import { User } from '../types/common';

const Friends = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [friends, setFriends] = useState<User[]>([]);
  const [foundedUsers, setFoundedUsers] = useState<User[]>([
    {
      name: 'sample',
      tag: 'sample',
      todoList: [{ title: 'test', isDone: false, id: 'asdcxz' }],
      id: 'asds',
    },
    { name: 'example2', tag: 'example2', todoList: [], id: 'dsazx' },
  ]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [chosenFriend, setChosenFriend] = useState<User | null>(null);

  useEffect(() => {
    setFriends([
      {
        name: 'test',
        tag: 'test',
        todoList: [{ title: 'sample', isDone: false, id: 'asdasd' }],
        id: 'asd',
      },
      { name: 'test2', tag: 'test2', todoList: [], id: 'dsa' },
    ]);
  }, []);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSearchHandler = () => {
    console.log(searchValue);
    setFoundedUsers([]);
  };
  const onFriendClickHandler = (friend: User) => {
    setIsModalActive(true);
    setChosenFriend(friend);
  };

  const onModalCloseHandler = () => {
    setIsModalActive(false);
    setChosenFriend(null);
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
      <FriendModal
        isActive={isModalActive}
        onModalCloseHandler={onModalCloseHandler}
        chosenFriend={chosenFriend}
      />
      <PageTitle pageTitle='Friends' />
      <div className='h-full w-full flex flex-col items-center justify-evenly'>
        <div className='h-1/4 flex flex-col justify-evenly items-center'>
          <h3 className='text-xl font-bold'>
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
        <div className='h-full w-2/3 flex flex-col'>
          <div className='h-1/2 overflow-auto'>
            {foundedUsers.map((user) => (
              <div
                key={user.tag}
                onClick={() => onFriendClickHandler(user)}
                className='flex items-center justify-start p-2 m-2'
              >
                <p>{user.name} -</p>
                <p>({user.tag})</p>
              </div>
            ))}
          </div>
          <div className='h-1/2 flex flex-col items-center '>
            <h3 className='text-xl font-bold'>your friends list</h3>
            <div className='h-full w-full overflow-auto'>
              {friends.map((friend) => (
                <div
                  key={friend.tag}
                  onClick={() => onFriendClickHandler(friend)}
                  className='flex items-center justify-start p-2 m-2'
                >
                  <p>{friend.name} -</p>
                  <p>({friend.tag})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Friends;
