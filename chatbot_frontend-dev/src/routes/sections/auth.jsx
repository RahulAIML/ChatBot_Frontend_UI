import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

/** **************************************
 * Split layout
 *************************************** */
const SplitLayout = {
  // SignInPage: lazy(() => import('src/pages/auth/sign-in')),
  // ForgotPassword: lazy(() => import('src/pages/auth/forgot-password')),
};

export const auth = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/auth`,
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      // {
      //   path: 'sign-in',
      //   element: (
      //     <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
      //       <SplitLayout.SignInPage />
      //     </AuthSplitLayout>
      //   ),
      // },
      // {
      //   path: 'forgot-password',
      //   element: (
      //     <AuthSplitLayout>
      //       <SplitLayout.ForgotPassword />
      //     </AuthSplitLayout>
      //   ),
      // },
    ],
  },
];
