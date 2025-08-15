import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from 'src/layouts/main';
import { SimpleLayout } from 'src/layouts/simple';
import { Navigate, useRoutes } from 'react-router-dom';
import { SplashScreen } from 'src/components/loading-screen';
import { CONFIG } from 'src/config-global';

const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));
const HomePage = lazy(() => import('src/pages/home'));
export const mainRoutes = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/home
    `,
    element: <Navigate to={CONFIG.auth.redirectPath} replace />,

    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          {
            path: '',
            element: <Navigate to={CONFIG.auth.redirectPath} />,
          },
        ],
      },

      {
        path: '',
        element: (
          <Suspense fallback={<SplashScreen />}>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </Suspense>
        ),
      },
      // {
      //   path: 'maintenance',
      //   element: (
      //     <SimpleLayout content={{ compact: true }}>
      //       <MaintenancePage />
      //     </SimpleLayout>
      //   ),
      // },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
