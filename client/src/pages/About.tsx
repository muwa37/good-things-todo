import MyLi from '../components/ui/MyLi';
import PageTitle from '../components/ui/PageTitle';
import { backendTechNames, frontendTechNames } from '../utils/constants';

const About = () => {
  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <PageTitle pageTitle='About Typ3Tr4in' />
      <div className='h-full w-full flex flex-col items-center justify-evenly'>
        <h3 className='text-2xl font-bold'>
          In this application you can have a list of good things to do and
          follow your friends to see their lists
        </h3>
        <div className=' w-1/3 h-1/3 flex flex-col items-center justify-evenly'>
          <h2 className='text-3xl font-bold'>Tech stack:</h2>
          <div className='w-full flex items-center justify-evenly'>
            <div className='h-full flex flex-col items-center justify-start '>
              <h4 className='text-3xl font-bold'>Frontend:</h4>
              <ul className='h-full flex flex-col items-center justify-start '>
                {frontendTechNames.map((techName) => (
                  <MyLi liTitle={techName} />
                ))}
              </ul>
            </div>
            <div className='h-full flex flex-col items-center justify-start '>
              <h4 className='text-3xl font-bold'>Backend:</h4>
              <ul className='h-full flex flex-col items-center justify-start '>
                {backendTechNames.map((techName) => (
                  <MyLi liTitle={techName} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
