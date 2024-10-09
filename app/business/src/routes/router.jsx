import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { BusinessCometApp } from '@meta-business/shell/business-comet-app';

import { Home } from './home';

const AuthLayout = () => {
  return (
    <BusinessCometApp>
      <Outlet />
    </BusinessCometApp>
  );
};

function ProtectedLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    // loader: authLoader(queryClient),
    element: <AuthLayout />,
    path: '/',
    children: [
      // {
      //   element: <LoginLayout />,
      //   path: 'login',
      //   children: [{ index: true, element: <Login /> }],
      // },
      {
        path: '',
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: '/healthz',
    element: <h3>Hey There!!! The App is Healthy</h3>,
  },
]);
