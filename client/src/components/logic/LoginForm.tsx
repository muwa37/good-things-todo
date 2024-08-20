import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { login } from '../../api/auth';
import { passwordValidation, tagValidation } from '../../utils/validators';
import MyButton from '../ui/MyButton';
import MyInput from '../ui/MyInput';

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
  const onSubmit: SubmitHandler<LoginFields> = (data) => login(data);

  return (
    <div className='h-full w-full flex flex-col items-center justify-evenly'>
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
