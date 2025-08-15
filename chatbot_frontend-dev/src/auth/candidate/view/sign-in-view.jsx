import { paths } from 'src/routes/paths';
import { FormHead } from '../../components/form-head';
import { useState, useEffect } from 'react';
import { Box, TextField, Typography, useMediaQuery, Grid, Container, Card } from '@mui/material';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, Stack } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { ZodError } from 'zod';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { SignUpSchema } from 'src/validation/candidate/auth';
import { useLoginCandidateMutation } from 'src/redux/slices/candidate/auth';
import { toast } from 'src/components/snackbar';
import ReCAPTCHA from 'react-google-recaptcha';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { setAuthUserState } from '../../../redux/slices/features-slice/user';
import { Section } from './section';
import { CONFIG } from 'src/config-global';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export function SplitSignInView() {
  const searchParams = useSearchParams();
  const masterValue = searchParams.get('master');
  const [state, setState] = useState({
    password: '',
    passwordErr: false,
    passwordErrMsg: '',
    userId: `${import.meta.env.VITE_PREFIX}`,
    userIdErr: false,
    userIdErrMsg: '',
    showPassword: false,
  });
  const [open, setOpen] = useState(false);
  const handelClose = () => {
    setOpen(false);
  };
  const { i18n, t } = useTranslation();
  const [handelSubmit, { isLoading, error, isError, isSuccess, data: loginData }] =
    useLoginCandidateMutation();
  const [captcha, setcaptcha] = useState('');
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
      if (captcha?.trim() == '') {
        toast.error('Please fill the captcha');
        return;
      }
      SignUpSchema.parse(state);
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
      course_name: import.meta.env.VITE_APPNAME_SMALL,
      captcha: captcha,
      is_confirm: 0,
    });

    /* api call */
  };
  // toast.promise({
  //   loading: 'Loading',
  //   success: 'Got the data',
  //   error: 'Error when fetching',
  // });
  useEffect(() => {
    if (masterValue != 'true' && Number(import.meta.env.VITE_IS_SSO) == 1) {
      router.push(paths.sso);
    }
  }, []);
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
      if (error?.data?.previous) {
        setOpenD(true);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && loginData) {
      if (loginData?.data?.token) {
        localStorage.setItem(
          `${import.meta.env.VITE_APPNAME_SMALL}candidateToken`,
          loginData?.data?.token
        );
        toast.success(loginData?.message);
        dispatch(
          setAuthUserState({
            isAuthenticated: 'authenticated',
            user: {
              id: loginData?.data?.id,
              isActive: loginData?.data?.isActive,
            },
            isInitialized: true,
          })
        );
        router.push(paths.candidate.root);
        setOpenD(false);
        // if (loginData?.data?.isActive == 0) {
        //   router.push(paths.institute.profile);
        // } else {
        //   router.push(paths.institute.root);
        // }
      }
    }
  }, [isSuccess, loginData]);

  const onRecapchaChange = async (value) => {
    setcaptcha(value);
  };
  const layoutQuery = 'md';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [openD, setOpenD] = useState(false);

  const handleClose = () => {
    setOpenD(false);
  };

  const handleConfirm = () => {
    handelSubmit({
      username: state.userId,
      password: state.password,
      course_name: import.meta.env.VITE_APPNAME_SMALL,
      captcha: captcha,
      is_confirm: 1,
    });
  };
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={4} style={{ display: isMobile ? 'none' : 'block' }}>
          <Section
            title={'Candidate Login'}
            layoutQuery={layoutQuery}
            // imgUrl={section?.imgUrl}
            method={CONFIG.auth.method}
          />
        </Grid>
        <Grid item xs={isMobile ? 12 : 8} mt={isMobile ? 2 : 16}>
          <Box>
            {isMobile && (
              <FormHead
                title="CANDIDATE LOGIN"
                description={
                  <>
                    {`Don't have an account? `}
                    <Link
                      component={RouterLink}
                      href={
                        Number(import.meta.env.VITE_IS_SSO) == 1
                          ? paths.launchPad
                          : paths.auth.candidate.signup
                      }
                      variant="subtitle2"
                    >
                      Register
                    </Link>
                  </>
                }
              />
            )}

            <Box display="flex" justifyContent={'center'}>
              <form noValidate onSubmit={validate} autoComplete="off" style={{ padding: '20px' }}>
                <Alert severity="info" sx={{ mb: 3 }}>
                  <strong>Instruction For Login</strong>{' '}
                  <Link onClick={() => setOpen(true)}>Click Here</Link>
                </Alert>

                <TextField
                  helperText={t(state.userIdErrMsg)}
                  error={state.userIdErr}
                  autoFocus
                  fullWidth
                  margin="normal"
                  name="userId"
                  onChange={(e) => {
                    if (e.target.value?.length <= 10) {
                      handelChange(e);
                    }
                  }}
                  type="text"
                  value={state.userId}
                  size="small"
                  inputProps={{
                    autoComplete: 'off',
                  }}
                  label="Application Id"
                />

                <TextField
                  fullWidth
                  inputProps={{
                    autoComplete: 'off',
                  }}
                  helperText={t(state.passwordErrMsg)}
                  error={state.passwordErr}
                  label={t('Password')}
                  margin="normal"
                  name="password"
                  onChange={handelChange}
                  type={state.showPassword ? 'text' : 'password'}
                  value={state.password}
                  size="small"
                  autoComplete="off"
                  InputProps={{
                    // Adding InputProps for the input customization
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          <Iconify
                            icon={state.password ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid item xs={12}>
                  <ReCAPTCHA
                    sitekey={`${import.meta.env.VITE_GOOGLE_SITE_KEY}`}
                    onChange={onRecapchaChange}
                    style={{ width: '100%', maxWidth: '85%' }}
                    type="image"
                  />
                </Grid>

                <FormHead
                  title=""
                  description={
                    <>
                      {`Are you forgot your password? `}
                      <Link
                        component={RouterLink}
                        href={paths.auth.candidate.forgotpassword}
                        variant="subtitle2"
                      >
                        Forgot password?
                      </Link>
                    </>
                  }
                />
                <FormHead
                  title=""
                  description={
                    <>
                      {`Don't have an account?  `}
                      <Link
                        component={RouterLink}
                        href={
                          Number(import.meta.env.VITE_IS_SSO) == 1
                            ? paths.launchPad
                            : paths.auth.candidate.signup
                        }
                        variant="subtitle2"
                      >
                        Register
                      </Link>
                    </>
                  }
                />

                <LoadingButton
                  fullWidth
                  color="inherit"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Log In
                </LoadingButton>
              </form>
            </Box>
            {/* <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                 
                </Grid>
                {!isMobile && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      backgroundColor: '#a6e8a6',
                      p: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        p: { xs: 1, sm: 2, md: 2 },
                        // minHeight: '100vh',
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ color: 'primary.main', textDecoration: 'underline' }}
                        >
                          Important Instructions for Login
                        </Typography>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} mt={1}>
                        <Typography variant="subtitle2" component={'span'}>
                          <Iconify icon={'weui:arrow-filled'} />
                        </Typography>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                            Enter Application ID & Password and Click on Login Button.
                          </Typography>
                        </Box>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} mt={1}>
                        <Typography variant="subtitle2" component={'span'}>
                          <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />
                        </Typography>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                            Do not share your username and password.
                          </Typography>
                        </Box>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} mt={1}>
                        <Typography variant="subtitle2" component={'span'}>
                          <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />
                        </Typography>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                            This computer system is for authorized users only. All activity is
                            logged and regulary checked by systems personal. Individuals using this
                            system without authority or in excess of their authority are subject to
                            having all their services revoked. Any illegal services run by user or
                            attempts to take down this server or its services will be reported to
                            local law enforcement, and said user will be punished to the full extent
                            of the law.
                          </Typography>
                        </Box>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} mt={1}>
                        <Typography variant="subtitle2" component={'span'}>
                          <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />
                        </Typography>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                            Log Out your session properly after completing activity.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid> */}
          </Box>
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handelClose}>
        <DialogContent sx={{ typography: 'body2' }}>
          <Box
            sx={{
              p: { xs: 1, sm: 2, md: 2 },
              // minHeight: '100vh',
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                Important Instructions for Login
              </Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'} mt={1}>
              <Typography variant="subtitle2" component={'span'}>
                <Iconify icon={'weui:arrow-filled'} />
              </Typography>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  Enter Application ID & Password and Click on Login Button.
                </Typography>
              </Box>
            </Box>
            <Box display={'flex'} alignItems={'center'} mt={1}>
              <Typography variant="subtitle2" component={'span'}>
                <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />
              </Typography>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  Do not share your username and password.
                </Typography>
              </Box>
            </Box>
            <Box display={'flex'} alignItems={'center'} mt={1}>
              <Typography variant="subtitle2" component={'span'}>
                <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />
              </Typography>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  This computer system is for authorized users only. All activity is logged and
                  regulary checked by systems personal. Individuals using this system without
                  authority or in excess of their authority are subject to having all their services
                  revoked. Any illegal services run by user or attempts to take down this server or
                  its services will be reported to local law enforcement, and said user will be
                  punished to the full extent of the law.
                </Typography>
              </Box>
            </Box>
            <Box display={'flex'} alignItems={'center'} mt={1}>
              <Typography variant="subtitle2" component={'span'}>
                <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />
              </Typography>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  Log Out your session properly after completing activity.
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handelClose}
            sx={{ color: 'error.main' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openD} onClose={handleClose}>
        <DialogTitle fontWeight="bold">Active Session Detected</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You already have an active session, you will be logged out from your previous session.
            Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            No
          </Button>
          <LoadingButton
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            autoFocus
            loading={isLoading}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
