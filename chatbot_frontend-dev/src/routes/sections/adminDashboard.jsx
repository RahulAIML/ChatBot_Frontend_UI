import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/admin/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard/auth-guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/admin/index'));
const UploadPage = lazy(() => import('src/pages/admin/upload/index'));
// const Profile = lazy(() => import('src/pages/institute/profile/index'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const adminDashboardRoutes = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/admin`,
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [{ element: <IndexPage />, index: true }, 
      { element: <UploadPage />, path: 'upload' }],
  },
];
