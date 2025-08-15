import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

/** **************************************
 * Split layout
 *************************************** */
const SplitLayout = {
  SignInPage: lazy(() => import('src/pages/candidateAuth/sign-in')),
  // SignUpPage: lazy(() => import('src/pages/candidateAuth/sign-up')),
  // VerifyPage: lazy(() => import('src/pages/candidateAuth/verify')),
  // ResetPasswordPage: lazy(() => import('src/pages/candidateAuth/reset-password')),
  // UpdatePasswordPage: lazy(() => import('src/pages/candidateAuth/update-password')),
  // TwoFactorVerify: lazy(() => import('src/pages/candidateAuth/two-factor-verify')),
};

export const candidateAuth = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/`,
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'adminlogin',
        element: (
          <MainLayout section={{ title: 'Hi, Welcome back' }}>
            <SplitLayout.SignInPage />
          </MainLayout>
        ),
      },
      {
        path: 'sign-up',
        // element: <MainLayout>{<SplitLayout.SignUpPage />}</MainLayout>,
      },
      // {
      //   path: 'verify',
      //   element: (
      //     <MainLayout>
      //       <SplitLayout.VerifyPage />
      //     </MainLayout>
      //   ),
      // },
      {
        path: 'forgot-password',
        element: <MainLayout>{/* <SplitLayout.ResetPasswordPage /> */}</MainLayout>,
      },
      {
        path: 'update-password',
        element: <MainLayout>{/* <SplitLayout.UpdatePasswordPage /> */}</MainLayout>,
      },
      // {
      //   path: 'two-factor-verify',
      //   element: (
      //     <MainLayout>
      //       <SplitLayout.TwoFactorVerify />
      //     </MainLayout>
      //   ),
      // },
    ],
  },
];
