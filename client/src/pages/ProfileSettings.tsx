import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/user';
import ChangeProfileForm from '../components/logic/ChangeProfileForm';
import ErrorModal from '../components/logic/ErrorModal';
import MyButton from '../components/ui/MyButton';
import PageTitle from '../components/ui/PageTitle';
import { selectToken, selectUser } from '../store/user/selectors';
import { logOut } from '../store/user/slice';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectUser)?.id;
  const token = useSelector(selectToken);

  const [isDeletingFailed, setIsDeletingFailed] = useState(false);
  const [deletingErrorMessage, setDeletingErrorMessage] = useState('');

  const onDeleteAccountHandler = async () => {
    try {
      if (userId) {
        const res = await deleteUser(userId, token);
        if (res) {
          dispatch(logOut());
          navigate('/');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsDeletingFailed(true);
        setDeletingErrorMessage(error.response?.data?.message);
      }
    }
  };

  const onErrorModalCloseHandler = () => {
    setIsDeletingFailed(false);
  };

  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <ErrorModal
        isActive={isDeletingFailed}
        onModalCloseHandler={onErrorModalCloseHandler}
        message={deletingErrorMessage}
      />

      <PageTitle pageTitle='Profile settings' />
      <ChangeProfileForm />
      <MyButton
        buttonText='delete account'
        onClickFn={onDeleteAccountHandler}
      />
    </section>
  );
};

export default ProfileSettings;
