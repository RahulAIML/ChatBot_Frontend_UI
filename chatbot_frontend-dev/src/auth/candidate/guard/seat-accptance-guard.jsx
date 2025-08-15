import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
export const SeatAcceptanceGuard = (props) => {
  const location = useLocation();
  const { children } = props;
  const router = useRouter();
  const { permission, isAuthenticated } = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (
      isAuthenticated != 'disconnected' &&
      (permission?.seatAccepted || !permission.seat) &&
      location.pathname != `${import.meta.env.VITE_SUBFOLDER_NAME}/candidate/self-arc-home`
    ) {
      router.push(paths.candidate.selfARCHome);
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};
