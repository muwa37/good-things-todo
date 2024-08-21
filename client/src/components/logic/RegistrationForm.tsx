import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { registration } from '../../api/auth';
import { setIsAuth, setToken, setUser } from '../../store/user/slice';
import { User } from '../../types/common';
import {
  nameValidation,
  passwordValidation,
  tagValidation,
} from '../../utils/validators';
import MyButton from '../ui/MyButton';
import MyInput from '../ui/MyInput';
import ErrorModal from './ErrorModal';

type Props = { authSwitchHandler: () => void };

interface RegistrationFields {
  name: string;
  tag: string;
  password: string;
}

const RegistrationForm = ({ authSwitchHandler }: Props) => {
  const dispatch = useDispatch();

  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');

  const onModalCloseHandler = () => setIsRegisterFailed(false);

  const { handleSubmit, control } = useForm<RegistrationFields>();
  const { errors } = useFormState({
    control,
  });
  const onSubmit: SubmitHandler<RegistrationFields> = async (data) => {
    try {
      const res = await registration(data);
      const decoded = jwtDecode(res.token);
      const user = decoded as User;

      dispatch(setUser({ name: user.name, tag: user.tag, id: user.id }));
      dispatch(setToken(res.token));
      dispatch(setIsAuth(true));

      setIsRegistered(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsRegisterFailed(true);
        setRegistrationErrorMessage(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  if (isRegistered) return <Navigate to='/todo' />;

  return (
    <div className='h-full w-full flex flex-col items-center justify-evenly'>
      <div
        className={
          isRegisterFailed
            ? 'bg-black bg-opacity-50 fixed h-screen w-screen top-0 left-0'
            : 'hidden'
        }
      ></div>
      <ErrorModal
        isActive={isRegisterFailed}
        onModalCloseHandler={onModalCloseHandler}
        message={registrationErrorMessage}
      />
      <div className='h-2/3 w-full flex flex-col items-center justify-evenly'>
        <h2 className='text-4xl font-bold'>Register!</h2>
        <form
          className='my-4 h-full w-full flex flex-col items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='h-1/4 w-full flex flex-col items-center justify-evenly mb-2'>
            <Controller
              control={control}
              name='name'
              rules={nameValidation}
              render={({ field }) => (
                <MyInput
                  placeholder='name'
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type='text'
                />
              )}
            />
            <div className='h-1/2'>
              {errors?.name?.message && (
                <p className='italic text-fuchsia-300'>{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className='h-1/4 w-full flex flex-col items-center justify-evenly mb-2'>
            <Controller
              control={control}
              name='tag'
              rules={tagValidation}
              render={({ field }) => (
                <MyInput
                  placeholder='tag'
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type='text'
                />
              )}
            />
            <div className='h-1/2'>
              {errors?.tag?.message && (
                <p className='italic text-fuchsia-300'>{errors.tag.message}</p>
              )}
            </div>
          </div>
          <div className='h-1/4 w-full flex flex-col items-center justify-evenly'>
            <Controller
              control={control}
              name='password'
              rules={passwordValidation}
              render={({ field }) => (
                <MyInput
                  placeholder='password'
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type='password'
                />
              )}
            />
            <div className='h-1/2'>
              {errors?.password?.message && (
                <p className='italic text-fuchsia-300'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <MyButton buttonText='Sign Up' type='submit' />
        </form>
      </div>

      <MyButton
        buttonText='already have an account? log in!'
        onClickFn={authSwitchHandler}
      />
    </div>
  );
};

export default RegistrationForm;
