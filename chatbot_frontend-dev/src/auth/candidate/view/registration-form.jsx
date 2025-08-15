import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Button,
  FormHelperText,
  FormControlLabel,
  Link,
  FormLabel,
  RadioGroup,
  Radio,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import { ZodError } from 'zod';
import { Iconify } from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { registerValidate, mobileValidate, emailValidate } from 'src/validation/candidate/auth';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { toast } from 'src/components/snackbar';
import { useRegisterMutation, useCheckEmailOrPhoneMutation } from 'src/redux/slices/candidate/auth';
import { useGetDistrictMutation, useGetStateMutation } from 'src/redux/slices/common/other';

const items = [
  'Change Your Password Regularly',
  "Pick a password you will remember so you don't have to write it down",
  'Make it more than 10 characters and include capitals numbers and symbol',
  'Use a completely unique password',
];

const datadonot = [
  {
    text: "After successful payment please your email id to get transaction details. Print of the mail has to be submitted as 'Receipt of Online Payment'",
    color: 'error.noteText',
  },
  {
    text: 'use the same password everywhere',
    color: 'error.noteText',
  },
  {
    text: 'use of same pattern of numbers and words like abcd and 1234',
    color: 'error.noteText',
  },
];
export function RegistrationForm({ navigate }) {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const [doRegister, { isLoading, isSuccess, isError, data: registerData, error }] =
    useRegisterMutation();
  const [getState, { data: stateData }] = useGetStateMutation();
  const [getDistrict, { data: districtData }] = useGetDistrictMutation();

  const [checkMobileEmail] = useCheckEmailOrPhoneMutation();

  const [state, setState] = useState({
    isForeign: '',
    isForeignErr: false,
    isForeignErrMsg: '',
    foreignId: import.meta.env.VITE_PREFIX_FOREIGN,
    foreignIdErr: false,
    foreignIdErrMsg: '',
    dob: '',
    dobErr: false,
    dobErrMsg: '',
    fullname: '',
    fullnameErr: false,
    fullnameErrMsg: `If you are applying on the basis of ${import.meta.env.VITE_CET_SCORE} please enter your name as per name in CET (Please check your CET result card first and then fill the details). Other candidates can enter the name as per their HSC certificate.`,
    country: '',
    countryErr: false,
    countryErrMsg: '',
    countryCode: '',
    countryCodeErr: false,
    countryCodeErrMsg: '',
    password: '',
    passwordErr: false,
    passwordErrMsg: '',
    email: '',
    emailErr: false,
    emailErrMsg: '',
    phone: '',
    phoneErr: false,
    phoneErrMsg: '',
    stateCode: 0,
    stateCodeErr: false,
    stateCodeErrMsg: '',
    districtCode: 0,
    districtCodeErr: false,
    districtCodeErrMsg: '',
    confirmPassword: '',
    confirmPasswordErr: false,
    confirmPasswordErrMsg: '',
    isWhatsApp: 0,
    isWhatsAppErr: false,
    isWhatsAppErrMsg: '',
  });

  const handelChange = (_event) => {
    if (_event.target.name == 'fullname') {
      const a = _event.target.value.toUpperCase();
      setState((_prevState) => ({
        ..._prevState,
        [_event.target.name]: a,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: '',
      }));
    } else {
      setState((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.value,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: '',
      }));
    }
  };

  const validate = (_e) => {
    _e.preventDefault();

    try {
      registerValidate.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== '') {
              const field = error.path[0] + 'Err';

              setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: t(error.message),
              }));
            }
          });
      }
      return;
    }

    doRegister({
      isForeign: Number(state.isForeign),
      foreignId: state.isForeign == 1 ? state.foreignId : ' ',
      fullname: state.fullname,
      country: state.country,
      countryCode: Number(state.country) == 2 ? state.countryCode : '91',
      email: state.email,
      phone: state.phone,
      stateCode: state.stateCode,
      districtCode: state.districtCode,
      password: state.password,
      confirmPassword: state.confirmPassword,
      deviceDetails: isMobile ? 'MOBILE' : 'PC',
      course_name: import.meta.env.VITE_APPNAME_SMALL,
      isWhatsApp: state.isWhatsApp,
    });
    /* api call */
  };

  const checkPhoneNumber = async () => {
    try {
      mobileValidate.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== '') {
              const field = error.path[0] + 'Err';

              setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: t(error.message),
              }));
            }
          });
      }
      return;
    }

    try {
      const data = await checkMobileEmail({
        mobile: state.phone,
        course_name: import.meta.env.VITE_APPNAME_SMALL,
      });

      if (data?.data?.success) {
        setState((_prevState) => ({
          ..._prevState,

          phoneErr: false,
          phoneErrMsg: data.data?.message,
        }));
        toast.success(data?.data?.message);
      } else {
        setState((_prevState) => ({
          ..._prevState,

          phoneErr: true,
          phoneErrMsg: data?.error?.data?.message,
        }));
        toast.error(data?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailAddress = async () => {
    try {
      emailValidate.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== '') {
              const field = error.path[0] + 'Err';

              setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: t(error.message),
              }));
            }
          });
      }
      return;
    }

    try {
      const data = await checkMobileEmail({
        email: state.email,
        course_name: import.meta.env.VITE_APPNAME_SMALL,
      });

      if (data?.data?.success) {
        setState((_prevState) => ({
          ..._prevState,

          emailErr: false,
          emailErrMsg: data.data?.message,
        }));
        toast.success(data?.data?.message);
      } else {
        setState((_prevState) => ({
          ..._prevState,

          emailErr: true,
          emailErrMsg: data.error?.data?.message,
        }));

        toast.error(data?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isMobile = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    getState({ course_name: import.meta.env.VITE_APPNAME_SMALL });
    localStorage.clear();
  }, []);
  useEffect(() => {
    if (state.stateCode && state.stateCode != 0) {
      console.log(state.stateCode);
      getDistrict({ state_id: state.stateCode, course_name: import.meta.env.VITE_APPNAME_SMALL });
    }
  }, [state.stateCode]);

  useEffect(() => {
    if (error && isError) {
      toast.error(error.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && registerData) {
      if (registerData?.data?.token) {
        localStorage.setItem('candidateRegistrationToken', registerData?.data?.token);
        toast.success(registerData.message);
        navigate();
      }
    }
  }, [isSuccess, registerData]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box>
        <Box>
          <form
            noValidate
            onSubmit={validate}
            autoComplete="off"
            //   {...props}
          >
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} md={5}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Are you applying as foreign national candidate?
                </FormLabel>
                <Typography
                  variant="subtitle2"
                  display={'inline-flex'}
                  sx={{ color: 'error.main' }}
                >
                  *
                </Typography>
              </Grid>

              <Grid item xs={12} md={7}>
                <FormHelperText sx={{ color: 'error.main' }}>
                  {state.isForeignErrMsg}
                </FormHelperText>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="isForeign"
                  value={state.isForeign}
                  onChange={handelChange}
                >
                  <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value={2} control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </Grid>
              {state.isForeign == 1 && (
                <>
                  <Grid item xs={12} md={4}>
                    <TextField
                      helperText={t(state.foreignIdErrMsg)}
                      error={state.foreignIdErr}
                      fullWidth
                      label={
                        <>
                          Registered foreign national Application Id
                          <Typography
                            variant="subtitle2"
                            display={'inline-flex'}
                            sx={{ color: 'error.main' }}
                          >
                            *
                          </Typography>
                        </>
                      }
                      margin="normal"
                      name="foreignId"
                      onChange={handelChange}
                      value={state.foreignId}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <TextField
                      helperText={t(state.dobErrMsg)}
                      error={state.dobErr}
                      fullWidth
                      label={
                        <>
                          Date Of Birth
                          <Typography
                            variant="subtitle2"
                            display={'inline-flex'}
                            sx={{ color: 'error.main' }}
                          >
                            *
                          </Typography>
                        </>
                      }
                      margin="normal"
                      name="dob"
                      onChange={handelChange}
                      value={state.dob}
                      size="small"
                      type="date"
                      focused
                      inputProps={{
                        max: moment().subtract(10, 'years').format('YYYY-MM-DD'),
                      }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={12}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                  <Tooltip
                    title={`If you are applying on the basis of ${import.meta.env.VITE_CET_SCORE} please enter your name as per name in CET (Please check your CET result card first and then fill the details). Other candidates can enter the name as per their HSC certificate.`}
                    placement="top"
                    arrow
                  >
                    <TextField
                      error={state.fullnameErr}
                      fullWidth
                      label={
                        <>
                          Candidate Full Name
                          <Typography
                            variant="subtitle2"
                            display={'inline-flex'}
                            sx={{ color: 'error.main' }}
                          >
                            *
                          </Typography>
                        </>
                      }
                      margin="normal"
                      name="fullname"
                      onChange={handelChange}
                      type="text"
                      value={state.fullname}
                      size="small"
                    />
                  </Tooltip>
                  {/* <Tooltip
                            sx={{ fontSize: isMobile ? ' ' : '' }}
                            title={`If you are applying on the basis of ${import.meta.env.VITE_CET_SCORE} please enter your name as per name in CET (Please check your CET result card first and then fill the details). Other candidates can enter the name as per their HSC certificate.`}
                          >
                            <Iconify
                              icon={'material-symbols:info'}
                              sx={{ color: 'primary.main', mt: 3 }}
                              fontSize="medium"
                            />
                          </Tooltip> */}
                </Box>
                <FormHelperText sx={{ color: 'error.main' }}>{state.fullnameErrMsg}</FormHelperText>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Select Country:
                  <Typography
                    variant="subtitle2"
                    display={'inline-flex'}
                    sx={{ color: 'error.main' }}
                  >
                    *
                  </Typography>
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormHelperText sx={{ color: 'error.main' }}>{state.countryErrMsg}</FormHelperText>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="country"
                  value={state.country}
                  onChange={handelChange}
                >
                  <FormControlLabel value={1} control={<Radio size="small" />} label="India" />
                  <FormControlLabel value={2} control={<Radio size="small" />} label="Other" />
                </RadioGroup>
              </Grid>
              {state.country == 2 && (
                <Grid item xs={12} md={6}>
                  <TextField
                    helperText={state.countryCodeErrMsg}
                    error={state.countryCodeErr}
                    fullWidth
                    label={
                      <>
                        Enter Country Code
                        <Typography
                          variant="subtitle2"
                          display={'inline-flex'}
                          sx={{ color: 'error.main' }}
                        >
                          *
                        </Typography>
                      </>
                    }
                    margin="normal"
                    name="countryCode"
                    onChange={handelChange}
                    type="text"
                    value={state.countryCode}
                    size="small"
                    autoComplete="off"
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                  <Tooltip
                    placement="top"
                    arrow
                    title="All communications will be done on this Email. Make sure this Email Id is authenticated and working."
                  >
                    <TextField
                      helperText={state.emailErrMsg}
                      error={state.emailErr}
                      fullWidth
                      label={
                        <>
                          Email Id
                          <Typography
                            variant="subtitle2"
                            display={'inline-flex'}
                            sx={{ color: 'error.main' }}
                          >
                            *
                          </Typography>
                        </>
                      }
                      margin="normal"
                      name="email"
                      onChange={handelChange}
                      onBlur={checkEmailAddress}
                      type="email"
                      value={state.email}
                      size="small"
                      autoComplete="off"
                    />
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                  <Tooltip
                    placement="top"
                    arrow
                    title="All communications will be done on this number such as registration OTP,login OTP etc. Make sure this mobile number is authenticated and working"
                  >
                    <TextField
                      helperText={t(state.phoneErrMsg)}
                      error={state.phoneErr}
                      fullWidth
                      label={
                        <>
                          Mobile No
                          <Typography
                            variant="subtitle2"
                            display={'inline-flex'}
                            sx={{ color: 'error.main' }}
                          >
                            *
                          </Typography>
                        </>
                      }
                      margin="normal"
                      name="phone"
                      onChange={(e) => {
                        if (e.target.value?.length <= 10) {
                          handelChange(e);
                        }
                      }}
                      onBlur={checkPhoneNumber}
                      type="number"
                      value={state.phone}
                      size="small"
                    />
                  </Tooltip>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                      color: state.stateCodeErr ? 'error.main' : '',
                    }}
                  >
                    <Typography>
                      Select State{' '}
                      <Typography
                        variant="subtitle2"
                        display={'inline-flex'}
                        sx={{ color: 'error.main' }}
                      >
                        *
                      </Typography>
                    </Typography>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={'Select State'}
                    value={state.stateCode}
                    error={state.stateCodeErr}
                    onChange={handelChange}
                    name="stateCode"
                    size="small"
                  >
                    <MenuItem value={0}>
                      <Typography textAlign={'justify'}>Select State</Typography>
                    </MenuItem>

                    {stateData?.data?.map((_state, _index) => {
                      return (
                        <MenuItem value={_state.id} key={_index}>
                          <Typography> {_state.name}</Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {t(state.stateCodeErrMsg)}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                      color: state.districtCodeErr ? 'error.main' : '',
                    }}
                  >
                    {t('Select District')}
                    <Typography
                      variant="subtitle2"
                      display={'inline-flex'}
                      sx={{ color: 'error.main' }}
                    >
                      *
                    </Typography>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={'Select District'}
                    value={state.districtCode}
                    error={state.districtCodeErr}
                    onChange={handelChange}
                    name="districtCode"
                    size="small"
                    fullWidth
                  >
                    <MenuItem value={0}>
                      <Typography textAlign={'justify'}>Select District</Typography>
                    </MenuItem>

                    {districtData?.data?.map((_district, _index) => {
                      return (
                        <MenuItem value={_district.id} key={_index}>
                          <Typography>{_district.dis_name}</Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {state.districtCodeErrMsg}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                  <Tooltip
                    placement="top"
                    arrow
                    title="The password must be between 7 to 15 characters which contain at least one uppercase letter, one lowercase letter, and one number."
                  >
                    <TextField
                      helperText={t(state.passwordErrMsg)}
                      error={state.passwordErr}
                      fullWidth
                      label={
                        <>
                          Password
                          <Typography
                            variant="subtitle2"
                            display={'inline-flex'}
                            sx={{ color: 'error.main' }}
                          >
                            *
                          </Typography>
                        </>
                      }
                      margin="normal"
                      name="password"
                      onChange={handelChange}
                      type="password"
                      value={state.password}
                      size="small"
                      autoComplete="off"
                    />
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip
                  placement="top"
                  arrow
                  title=" The password must be same as previous one that you eantred."
                >
                  <TextField
                    helperText={t(state.confirmPasswordErrMsg)}
                    error={state.confirmPasswordErr}
                    // error={Boolean(formik.touched.password && formik.errors.password)}
                    fullWidth
                    // helperText={formik.touched.password && formik.errors.password}
                    label={
                      <>
                        Confirm Password
                        <Typography
                          variant="subtitle2"
                          display={'inline-flex'}
                          sx={{ color: 'error.main' }}
                        >
                          *
                        </Typography>
                      </>
                    }
                    margin="normal"
                    name="confirmPassword"
                    onChange={handelChange}
                    type="password"
                    value={state.confirmPassword}
                    size="small"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Do you want to receive messages in WhatsApp:
                  <Typography
                    variant="subtitle2"
                    display={'inline-flex'}
                    sx={{ color: 'error.main' }}
                  >
                    *
                  </Typography>
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormHelperText sx={{ color: 'error.main' }}>
                  {state.isWhatsAppErrMsg}
                </FormHelperText>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="isWhatsApp"
                  value={state.isWhatsApp}
                  onChange={handelChange}
                >
                  <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>

            <Box
              sx={{ mt: 2 }}
              display={'flex'}
              justifyContent={'center'}
              // flexDirection={'column'}
            >
              <LoadingButton
                //   disabled={formik.isSubmitting}
                sx={{ alignSelf: 'center', px: 2 }}
                size="medium"
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Register
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
