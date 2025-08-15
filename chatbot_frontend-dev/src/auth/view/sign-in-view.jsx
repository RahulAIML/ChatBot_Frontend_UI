import { paths } from 'src/routes/paths';
import { FormHead } from '../components/form-head';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { IconButton, Stack } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { ZodError } from 'zod';
import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';
import { SignUpSchema } from 'src/validation/institute/auth';
import { useAdminloginMutation } from 'src/redux/slices/common/auth';
import { toast } from 'src/components/snackbar';
import Tooltip from '@mui/material/Tooltip';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'src/routes/hooks';
import { setAuthUserState } from '../../redux/slices/features-slice/user';

import { m } from 'framer-motion';
import { styled } from '@mui/material/styles';

const AuthContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ee 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(56,107,203,0.05) 0%, transparent 70%)',
    animation: 'rotate 20s linear infinite',
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const AuthCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  margin: 'auto',
  padding: theme.spacing(4),
  borderRadius: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  zIndex: 1,
}));

const AuthTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(100, 150, 255, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(100, 150, 255, 0.6)',
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));

const AuthButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: 8,
  height: 48,
  background: 'linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none', // Explicitly disable uppercase
  '&:hover': {
    background: 'linear-gradient(90deg, #0062e0 0%, #00b6f0 100%)',
  },
  boxShadow: '0 4px 15px rgba(0, 114, 255, 0.3)',
}));

export function SplitSignInView() {
  const [state, setState] = useState({
    password: '',
    passwordErr: false,
    passwordErrMsg: '',
    userId: '',
    userIdErr: false,
    userIdErrMsg: '',
    showPassword: false,
  });
  const { i18n, t } = useTranslation();
  const [handelSubmit, { isLoading, error, isError, isSuccess, data: loginData }] =
    useAdminloginMutation();

  // const navigation = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch();

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };
  const togglePasswordVisibility = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };
  const validate = (_e) => {
    _e.preventDefault();
    try {
      //SignUpSchema.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        if (errors?.length > 0) {
          // Use an if statement instead of '&&'
          errors.forEach((e) => {
            if (e.message !== '') {
              const field = `${e.path[0]}Err`; // Field name construction
              setState((prevState) => ({
                ...prevState,
                [field]: true, // Set error flag
                [`${e.path[0]}ErrMsg`]: e.message, // Set error message
              }));
            }
          });
        }
      }
      return;
    }

    handelSubmit({
      username: state.userId,
      password: state.password,
    });

    /* api call */
  };
  // toast.promise({
  //   loading: 'Loading',
  //   success: 'Got the data',
  //   error: 'Error when fetching',
  // });
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && loginData) {
      if (loginData?.token) {
        toast.success('Login Successfully');
        dispatch(
          setAuthUserState({
            isAuthenticated: 'authenticated',
            user: {},
            isInitialized: true,
          })
        );
        localStorage.setItem('admintoken', loginData?.token);
        router.push(paths.admin.root);
        // if (loginData?.data?.UserTypeID == 61) {
        //   localStorage.setItem('mcainstituteToken', loginData?.data?.token);
        //   if (loginData?.data?.IsPasswordResetDone == 1) {
        //     router.push(paths.institute.root);
        //   } else {
        //     router.push(paths.institute.profile);
        //   }
        // } else {
        //   localStorage.setItem('adminToken', loginData?.data?.token);
        //   router.push(paths.admin.root);
        // }
      }
    }
  }, [isSuccess, loginData]);

  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto', width: 90, height: 90 }} />;

  return (
    <AuthContainer>
      <AuthCard component={m.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          {renderLogo}
          <Typography variant="h4" sx={{ mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
            CHTABOT ADMIN
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)' }}>
            Please Login to continue
          </Typography>
        </Box>

        <Stack spacing={3}>
          <AuthTextField
            inputProps={{ style: { autoComplete: 'off' } }}
            name="userId"
            label="Login Id"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="mdi:account" width={24} color="rgba(0,0,0,0.7)" />
                </InputAdornment>
              ),
            }}
            helperText={t(state.userIdErrMsg)}
            error={state.userIdErr}
            autoFocus
            fullWidth
            margin="normal"
            onChange={(e) => {
              handelChange(e);
            }}
            type="text"
            value={state.userId}
            size="small"
          />

          <AuthTextField
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            name="password"
            label={t('Password')}
            margin="normal"
            onChange={handelChange}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            size="small"
            autoComplete="off"
            InputProps={{
              // Adding InputProps for the input customization
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="mdi:lock" width={24} color="rgba(0,0,0,0.7)" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    <Iconify
                      icon={state.showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                      color="rgba(0,0,0,0.7)"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={t(state.passwordErrMsg)}
            error={state.passwordErr}
          />
          <FormHead
            title=""
            description={
              <>
                {`Go Home ? `}
                <Link component={RouterLink} href={paths.home} variant="subtitle2">
                  Click Here
                </Link>
              </>
            }
          />
          <AuthButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={validate}
            loading={isLoading}
          >
            Log In
          </AuthButton>
        </Stack>
      </AuthCard>
    </AuthContainer>
  );
}
