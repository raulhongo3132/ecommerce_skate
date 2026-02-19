import { useRoutes } from 'react-router-dom';

import Home from '../Pages/Home';
import MyAccount from '../Pages/MyAccount';
import MyOrder from '../Pages/MyOrder';
import MyOrders from '../Pages/MyOrders';
import NotFound from '../Pages/NotFound';
import SignIn from '../Pages/SignIn';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import ProtectedRoute from '../Components/ProtectedRoute';

export const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/:category', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },

    {
      path: '/my-account',
      element: (
        <ProtectedRoute>
          <MyAccount />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-orders',
      element: (
        <ProtectedRoute>
          <MyOrders />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-orders/last',
      element: (
        <ProtectedRoute>
          <MyOrder />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-orders/:id',
      element: (
        <ProtectedRoute>
          <MyOrder />
        </ProtectedRoute>
      ),
    },

    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]);
};
