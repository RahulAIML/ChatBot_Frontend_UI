import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { MainLayout } from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';
import { mainRoutes } from './main';
import { candidateAuth } from './candidateAuth';

import { useSelector, useDispatch } from 'react-redux';
import { setAuthUserState } from '../../redux/slices/features-slice/user';
// import { useMeCandidateDetailsMutation } from '../../redux/slices/candidate/auth';
// import { useMeFCDetailsMutation } from 'src/redux/slices/fc/auth';
// import { useInstmeMutation } from 'src/redux/slices/institute/auth';
import { permisson } from 'src/service/permission.service';
import Login from 'src/pages/candidateAuth/sign-in';
import { adminDashboardRoutes } from './adminDashboard';
// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));

export function Router() {
  const dispatch = useDispatch();
  // const [refreshCandidateAuth] = useMeCandidateDetailsMutation();
  // const [refreshFCAuth] = useMeFCDetailsMutation();
  // const [refreshInstAuth] = useInstmeMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const candidateInitializeAuth = useCallback(async () => {
    try {
      const data = await refreshCandidateAuth({}).unwrap();
      const valueP = permisson(data?.data);
      console.log(data);
      dispatch(
        setAuthUserState({
          isAuthenticated: 'authenticated',
          user: {
            id: data?.data?.id,
            imagename: data?.data?.imagename,
            name: data?.data?.full_name,
            userId: data?.data?.user_id,
            fillStatus: data?.data?.fill_status,
            lockForm: data?.data?.lock_form,
            isarcconfirmed: data?.data?.isarcconfirmed,
            discrepancy: data?.data?.discrepancy,
            isGrievance: data?.data?.isGrievance,
            mode: data?.data?.mode,
            checkChoiceCodeChangeFlag: data?.data?.checkChoiceCodeChangeFlag,
            roundStatus: data?.data?.roundStatus,
            groupID: data?.data?.user?.group_id,
          },
          isInitialized: true,
          optionFormCompleteData: data?.data?.optionFormCompleteData,
          seatAcceptedData: data?.data?.seatAcceptDetails,
          permisson: valueP,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fcInitializeAuth = useCallback(async () => {
    try {
      const data = await refreshFCAuth({}).unwrap();
      dispatch(
        setAuthUserState({
          isAuthenticated: 'authenticated',
          user: {
            username: data?.data?.username,
            userId: data?.data?.id,
            userrole: data?.data?.userrole,
            isEfc: data?.data?.iseFC,
            isUsed: data?.data?.isused,
            groupID: data?.data?.group_id,
          },
          isInitialized: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const instInitializeAuth = useCallback(async () => {
    try {
      const data = await refreshInstAuth({}).unwrap();
      dispatch(
        setAuthUserState({
          isAuthenticated: 'authenticated',
          user: {
            username: data?.data?.username,
            userId: data?.data?.id,
            // userrole: data?.data?.userrole,
            // isEfc: data?.data?.iseFC,
            // isUsed: data?.data?.isused,
            // groupID: data?.data?.group_id,
            isUsed: data?.data?.isused,
            instname: data?.data?.name,
            groupID: data?.data?.group_id,
            isExitForCAP: data?.data?.isExitForCAP,
            isFcExists: data?.data?.isFcExists,
          },
          isInitialized: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // const mcacandidateToken = localStorage.getItem('mcacandidateToken');
    // if (mcacandidateToken) {
    //   candidateInitializeAuth();
    // }
    // const mcafcToken = localStorage.getItem('mcafcToken');
    // if (mcafcToken) {
    //   fcInitializeAuth();
    // }
    // const mcaInstToken = localStorage.getItem('mcainstituteToken');
    // if (mcaInstToken) {
    //   instInitializeAuth();
    // }
  }, [isAuthenticated]);

  return useRoutes([
    {
      path: `${import.meta.env.VITE_SUBFOLDER_NAME}/`,
      /**
       * Skip home page
       * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
       */
      element: (
        <Suspense fallback={<SplashScreen />}>
          <MainLayout>
            <HomePage />
          </MainLayout>
        </Suspense>
      ),
    },
    // {
    //   path: `${import.meta.env.VITE_SUBFOLDER_NAME}/contact-us`,
    //   element: (
    //     <Suspense fallback={<SplashScreen />}>
    //       <MainLayout>
    //         <ContactUsPage />
    //       </MainLayout>
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: `${import.meta.env.VITE_SUBFOLDER_NAME}/advance-search`,
    //   element: (
    //     <Suspense fallback={<SplashScreen />}>
    //       <MainLayout>
    //         <AdvanceSearchPage />
    //       </MainLayout>
    //     </Suspense>
    //   ),
    // },

    // Auth

    // Candidate  Dashboard

    ...candidateAuth,
    ...adminDashboardRoutes,
    // ...instituteAuth,
    // ...fcAuth,
    // ...instituteDashboardRoutes,
    // ...fcDashboardRoutes,
    // ...candidateDashboardRoutes,

    // Main
    ...mainRoutes,
    // No match

    // {
    //   path: `${import.meta.env.VITE_SUBFOLDER_NAME}/activity_scedule_march24.pdf`,
    //   element: (
    //     <Navigate to={`${import.meta.env.VITE_SUBFOLDER_NAME}/activity_scedule_march24.pdf`} />
    //   ),
    // },
    // {
    //   path: '*',
    //   element: <Navigate to={`${import.meta.env.VITE_SUBFOLDER_NAME}/404`} replace />,
    // },
    // {
    //   path: 'adminlogin',
    //   element: <Navigate to={<Login />} />,
    // },
  ]);
}
