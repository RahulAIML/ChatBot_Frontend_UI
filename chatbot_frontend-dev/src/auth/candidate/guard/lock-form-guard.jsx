import { useState, useEffect } from 'react';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { SplashScreen } from 'src/components/loading-screen';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export function LockFormGuard({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (user?.lockForm != 0) {
      router.replace(paths.candidate.root);
      return;
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
  }, [user]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
