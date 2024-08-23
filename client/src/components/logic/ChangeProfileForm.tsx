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
import { selectToken, selectUser } from '../../store/user/selectors';
import { User } from '../../types/common';
import {
  nameChangeValidation,
  passwordChangeValidation,
  tagChangeValidation,
} from '../../utils/validators';
import MyButton from '../ui/MyButton';
import MyInput from '../ui/MyInput';
import ChangeUserModal from './ChangeUserModal';
import ErrorModal from './ErrorModal';

interface ProfileChangeFields {
  name?: string;
  tag?: string;
  password?: string;
}

const ChangeProfileForm = () => {
  const userId = useSelector(selectUser)?.id;
  const token = useSelector(selectToken);

  const [isChangeFailed, setIsChangeFailed] = useState(false);
  const [isChangeComplete, setIsChangeComplete] = useState(false);
  const [changeErrorMessage, setChangeErrorMessage] = useState('');
  const [changedFields, setChangedFields] = useState<
    (Omit<User, never> & { password: string }) | null
  >(null);

  const onErrorModalCloseHandler = () => setIsChangeFailed(false);
  const onChangeModalCloseHandler = () => setIsChangeComplete(false);

  const { handleSubmit, control } = useForm<ProfileChangeFields>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ProfileChangeFields> = async (data) => {
    try {
      if (userId) {
        const res = await updateUser({ userId, token, ...data });
        setChangedFields(res);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsChangeFailed(true);
        setChangeErrorMessage(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  return (
    <div className='h-full w-full flex flex-col items-center justify-evenly'>
      <div
        className={
          isChangeFailed || isChangeComplete
            ? 'bg-black bg-opacity-50 fixed h-screen w-screen top-0 left-0'
            : 'hidden'
        }
      ></div>
      <ErrorModal
        isActive={isChangeFailed}
        onModalCloseHandler={onErrorModalCloseHandler}
        message={changeErrorMessage}
      />
      <ChangeUserModal
        isActive={isChangeComplete}
        onModalCloseHandler={onChangeModalCloseHandler}
        newName={changedFields?.name}
        newPassword={changedFields?.password}
        newTag={changedFields?.tag}
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
              rules={nameChangeValidation}
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
              rules={tagChangeValidation}
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
              rules={passwordChangeValidation}
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
