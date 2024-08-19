import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../../pages/About';
import Auth from '../../pages/Auth';
import Friends from '../../pages/Friends';
import NotFound from '../../pages/NotFound';
import Todo from '../../pages/Todo';
import { selectIsAuth } from '../../store/user/selectors';
import { Main } from '../layout/Main';

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<About />} />
            <Route path='/auth' element={<Auth />} />
            {isAuth && <Route path='/friends' element={<Friends />} />}
            {isAuth && <Route path='/todo' element={<Todo />} />}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
