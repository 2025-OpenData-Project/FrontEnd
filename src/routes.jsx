import { createBrowserRouter } from 'react-router';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
]);

export default routes;
