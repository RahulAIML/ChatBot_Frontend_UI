import React, { useState, useEffect } from 'react';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Select,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'src/components/snackbar';
import { useTranslation } from 'react-i18next';
import { typeDetailForDValidate } from 'src/validation/candidate/typeDetails';
import Title2 from 'src/components/common/title2';
import { Iconify } from 'src/components/iconify';

import {
  useUpdateTypeDetailsDMutation,
  useGetDistrictForTypeDetailsMutation,
  useGetUniversityListMutation,
} from 'src/redux/slices/common/applicationForm/typeDetails';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { NotesCard } from 'src/components/notes/NotesCard';
import { NotesTypography } from 'src/components/notes/NotesTypography';

const Type = ({ data, updateRedux }) => {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [update, { isSuccess, isError, error, isLoading, data: updateSuccess }] =
    useUpdateTypeDetailsDMutation();
  const [getUniversityList, { data: universitiesList }] = useGetUniversityListMutation();
  const [getDistrict, { data: districtData }] = useGetDistrictForTypeDetailsMutation();
  const [state, setState] = useState({
    districtId: 0,
    districtIdErr: false,
    districtIdErrMsg: '',
    motherName: '',
    motherNameErr: false,
    motherNameErrMsg: '',
    domicileType: '',
    domicileTypeErr: false,
    domicileTypeErrMsg: '',
    retired: '',
    retiredErr: false,
    retiredErrMsg: '',
  });

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };

  useEffect(() => {
    if (data) {
      setState({
        districtId: data.maindistrict,
        districtIdErr: false,
        districtIdErrMsg: '',
        motherName: data.mothername ?? '',
        motherNameErr: false,
        motherNameErrMsg: '',
        domicileType: data.domiciletype ?? '',
        domicileTypeErr: false,
        domicileTypeErrMsg: '',
        retired: data.isretired,
        retiredErr: false,
        retiredErrMsg: '',
      });
      getUniversityList({
        district_id: Number(data.maindistrict),
        course_name: import.meta.env.VITE_APPNAME_SMALL,
      });
    }
  }, [data]);
  useEffect(() => {
    getDistrict({ state_id: 21, course_name: import.meta.env.VITE_APPNAME_SMALL });
  }, []);

  const validate = async (_e) => {
    try {
      _e.preventDefault();
      typeDetailForDValidate.parse(state);
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
                [`${field}Msg`]: error.message,
              }));
            }
          });
        toast.error('Please fill all the mandatory fields');
      }
      return;
    }
    update({
      maindistrict: state.districtId,
      mothername: state.domicileType == 'M' ? state.motherName : '',
      domiciletype: state.domicileType,
      isretired: state.retired,
    });
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  console.log(updateSuccess);

  useEffect(() => {
    if (isSuccess && updateSuccess) {
      toast.success(updateSuccess?.message);
      updateRedux();
      // navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/category-details`);
    }
  }, [isSuccess, updateSuccess]);

  return (
    <Box component="main" mt={2}>
      <Title2 title="Your Type of Candidature :" title2=" Maharashtra Candidature Type D" />

      <Box
        sx={{
          // flexGrow: 1,
          mt: 3,
          p: 1.5,
          borderRadius: '10px',
          border: '1px solid #dbd9d9',
        }}
      >
        <form noValidate onSubmit={validate} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" display={'inline-flex'}>
                Whose Proforma B You are uploading at {import.meta.env.VITE_FC_NAME} ?{' '}
                <Typography
                  variant="subtitle2"
                  display={'inline-flex'}
                  sx={{ color: 'error.main' }}
                >
                  *
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormHelperText sx={{ color: 'error.main' }}>
                {state.domicileTypeErrMsg}
              </FormHelperText>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="domicileType"
                value={state.domicileType}
                onChange={handelChange}
              >
                <FormControlLabel value="F" control={<Radio size="small" />} label="Father" />
                <FormControlLabel value="M" control={<Radio size="small" />} label="Mother" />
              </RadioGroup>
            </Grid>
            {state.domicileType == 'M' && (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">
                    {t("Enter Mother's Name")}
                    <Typography
                      variant="subtitle2"
                      display={'inline-flex'}
                      sx={{ color: 'error.main' }}
                    >
                      *
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    helperText={state.motherNameErrMsg}
                    error={state.motherNameErr}
                    fullWidth
                    // label={t('E-Mail ID')}
                    margin="normal"
                    name="motherName"
                    // onBlur={formik.handleBlur}
                    onChange={handelChange}
                    value={state.motherName}
                    size="small"
                    autoComplete="off"
                  />
                </Grid>{' '}
              </>
            )}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">
                {t(
                  'Select the District where Father / Mother of the Candidate is reported back to Maharashtra and posted'
                )}{' '}
                <Typography
                  variant="subtitle2"
                  display={'inline-flex'}
                  sx={{ color: 'error.main' }}
                >
                  *
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: state.districtIdErr ? 'error.main' : '',
                  }}
                >
                  {t('Select District')}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={t('Select District')}
                  value={state.districtId}
                  error={state.districtIdErr}
                  onChange={(e) => {
                    handelChange(e);
                    getUniversityList({
                      district_id: e.target.value,
                      course_name: import.meta.env.VITE_APPNAME_SMALL,
                    });
                  }}
                  name="districtId"
                  size="small"
                >
                  <MenuItem value={0}>
                    <em>Select District</em>
                  </MenuItem>

                  {districtData?.data?.map((_district, _index) => {
                    return (
                      <MenuItem value={_district.id} key={_index}>
                        {_district.dis_name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText sx={{ color: 'error.main' }}>
                  {state.districtIdErrMsg}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">
                {t(
                  'Please select your Father or Mother is retired employee of the Government of Maharashtra or Government of Maharashtra Undertaking.'
                )}{' '}
                <Typography
                  variant="subtitle2"
                  display={'inline-flex'}
                  sx={{ color: 'error.main' }}
                >
                  *
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormHelperText sx={{ color: 'error.main' }}>{state.retiredErrMsg}</FormHelperText>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="retired"
                value={state.retired}
                onChange={handelChange}
              >
                <FormControlLabel value="Y" control={<Radio size="small" />} label="Yes" />
                <FormControlLabel value="N" control={<Radio size="small" />} label="No" />
              </RadioGroup>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                Your Home University is
                <Typography
                  variant="subtitle2"
                  display={'inline-flex'}
                  sx={{ color: 'error.main' }}
                >
                  *
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                {universitiesList?.data?.name}
              </Typography>
            </Grid>
            {state.retired == 'Y' && (
              <Grid item xs={12}>
                <NotesCard>
                  <NotesTypography variant="h6" mt={1} sx={{ textDecoration: 'underline' }}>
                    Notes:-
                  </NotesTypography>
                  <Box display={'flex'}>
                    <NotesTypography component={'span'}>
                      <Iconify icon={'weui:arrow-filled'} />{' '}
                    </NotesTypography>
                    <NotesTypography>
                      You are required to scan and upload following document at the time of
                      verification at Scrutiny Center.
                    </NotesTypography>
                  </Box>

                  <Box display={'flex'}>
                    <NotesTypography component={'span'}>
                      <Iconify icon={'weui:arrow-filled'} />{' '}
                    </NotesTypography>
                    <NotesTypography>
                      Proforma B-2 for whose Father or Mother is retired employee of the Government
                      of Maharashtra or Government of Maharashtra Undertaking.
                    </NotesTypography>
                  </Box>
                </NotesCard>
              </Grid>
            )}
          </Grid>

          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={6} md={6} display={'flex'} justifyContent={'flex-end'}>
              <LoadingButton
                //   disabled={formik.isSubmitting}
                fullWidth
                size="medium"
                sx={{ maxWidth: '160px' }}
                type="submit"
                variant="contained"
                // loading={isLoading}
              >
                {t('Save and Proceed')}
              </LoadingButton>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                type="button"
                variant="contained"
                sx={{ maxWidth: '150px' }}
                color="error"
                fullWidth
                size="medium"
                onClick={() => {
                  router.push(paths.candidate.candidatureType);
                }}
              >
                {t('Back')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Type;
