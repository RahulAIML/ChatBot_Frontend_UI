import React, { useState, useEffect } from 'react';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';
import {
  Box,
  Grid,
  Typography,
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Select,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'src/components/snackbar';
import { useTranslation } from 'react-i18next';
import { typeDetailForEValidate } from 'src/validation/candidate/typeDetails';
import { NotesCard } from 'src/components/notes/NotesCard';
import { NotesTypography } from 'src/components/notes/NotesTypography';

import Title2 from 'src/components/common/title2';

import {
  useUpdateTypeDetailsEMutation,
  // useGetTalukaForTypeDetailsMutation,
} from 'src/redux/slices/common/applicationForm/typeDetails';

import { useGetDistrictForEMutation } from 'src/redux/slices/common/other';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
const Type = ({ data, updateRedux }) => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const navigate = useNavigate();
  const [update, { isSuccess, isError, error, isLoading, data: updateSuccess }] =
    useUpdateTypeDetailsEMutation();
  const [getDistrict, { data: districtData }] = useGetDistrictForEMutation();
  // const [getTaluka, { data: talukaData }] = useGetTalukaForTypeDetailsMutation();

  const [state, setState] = useState({
    dipdegDistrict: 0,
    dipdegDistrictErr: false,
    dipdegDistrictErrMsg: '',
    hscdistrict: 0,
    hscdistrictErr: false,
    hscdistrictErrMsg: '',
    language_id: 8,
    language_idErr: false,
    language_idErrMsg: '',
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
        dipdegDistrict: data.dipdegdistrict,
        dipdegDistrictErr: false,
        dipdegDistrictErrMsg: '',
        hscdistrict: data.hscdistrict ?? 0,
        hscdistrictErr: false,
        hscdistrictErrMsg: '',
        language_id: data.language_id ?? 0,
        language_idErr: false,
        language_idErrMsg: '',
      });
    }
  }, [data]);
  useEffect(() => {
    getDistrict({ course_name: import.meta.env.VITE_APPNAME_SMALL, state_id: 21 });
  }, []);

  const validate = async (_e) => {
    try {
      _e.preventDefault();
      typeDetailForEValidate.parse(state);
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
      dipdegdistrict: state.dipdegDistrict,
      hscdistrict: state.hscdistrict,
      language_id: state.language_id,
    });
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && updateSuccess) {
      toast.success(updateSuccess?.message);
      updateRedux();
      // navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/category-details`);
    }
  }, [isSuccess, updateSuccess]);

  return (
    <Box component="main" mt={2}>
      <Title2 title="Your Type of Candidature :" title2=" Maharashtra Candidature Type E" />

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
              <Typography variant="subtitle2">
                Candidates passing HSC or passing diploma in Engineering or Technology or Pharmacy
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
                    color: state.dipdegDistrictErr ? 'error.main' : '',
                  }}
                >
                  {t('Select District')}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={t('Select District')}
                  value={state.dipdegDistrict}
                  error={state.dipdegDistrictErr}
                  onChange={(e) => {
                    handelChange(e);
                    //  getTaluka({ districtId: e.target.value?.toString() });
                  }}
                  name="dipdegDistrict"
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
                  {state.dipdegDistrictErrMsg}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">
                Select the District of Qualifying Examination form a recognized institution in
                Maharashtra State or recognized institution located in a disputed Maharashtra
                Karnataka Border area
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
                    color: state.hscdistrictErr ? 'error.main' : '',
                  }}
                >
                  {t('Select District')}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={t('Select District')}
                  value={state.hscdistrict}
                  error={state.hscdistrictErr}
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  name="hscdistrict"
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
                  {state.hscdistrictErrMsg}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">
                Mother Tounge{' '}
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
                    color: state.hscdistrictErr ? 'error.main' : '',
                  }}
                >
                  Select Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={t('Select District')}
                  value={state.language_id}
                  error={state.language_idErr}
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  name="language_id"
                  size="small"
                >
                  <MenuItem value={8}>Marathi</MenuItem>
                </Select>
                <FormHelperText sx={{ color: 'error.main' }}>
                  {state.language_idErrMsg}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                Your Home University is{' '}
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
                Other Than Home University
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={6} md={6} display={'flex'} justifyContent={'flex-end'}>
              <LoadingButton
                //   disabled={formik.isSubmitting}
                fullWidth
                size="medium"
                type="submit"
                sx={{ maxWidth: '160px' }}
                variant="contained"
                loading={isLoading}
              >
                {t('Save and Proceed')}
              </LoadingButton>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                type="button"
                variant="contained"
                color="error"
                sx={{ maxWidth: '150px' }}
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
        <NotesCard>
          <NotesTypography>Notes:-</NotesTypography>
          <Box display={'flex'}>
            <NotesTypography component={'span'} flexDirection="column">
              <Iconify icon={'weui:arrow-filled'} />{' '}
            </NotesTypography>
            <NotesTypography>
              You are required to scan and upload the documents given below as your type of
              candidature is E.
            </NotesTypography>
          </Box>
          <Box display={'flex'}>
            <NotesTypography component={'span'} flexDirection="column">
              <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />{' '}
            </NotesTypography>
            <NotesTypography>
              Certificate stating that Candidate belongs to the disputed border area in Proforma -
              G1
            </NotesTypography>
          </Box>
          <Box display={'flex'}>
            <NotesTypography component={'span'} flexDirection="column">
              <Iconify icon={'weui:arrow-filled'} />{' '}
            </NotesTypography>
            <NotesTypography>
              Certificate stating that the mother tongue of the Candidate is Marathi in Proforma -
              G2
            </NotesTypography>
          </Box>
        </NotesCard>
      </Box>
    </Box>
  );
};

export default Type;
