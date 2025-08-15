import React, { useState, useEffect } from 'react';
import { ZodError } from 'zod';
import {
  Box,
  Card,
  Grid,
  Typography,
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Select,
  Radio,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Iconify } from 'src/components/iconify';
import { toast } from 'src/components/snackbar';
import { useTranslation } from 'react-i18next';
import { typeDetailForAValidate } from 'src/validation/candidate/typeDetails';
import Title2 from '../common/title2';
import { NotesCard } from 'src/components/notes/NotesCard';
import { NotesTypography } from 'src/components/notes/NotesTypography';

import {
  useUpdateTypeDetailsAMutation,
  useGetDistrictForTypeDetailsMutation,
  useGetUniversityListMutation,
} from 'src/redux/slices/common/applicationForm/typeDetails';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const Type = ({ data, updateRedux }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [update, { isSuccess, isError, error, isLoading, data: updateSuccess }] =
    useUpdateTypeDetailsAMutation();
  const [getDistrict, { data: districtData }] = useGetDistrictForTypeDetailsMutation();

  const [getUniversityList, { data: universitiesList }] = useGetUniversityListMutation();

  const [state, setState] = useState({
    hscdistrict: 0,
    hscdistrictErr: false,
    hscdistrictErrMsg: '',
    dipdegdistrict: 0,
    dipdegdistrictErr: false,
    dipdegdistrictErrMsg: '',
    document: '',
    documentErr: false,
    documentErrMsg: '',
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
        hscdistrict: data?.hscdistrict ?? 0,
        hscdistrictErr: false,
        hscdistrictErrMsg: ' ',
        dipdegdistrict: data?.dipdegdistrict ?? 0,
        dipdegdistrictErr: false,
        dipdegdistrictErrMsg: '',
        document: data?.type_a_doc > 0 ? data?.type_a_doc?.toString() : '',
        documentErr: false,
        documentErrMsg: '',
      });
      getUniversityList({
        district_id: Number(data.dipdegdistrict),
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
      typeDetailForAValidate.parse(state);
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
      hscdistrict: state.hscdistrict,
      dipdegdistrict: state.dipdegdistrict,
      type_a_doc: Number(state.document),
    });
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message || error?.data?.error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && updateSuccess) {
      toast.success(updateSuccess?.message);
      updateRedux();
    }
  }, [isSuccess, updateSuccess]);

  return (
    <Box component="main" mt={2}>
      <Title2 title="Your Type of Candidature :" title2=" Maharashtra State Candidature Type A" />

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
                Select the District from which Candidates passing HSC or passing diploma in
                Engineering or Technology or Pharmacy{' '}
                <Typography
                  variant="subtitle2"
                  display={'inline-flex'}
                  sx={{ color: 'error.main' }}
                >
                  *
                </Typography>
              </Typography>
            </Grid>{' '}
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
                  onChange={handelChange}
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
              <Typography variant="subtitle2" display={'inline-flex'}>
                Select District from which Candidate has Passed / Appearing for Graduation
              </Typography>
              <Typography variant="subtitle2" display={'inline-flex'} sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Grid>{' '}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: state.dipdegdistrictErr ? 'error.main' : '',
                  }}
                >
                  {t('Select District')}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={t('Select District')}
                  value={state.dipdegdistrict}
                  error={state.dipdegdistrictErr}
                  onChange={(e) => {
                    handelChange(e);
                    getUniversityList({
                      district_id: e.target.value,
                      course_name: import.meta.env.VITE_APPNAME_SMALL,
                    });
                  }}
                  name="dipdegdistrict"
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
                  {state.dipdegdistrictErrMsg}
                </FormHelperText>
              </FormControl>
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
          </Grid>

          <Box
            sx={{
              mt: 2,
              // border: '1px solid #dbd9d9',
              pl: 1,
              borderRadius: '10px',
              pr: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <NotesCard>
                  <NotesTypography>Notes:-</NotesTypography>
                  <Box display={'flex'}>
                    <NotesTypography component={'span'}>
                      <Iconify icon={'weui:arrow-filled'} />{' '}
                    </NotesTypography>
                    <NotesTypography>
                      As your Candidature is Type A you are required to scan and upload any one of
                      the document given below.
                    </NotesTypography>
                  </Box>
                </NotesCard>
                <FormHelperText sx={{ color: 'error.main' }}>{state.documentErrMsg}</FormHelperText>
              </Grid>

              <Grid
                item
                xs={10}
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} /> &nbsp;
                &nbsp;
                <Typography variant="subtitle2">
                  Domicile Certificate of Candidate indicating that he/she is Domiciled in the State
                  of Maharashtra issued by Sub Divisional officer / Dy. Collector of District.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Radio
                  checked={state.document == 13}
                  onChange={handelChange}
                  value={13}
                  name="document"
                  size="small"
                />
              </Grid>

              <Grid
                item
                xs={10}
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                &nbsp; &nbsp;
                <Typography variant="subtitle2">
                  Birth Certificate of the Candidate indicating the place of birth in Maharashtra.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Radio
                  checked={state.document == 26}
                  onChange={handelChange}
                  value={26}
                  name="document"
                  size="small"
                />
              </Grid>

              <Grid
                item
                xs={10}
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                &nbsp; &nbsp;
                <Typography variant="subtitle2">
                  The School Leaving Certificate indicating the place of birth In Maharashtra.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Radio
                  checked={state.document == 27}
                  onChange={handelChange}
                  value={27}
                  name="document"
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={6} md={6} display={'flex'} justifyContent={'flex-end'}>
              <LoadingButton
                //   disabled={formik.isSubmitting}
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                sx={{ maxWidth: '160px' }}
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
                fullWidth
                size="medium"
                sx={{ maxWidth: '150px' }}
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
