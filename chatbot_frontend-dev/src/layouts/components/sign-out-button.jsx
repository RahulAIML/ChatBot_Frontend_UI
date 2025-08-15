import { useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { toast } from 'src/components/snackbar';

import { logout } from '../../redux/slices/features-slice/user';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutCandidateMutation } from 'src/redux/slices/candidate/auth';
import { useLogoutFCMutation } from 'src/redux/slices/fc/auth';
import { useInstlogoutMutation } from 'src/redux/slices/institute/auth';
import { LoadingButton } from '@mui/lab';

export function SignOutButton({ onClose, ...other }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutCandidate, { isLoading, isSuccess }] = useLogoutCandidateMutation();
  const [logoutFC, { isLoading: fcLoading, isSuccess: fcIsSuccess }] = useLogoutFCMutation();
  const [logoutInstitute, { isLoading: instLoading, isSuccess: instIsSuccess }] =
    useInstlogoutMutation();

  // const handleLogout = useCallback(async () => {
  //   logoutFn({
  //     dispatch,
  //     logoutCandidate,
  //     logoutFC,
  //     logoutInstitute,
  //     user,
  //   });
  // }, [onClose, router]);

  return (
    <LoadingButton
      loading={isLoading || fcLoading || instLoading}
      fullWidth
      variant="soft"
      size="large"
      color="error"
      // onClick={handleLogout}
      {...other}
    >
      Logout
    </LoadingButton>
  );
}
