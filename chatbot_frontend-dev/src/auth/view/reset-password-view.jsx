import { z as zod } from 'zod';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

import { PasswordIcon } from 'src/assets/icons';
import { ZodError } from 'zod';
import { Form, Field } from 'src/components/hook-form';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from '@mui/material';
import { FormHead } from '../components/form-head';
import { FormReturnLink } from '../components/form-return-link';
import { forgototp, forgotSeqQues } from 'src/validation/auth';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordOTPMutation } from 'src/redux/slices/institute/auth';
import {
  useSecurityQuestionListMutation,
  useCheckSecurityQuestionMutation,
} from 'src/redux/slices/common/auth';
import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
export function SplitResetPasswordView({ navigate, choice }) {
  const router = useRouter();
  const [state, setState] = useState({
    mobile: '',
    mobileErr: false,
    mobileErrMsg: '',
    loginId: '',
    loginIdErr: false,
    loginIdErrMsg: '',
    question: '',
    questionErr: false,
    questionErrMsg: '',
    answer: '',
    answerErr: false,
    answerErrMsg: '',
  });
  const { i18n, t } = useTranslation();
  const [verify, { isLoading, error, isError, isSuccess, data }] =
    useCheckSecurityQuestionMutation();
  const [securityQuestionList, { data: securityQuestionData }] = useSecurityQuestionListMutation();

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
      if (choice == 1) {
        forgotSeqQues.parse(state);
      }
      if (choice == 2) {
        forgototp.parese(state);
      }

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
    if (choice == 1) {
      verify({
        loginId: state.loginId,
        question: Number(state.question),
        answer: state.answer,
      });
    }
    if (choice == 2) {
      // verify({
      //   loginId: state.loginId,
      //   mobile: state.mobile,
      // });
    }
    /* api call */
  };

  useEffect(() => {
    if (choice == 1) {
      securityQuestionList();
    }
  }, []);
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.data?.otp_Token) {
        localStorage.setItem('forgotToken', data?.data?.otp_Token);
        toast.success(data?.message);
        navigate();
      }
    }
  }, [isSuccess, data]);

  return (
    <>
      <FormHead
        icon={null}
        title={choice == 1 ? `Reset Password using Security Question` : `Reset Password using OTP`}
        description={``}
      />

      <form
        noValidate
        onSubmit={validate}
        autoComplete="off"
        //   {...props}
      >
        <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
          <TextField
            helperText={t(state.loginIdErrMsg)}
            error={state.loginIdErr}
            autoFocus
            fullWidth
            margin="normal"
            name="loginId"
            onChange={(e) => {
              handelChange(e);
            }}
            type="text"
            value={state.loginId}
            size="small"
            inputProps={{ style: { textTransform: 'uppercase', autoComplete: 'off' } }}
            label="Login Id"
          />
        </Box>
        {choice == 2 ? (
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
            onChange={handelChange}
            type={'number'}
            value={state.mobile}
            size="small"
            autoComplete="off"
          />
        ) : (
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Security Question</InputLabel>
              <Select
                required
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={state.question}
                error={state.questionErr}
                name="question"
                label="Security Question"
                onChange={handelChange}
              >
                {securityQuestionData &&
                  securityQuestionData?.data?.map((item, index) => (
                    <MenuItem key={index} value={item.SecurityQuestionID}>
                      {item.SecurityQuestion}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText error>{state.questionErrMsg}</FormHelperText>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={3}
              inputProps={{
                autoComplete: 'off',
                required: true,
              }}
              helperText={t(state.answerErrMsg)}
              error={state.answerErr}
              label={t(`Security Question's Answer`)}
              margin="normal"
              name="answer"
              onChange={handelChange}
              type={'text'}
              value={state.answer}
              size="small"
              autoComplete="off"
            />
          </>
        )}

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
      </form>

      {/* <FormReturnLink href={paths.customerAuth.signIn} /> */}
    </>
  );
}
