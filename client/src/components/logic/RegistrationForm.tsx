import MyButton from '../ui/MyButton';

type Props = { authSwitchHandler: () => void };

const RegistrationForm = ({ authSwitchHandler }: Props) => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-evenly'>
      <h2 className='text-3xl font-bold'>registration</h2>
      <MyButton
        buttonText='already have an account? login!'
        onClickFn={authSwitchHandler}
      />
    </div>
  );
};

export default RegistrationForm;
