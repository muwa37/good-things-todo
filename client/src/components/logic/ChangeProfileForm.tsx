import axios from 'axios';
import { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { updateUser } from '../../api/user';
import { selectUser } from '../../store/user/selectors';
import {
  nameValidation,
  passwordValidation,
  tagValidation,
} from '../../utils/validators';
import MyButton from '../ui/MyButton';
import MyInput from '../ui/MyInput';
import ErrorModal from './ErrorModal';

interface ProfileChangeFields {
  name?: string;
  tag?: string;
  password?: string;
}

const ChangeProfileForm = () => {
  const userId = useSelector(selectUser)?.id;

  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');

  const onModalCloseHandler = () => setIsRegisterFailed(false);

  const { handleSubmit, control } = useForm<ProfileChangeFields>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ProfileChangeFields> = async (data) => {
    try {
      if (userId) {
        const res = await updateUser({ userId, ...data });
        console.log(res);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsRegisterFailed(true);
        setRegistrationErrorMessage(error.response?.data?.message);
      }
      console.log(error);
    }
  };

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
        <h2 className='text-4xl font-bold'>Change your data</h2>
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

          <MyButton buttonText='Send changes' type='submit' />
        </form>
      </div>
    </div>
  );
};

export default ChangeProfileForm;
