import { z as zod } from 'zod';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { CONFIG } from 'src/config-global';
import { PasswordIcon } from 'src/assets/icons';
import { ZodError } from 'zod';
import { Form, Field } from 'src/components/hook-form';
import { Box, TextField, Card, Container, Grid, Typography } from '@mui/material';
import { FormHead } from '../../components/form-head';
import { FormReturnLink } from '../../components/form-return-link';
import { resetPasswordVerfication } from 'src/validation/candidate/auth';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordOTPMutation } from 'src/redux/slices/candidate/auth';
import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
import { Section } from './section';
import { useMediaQuery } from '@mui/material';

export function SplitResetPasswordView() {
  const router = useRouter();
  const [state, setState] = useState({
    mobile: '',
    mobileErr: false,
    mobileErrMsg: '',
    userId: `${import.meta.env.VITE_PREFIX}`,
    userIdErr: false,
    userIdErrMsg: '',
  });
  const { i18n, t } = useTranslation();
  const [verifyUserId, { isLoading, error, isError, isSuccess, data }] =
    useForgotPasswordOTPMutation();

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };

  const validate = (_e) => {
    _e.preventDefault();
    try {
      resetPasswordVerfication.parse(state);
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

    verifyUserId({
      username: state.userId,
      phone: state.mobile,
      course_name: import.meta.env.VITE_APPNAME_SMALL,
    });

    /* api call */
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.token) {
        localStorage.setItem('candidateForgotToken', data?.token);
        toast.success(data?.message);
        router.push(paths.auth.candidate.updatepassword);
      }
    }
  }, [isSuccess, data]);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Box>
      {/* <FormHead
        icon={<PasswordIcon />}
        title="Forgot your password?"
        description={`Please enter the email address associated with your account and we'll email you a link to reset your password.`}
      /> */}
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Section
            title={'Forgot your password?'}
            layoutQuery={'md'}
            imgUrl={`${CONFIG.assetsDir}/assets/illustrations/illustration-dashboard.webp`}
            method={CONFIG.auth.method}
            subtitle={'Please enter the Application Id & Mobile No. to reset your password.'}
          ></Section>
        </Grid>

        <Grid item xs={12} md={6} mt={isMobile ? 2 : 8}>
          <Box p={4}>
            <FormHead
              icon={<PasswordIcon />}
              title="Forgot your password?"
              description={`Please enter the Application Id & Mobile No. to reset your password.`}
            />

            <Box gap={3} display="flex" justifyContent={'center'} mt={3}>
              <form noValidate onSubmit={validate} autoComplete="off">
                <Box
                  display="flex"
                  gap={{ xs: 3, sm: 2 }}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                >
                  <TextField
                    helperText={t(state.userIdErrMsg)}
                    error={state.userIdErr}
                    autoFocus
                    fullWidth
                    margin="normal"
                    name="userId"
                    onChange={(e) => {
                      if (e.target.value?.length <= 11) {
                        handelChange(e);
                      }
                    }}
                    type="text"
                    value={state.userId}
                    size="small"
                    inputProps={{
                      autoComplete: 'off',
                    }}
                    label="Application ID"
                  />
                </Box>
                <TextField
                  fullWidth
                  inputProps={{
                    autoComplete: 'off',
                  }}
                  helperText={t(state.mobileErrMsg)}
                  error={state.mobileErr}
                  label={t('Mobile')}
                  margin="normal"
                  name="mobile"
                  onChange={(e) => {
                    if (e.target.value?.length <= 10) {
                      handelChange(e);
                    }
                  }}
                  type={'text'}
                  value={state.mobile}
                  size="small"
                  autoComplete="off"
                />
                <LoadingButton
                  fullWidth
                  color="inherit"
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Verify
                </LoadingButton>
                <FormReturnLink href={paths.auth.candidate.login} />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
