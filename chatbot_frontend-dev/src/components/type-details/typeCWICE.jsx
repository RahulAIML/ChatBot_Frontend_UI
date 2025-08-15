import React, { useState, useEffect } from 'react';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'src/components/snackbar';
import { useTranslation } from 'react-i18next';
import { useGetDistrictMutation, useGetStateMutation } from 'src/redux/slices/common/other';
import Title2 from 'src/components/common/title2';

import { useUpdateTypeDetailsForeignMutation } from 'src/redux/slices/common/applicationForm/typeDetails';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
const Type = ({ data, updateRedux }) => {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [update, { isSuccess, isError, error, isLoading, data: updateSuccess }] =
    useUpdateTypeDetailsForeignMutation();

  const [
    getState,
    {
      isLoading: isgetStateLoading,
      isError: isGetStateError,
      isSuccess: isGetStateSuccess,
      data: stateData,
    },
  ] = useGetStateMutation();
  const [
    getDistrict,
    {
      isLoading: isgetDistrictLoading,
      isError: isGetDistrictError,
      isSuccess: isGetDistrictSuccess,
      data: districtData,
    },
  ] = useGetDistrictMutation();
  const [state, setState] = useState({
    dipdegDistrict: 0,
    dipdegDistrictErr: false,
    dipdegDistrictErrMsg: '',
    diplomaDeginst_oms: '',
    diplomaDeginst_omsErr: false,
    diplomaDeginst_omsErrMsg: '',
    mainDistrict: 0,
    mainDistrictErr: false,
    mainDistrictErrMsg: '',
  });

  const handelChange = (_event) => {
    if (_event.target.name === 'mainDistrict') {
      setState((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.value,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: '',

        dipdegDistrict: 0,
        dipdegDistrictErr: false,
        dipdegDistrictErrMsg: '',
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

  useEffect(() => {
    getState();
  }, []);
  useEffect(() => {
    if (state.mainDistrict && state.mainDistrict != 0) {
      getDistrict({
        state_id: state.mainDistrict,
        course_name: import.meta.env.VITE_APPNAME_SMALL,
      });
    }
  }, [state.mainDistrict]);

  useEffect(() => {
    if (data) {
      console.log(data, 'data');
      setState({
        dipdegDistrict: data.dipdegdistrict,
        dipdegDistrictErr: false,
        dipdegDistrictErrMsg: '',
        diplomaDeginst_oms: data.diplomadeginst_oms,
        diplomaDeginst_omsErr: false,
        diplomaDeginst_omsErrMsg: '',
        mainDistrict: data.maindistrict,
        mainDistrictErr: false,
        mainDistrictErrMsg: '',
      });
    }
  }, [data]);

  const validate = async (_e) => {
    try {
      _e.preventDefault();
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
    update({ type: 13 });
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
      <Title2
        title="Your Type of Candidature :"
        title2="Children of Indian Workers in Gulf Countries(CIWGC)"
      />

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
          <Grid container spacing={2}></Grid>

          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={6} md={6} display={'flex'} justifyContent={'flex-end'}>
              <LoadingButton
                //   disabled={formik.isSubmitting}
                fullWidth
                size="medium"
                sx={{ maxWidth: '160px' }}
                type="submit"
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
