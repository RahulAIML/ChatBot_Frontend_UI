import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';
export const OptionFromGuard = (props) => {
  const router = useRouter();
  const location = useLocation();
  const { children } = props;

  const { permission, isAuthenticated } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(true);

  function check(round) {
    switch (round) {
      case 1:
        return permission?.capOne;
      case 2:
        return permission?.capTwo;
      case 3:
        return permission?.capThree;
      case 4:
        return permission?.capFour;
      default:
        return 0;
    }
  }
  const capCheck = check(Number(import.meta.env.VITE_CAP_ROUND));

  useEffect(() => {
    if (isAuthenticated != 'disconnected' && !capCheck) {
      router.replace(paths.candidate.root);
      setChecked(false);
    } else {
      if (
        isAuthenticated != 'disconnected' &&
        permission?.optionFormConfirmation &&
        location.pathname != `${import.meta.env.VITE_SUBFOLDER_NAME}/candidate/optionForm`
      ) {
        router.replace(paths.candidate.root);
        setChecked(false);
      } else {
        setChecked(true);
      }
    }
  }, [capCheck, isAuthenticated]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
