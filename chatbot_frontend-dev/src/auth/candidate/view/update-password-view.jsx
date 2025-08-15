import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { CONFIG } from 'src/config-global';
import { Box, Stack, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from 'src/hooks/use-boolean';
import { SentIcon } from 'src/assets/icons';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { FormHead } from '../../components/form-head';
import { EmailInboxIcon } from 'src/assets/icons';
import { FormResendCode } from '../../components/form-resend-code';
import { FormReturnLink } from '../../components/form-return-link';
import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';
import { useVerifyForgotPasswordOtpMutation } from 'src/redux/slices/candidate/auth';
import { toast } from 'src/components/snackbar';
import { Section } from './section';
export const UpdatePasswordSchema = zod.object({
  code: zod
    .string()
    .min(1, { message: 'OTP is required!' })
    .min(6, { message: 'OTP must be at least 6 digit!' }),

  // password: zod
  //   .string()
  //   .min(1, { message: 'Password is required!' })
  //   .min(6, { message: 'Password must be at least 6 characters!' }),
  // confirmPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: 'Passwords do not match!',
//   path: ['confirmPassword'],
// });

export function SplitUpdatePasswordView() {
  const router = useRouter();
  const password = useBoolean();
  const confirmPassword = useBoolean();
  const defaultValues = {
    code: '',
    password: '',
    confirmPassword: '',
  };
  const [changePassword, { isLoading, error, isError, isSuccess, data }] =
    useVerifyForgotPasswordOtpMutation();
  useEffect(() => {
    if (!localStorage.getItem('candidateForgotToken')) {
      router.push(paths.auth.candidate.login);
    }
  }, []);
  const methods = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      changePassword({ otp: data?.code });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      localStorage.clear();
      router.push(paths.auth.candidate.login);
    }
  }, [isSuccess, data]);
  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Code name="code" />

      {/* <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={
          <Stack component="span" direction="row" alignItems="center">
            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> The password must be
            between 7 to 15 characters which contain at least one uppercase letter, one lowercase
            letter, and one number.
          </Stack>
        }
      />

      <Field.Text
        name="confirmPassword"
        label="Confirm new password"
        type={confirmPassword.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={confirmPassword.onToggle} edge="end">
                <Iconify
                  icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      /> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        loadingIndicator="Update password..."
      >
        Update password
      </LoadingButton>
    </Box>
  );

  return (
    <>
      {/* <FormHead
        icon={<SentIcon />}
        title="Request sent successfully!"
        description={`We've sent a 6-digit OTP to your Mobile No. \nPlease enter the OTP in below box to update Password.`}
      /> */}

      {/* <Box gap={3} display="flex" justifyContent={'center'} mt={3}>
        <Form methods={methods} onSubmit={onSubmit}>
          {renderForm}
        </Form>
      </Box>
      <FormResendCode onResendCode={() => {}} value={0} disabled={false} /> */}
      {/* <FormReturnLink href={paths.instituteitute.signIn} /> */}

      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Section
              title={''}
              layoutQuery={'md'}
              imgUrl={`${CONFIG.assetsDir}/assets/illustrations/illustration-dashboard.webp`}
              method={CONFIG.auth.method}
              subtitle={''}
            ></Section>
          </Grid>
          <Grid item xs={12} md={6} mt={10}>
            <Box p={4}>
              <FormHead
                icon={<EmailInboxIcon />}
                title="Request sent successfully!"
                description={`We've sent a 6-digit OTP to your Mobile No. \nPlease enter the OTP in below box to update Password.`}
              />

              <Box gap={3} display="flex" justifyContent={'center'} mt={3}>
                <Form methods={methods} onSubmit={onSubmit}>
                  {renderForm}
                </Form>
              </Box>
              <FormResendCode onResendCode={() => {}} value={0} disabled={false} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
