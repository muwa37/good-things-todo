import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { loginValidation, passwordValidation } from '../../utils/validators';
import MyButton from '../ui/MyButton';

type Props = { authSwitchHandler: () => void };

interface LoginFields {
  tag: string;
  password: string;
}

const LoginForm = ({ authSwitchHandler }: Props) => {
  const { handleSubmit, control } = useForm<LoginFields>();
  const { errors } = useFormState({
    control,
  });
  const onSubmit: SubmitHandler<LoginFields> = (data) => console.log(data);

  return (
    <div className='h-full w-full flex flex-col items-center justify-evenly'>
      <div className='h-1/2 w-full flex flex-col items-center justify-evenly'>
        <h2 className='text-4xl font-bold'>Log In!</h2>
        <form
          className='h-full w-full flex flex-col items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='h-1/4 w-full flex flex-col items-center justify-evenly'>
            <Controller
              control={control}
              name='tag'
              rules={loginValidation}
              render={({ field }) => (
                <input
                  className='h-10 w-60 border-2 rounded-md focus:outline-none focus:border-0 focus:ring focus:ring-violet-300 focus:text-violet-300 flex items-center justify-center bg-inherit border-red-300 text-red-300 hover:border-blue-300 hover:text-blue-300'
                  placeholder='tag'
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
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
                <input
                  className='h-10 w-60 flex items-center border-2 border-red-300 text-red-300 rounded-md focus:outline-none focus:border-0 focus:ring focus:ring-violet-300 focus:text-violet-300  justify-center bg-inherit  hover:border-blue-300 hover:text-blue-300'
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
