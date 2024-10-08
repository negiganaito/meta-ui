import { createBrowserRouter } from 'react-router-dom';

import { Home } from './home';

export const router = createBrowserRouter({
  path: '/',
  children: [{ index: true, element: <Home /> }],
});
