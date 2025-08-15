import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useSelector, useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export function AuthGuard({ children }) {
  const router = useRouter();

  const pathname = usePathname();
  const { isAuthenticated, isInitialized, user } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();
  // const { authenticated, loading } = useAuthContext(); // TODO : need to change with redux

  // const { isAuthenticated, isInitialized } = { isAuthenticated: false, loading: false };

  const [isChecking, setIsChecking] = useState(true);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = async () => {
    // console.log(isAuthenticated, 'isAuthsdsdsenticated');
    // if (loading) {
    //   return;
    // }

    if (isAuthenticated == 'disconnected' && !localStorage.getItem('mcacandidateToken')) {
      // const { method } = CONFIG.auth;

      // const signInPath = {
      //   jwt: paths.institute.jwt.signIn,
      // }[method];

      // console.log(signInPath, 'signInPath');

      // const href = `${paths.institute.signIn}?${createQueryString('returnTo', pathname)}`;

      router.replace(paths.home);

      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isInitialized]);

  useEffect(() => {
    // if (user?.IsPasswordResetDone != 1) {
    //   router.push(paths.institute.profile);
    // }
  }, [user, pathname]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
