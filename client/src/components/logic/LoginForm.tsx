import axios from 'axios';
import { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { passwordValidation, tagValidation } from '../../utils/validators';
import MyButton from '../ui/MyButton';
import MyInput from '../ui/MyInput';
import ErrorModal from './ErrorModal';

type Props = { authSwitchHandler: () => void };

interface LoginFields {
  tag: string;
  password: string;
}

const LoginForm = ({ authSwitchHandler }: Props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const onModalCloseHandler = () => setIsLoginFailed(false);

  const { handleSubmit, control } = useForm<LoginFields>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      const res = await login(data);
      setIsLogged(true);
      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoginFailed(true);
        setLoginErrorMessage(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  if (isLogged) return <Navigate to='/todo' />;

  return (
    <div className='h-full w-full flex flex-col items-center justify-evenly'>
      <div
        className={
          isLoginFailed
            ? 'bg-black bg-opacity-50 fixed h-screen w-screen top-0 left-0'
            : 'hidden'
        }
      ></div>
      <ErrorModal
        isActive={isLoginFailed}
        onModalCloseHandler={onModalCloseHandler}
        message={loginErrorMessage}
      />
      <div className='h-1/2 w-full flex flex-col items-center justify-evenly'>
        <h2 className='text-4xl font-bold'>Log In!</h2>
        <form
          className='my-4 h-full w-full flex flex-col items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <MyButton buttonText='Sign In' type='submit' />
        </form>
      </div>

      <MyButton
        buttonText="don't have an account? create!"
        onClickFn={authSwitchHandler}
      />
    </div>
  );
};

export default LoginForm;
