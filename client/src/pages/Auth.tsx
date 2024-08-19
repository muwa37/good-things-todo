import { useState } from 'react';
import LoginForm from '../components/logic/LoginForm';
import RegistrationForm from '../components/logic/RegistrationForm';
import PageTitle from '../components/ui/PageTitle';

const Auth = () => {
  const [authState, setAuthState] = useState('login');
  const authSwitchHandler = () => {
    setAuthState(authState === 'login' ? 'registration' : 'login');
  };
  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <PageTitle pageTitle='Authorization' />
      {authState === 'login' && (
        <LoginForm authSwitchHandler={authSwitchHandler} />
      )}
      {authState === 'registration' && (
        <RegistrationForm authSwitchHandler={authSwitchHandler} />
      )}
    </section>
  );
};

export default Auth;
