import ChangeProfileForm from '../components/logic/ChangeProfileForm';
import PageTitle from '../components/ui/PageTitle';

const ProfileSettings = () => {
  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <PageTitle pageTitle='Profile settings' />
      <ChangeProfileForm />
    </section>
  );
};

export default ProfileSettings;
