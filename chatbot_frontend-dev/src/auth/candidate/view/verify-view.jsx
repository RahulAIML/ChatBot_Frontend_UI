import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState, useEffect } from 'react';
import { Box, FormHelperText, Card, Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form } from 'src/components/hook-form';
import { FormHead } from '../../components/form-head';
import { FormResendCode } from '../../components/form-resend-code';
import { FormReturnLink } from '../../components/form-return-link';
import { VerifyEmailOTP, VerifyMobileOTP, VerifyWpOTP } from 'src/validation/candidate/auth';
import { toast } from 'src/components/snackbar';
import {
  useVerifyRegistrationOtpMutation,
  useGetDataForRegisterationVerifyMutation,
} from 'src/redux/slices/candidate/auth';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { ZodError } from 'zod';
export function SplitVerifyView({ navigate }) {
  const router = useRouter();
  const [state, setState] = useState({
    mobileotp: '',
    mobileotpErr: false,
    mobileotpErrMsg: '',
    emailotp: '',
    emailotpErr: false,
    emailotpErrMsg: '',
    wpotp: '',
    wpotpErr: false,
    wpotpErrMsg: '',
  });
  const [checkWhatsApp, { data: whatsAppData }] = useGetDataForRegisterationVerifyMutation();
  const [otpRegister, { isLoading, error, isError, isSuccess, data }] =
    useVerifyRegistrationOtpMutation();

  const handelChange = (_event, name) => {
    setState((_prevState) => ({
      ..._prevState,
      [name]: _event,
      [`${name}Err`]: false,
      [`${name}ErrMsg`]: '',
    }));
  };
  const validate = (_e) => {
    _e.preventDefault();
    try {
      VerifyMobileOTP.parse(state);
      VerifyEmailOTP.parse(state);
      if (whatsAppData?.data?.isWhatsApp) {
        VerifyWpOTP.parse(state);
      }
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        if (errors?.length > 0) {
          errors.forEach((e) => {
            if (e.message !== '') {
              const field = `${e.path[0]}Err`;
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

    otpRegister({
      mobileotp: state.mobileotp,
      emailotp: state.emailotp,
      ...(whatsAppData?.data?.isWhatsApp && { whatsappotp: state.wpotp }),
    });
  };

  useEffect(() => {
    checkWhatsApp();
    if (!localStorage.getItem('candidateRegistrationToken')) {
      router.push(paths.auth.candidate.signup);
    }
  }, []);

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data?.message);
      if (data?.data?.token) {
        localStorage.clear();
        localStorage.setItem('candidateRegistrationToken', data?.data?.token);
        navigate();
      }
    }
  }, [isSuccess, data]);
  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Container maxWidth="sm">
        <MuiOtpInput
          autoFocus
          gap={1.5}
          length={6}
          TextFieldsProps={{ error: !!state.mobileotpErr, placeholder: '-' }}
          value={state.mobileotp}
          name="mobileotp"
          type="number"
          onChange={(e) => {
            handelChange(e, 'mobileotp');
          }}
        />
        {state.mobileotpErr && (
          <FormHelperText sx={{ px: 2 }} error>
            {state.mobileotpErrMsg}
          </FormHelperText>
        )}

        <>
          <FormHead
            icon={null}
            title="Please check your email!"
            description={`We've emailed a 6-digit confirmation code. \nPlease enter the code in the box below to verify your email.`}
          />
          <MuiOtpInput
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{ error: !!state.emailotpErr, placeholder: '-' }}
            value={state.emailotp}
            name="emailotp"
            type="number"
            onChange={(e) => {
              handelChange(e, 'emailotp');
            }}
          />
          {state.emailotpErr && (
            <FormHelperText sx={{ px: 2 }} error>
              {state.emailotpErrMsg}
            </FormHelperText>
          )}{' '}
        </>

        {whatsAppData?.data?.isWhatsApp == 1 && (
          <>
            <FormHead
              icon={null}
              title="Please check your whatsapp!"
              description={`We've send a 6-digit confirmation code. \nPlease enter the code in the box below to verify your whatsapp.`}
            />
            <MuiOtpInput
              autoFocus
              gap={1.5}
              length={6}
              TextFieldsProps={{ error: !!state.wpotpErr, placeholder: '-' }}
              value={state.wpotp}
              name="wpotp"
              type="number"
              onChange={(e) => {
                handelChange(e, 'wpotp');
              }}
            />
            {state.wpotpErr && (
              <FormHelperText sx={{ px: 2 }} error>
                {state.wpotpErrMsg}
              </FormHelperText>
            )}{' '}
          </>
        )}
        <Box mt={3}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
            mt={4}
          >
            Create Account
          </LoadingButton>
        </Box>
      </Container>
    </Box>
  );

  return (
    <Box>
      <FormHead
        icon={null}
        title="Please check your mobile!"
        description={`We've sent a 6-digit OTP. \nPlease enter the OTP in the box below to verify your Mobile No.`}
      />

      <Form onSubmit={validate}>{renderForm}</Form>

      {/* <FormResendCode onResendCode={() => {}} value={0} disabled={false} /> */}

      {/* <FormReturnLink href={paths.candidateAuthDemo.centered.signIn} /> */}
    </Box>
  );
}
