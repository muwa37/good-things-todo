import { ChangeEvent, useState } from 'react';
import MyButton from '../components/ui/MyButton';
import MyInput from '../components/ui/MyInput';
import PageTitle from '../components/ui/PageTitle';

const Friends = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [friends, setFriends] = useState([
    { name: 'test', tag: 'test' },
    { name: 'test2', tag: 'test2' },
  ]);
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSearchHandler = () => {
    console.log(searchValue);
    setFriends([]);
  };
  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
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
        <div className='h-full w-2/3 flex flex-col overflow-auto'>
          {friends.map((friend) => (
            <div className='flex items-center justify-start'>
              <p>{friend.name} -</p>
              <p>({friend.tag})</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Friends;
