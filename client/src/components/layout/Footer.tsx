const Footer = () => {
  return (
    <div className='p-2 w-full flex space-x-6 items-center justify-center text-sm'>
      <p>
        <a
          className='underline underline-offset-2 font-semibold text-green-700 hover:text-blue-300'
          href='https://github.com/muwa37'
        >
          github
        </a>
        <span>/</span>
        <a
          className=' underline underline-offset-2 font-semibold text-green-700 hover:text-blue-300'
          href='https://t.me/muwa1337'
        >
          telegram
        </a>
      </p>
    </div>
  );
};

export default Footer;
