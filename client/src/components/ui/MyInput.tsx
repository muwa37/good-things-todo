import { ChangeEvent, FocusEvent } from 'react';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  type: string;
};

const MyInput = ({ onChange, placeholder, value = '', type }: Props) => {
  return (
    <input
      className='p-2 h-10 w-60 border-2 rounded-md focus:outline-none focus:border-0 focus:ring focus:ring-violet-300 focus:text-violet-300 flex items-center justify-center bg-inherit border-red-300 text-red-300 hover:border-blue-300 hover:text-blue-300'
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
    />
  );
};

export default MyInput;
