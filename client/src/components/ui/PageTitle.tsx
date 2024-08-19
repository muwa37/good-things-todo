type Props = { pageTitle: string };

const PageTitle = ({ pageTitle }: Props) => {
  return <h1 className='text-6xl font-extrabold'>{pageTitle}</h1>;
};

export default PageTitle;
