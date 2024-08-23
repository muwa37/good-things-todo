import axios from 'axios';
import { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createTodo } from '../../api/todo';
import { selectToken, selectUser } from '../../store/user/selectors';
import { Todo } from '../../types/common';
import { createTodoValidation } from '../../utils/validators';
import MyButton from '../ui/MyButton';
import MyInput from '../ui/MyInput';
import ErrorModal from './ErrorModal';

interface CreateTodoFields {
  title: string;
}

type Props = {
  onTodoCreated: (newTodo: Todo) => void;
};

const CreateTodoForm = ({ onTodoCreated }: Props) => {
  const userId = useSelector(selectUser)?.id;
  const token = useSelector(selectToken);

  const [isCreatingFailed, setIsCreatingFailed] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState('');

  const onModalCloseHandler = () => setIsCreatingFailed(false);

  const { handleSubmit, control } = useForm<CreateTodoFields>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<CreateTodoFields> = async (data) => {
    try {
      if (userId) {
        const newTodo = await createTodo(userId, token, data.title);
        onTodoCreated(newTodo);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsCreatingFailed(true);
        setCreateErrorMessage(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  return (
    <div className='my-4 w-full flex flex-col items-center justify-evenly'>
      <div
        className={
          isCreatingFailed
            ? 'bg-black bg-opacity-50 fixed h-screen w-screen top-0 left-0'
            : 'hidden'
        }
      ></div>
      <ErrorModal
        isActive={isCreatingFailed}
        onModalCloseHandler={onModalCloseHandler}
        message={createErrorMessage}
      />
      <h2 className='text-2xl text-blue-300 font-bold'>Add new good thing!</h2>
      <form
        className='my-4  w-1/4 flex items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='title'
          rules={createTodoValidation}
          render={({ field }) => (
            <MyInput
              placeholder='title'
              onChange={(e) => field.onChange(e)}
              value={field.value}
              type='text'
            />
          )}
        />
        <div className='h-1/2'>
          {errors?.title?.message && (
            <p className='italic text-fuchsia-300'>{errors.title.message}</p>
          )}
        </div>

        <MyButton buttonText='Add!' type='submit' />
      </form>
    </div>
  );
};

export default CreateTodoForm;
