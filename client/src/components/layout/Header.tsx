import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsAuth } from '../../store/user/selectors';

const Header = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <header className='p-2 flex items-center'>
      <nav className='w-full h-full flex space-x-6 items-center justify-between'>
        <NavLink to='/' end>
          <div className='flex h-full items-center justify-center'>
            <h4 className='text-xl font-semibold text-blue-300 pl-2'>
              Good Things ToDo
            </h4>
          </div>
        </NavLink>
        <nav className='w-1/6 flex items-center justify-evenly'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'text-green-700' : 'hover:text-blue-300'
            }
            end
          >
            about
          </NavLink>

          <NavLink
            to='/auth'
            className={({ isActive }) =>
              isActive ? 'text-green-700' : 'hover:text-blue-300'
            }
            end
          >
            authorization
          </NavLink>
          {isAuth && (
            <NavLink
              to='/friends'
              className={({ isActive }) =>
                isActive ? 'text-green-700' : 'hover:text-blue-300'
              }
            >
              friends
            </NavLink>
          )}
          {isAuth && (
            <NavLink
              to='/todo'
              className={({ isActive }) =>
                isActive ? 'text-green-700' : 'hover:text-blue-300'
              }
            >
              todo
            </NavLink>
          )}
        </nav>
      </nav>
    </header>
  );
};

export default Header;
