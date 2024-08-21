import PageTitle from '../components/ui/PageTitle';

const ProfileSettings = () => {
  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <PageTitle pageTitle='Profile settings' />
      <div className='h-full w-full flex flex-col items-center justify-evenly'>
        <div>
          <h3>change name</h3>
          <input type='text' />
        </div>
        <div>
          <h3>change tag</h3>
          <input type='text' />
        </div>
        <div>
          <h3>change password</h3>
          <input type='text' />
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;
