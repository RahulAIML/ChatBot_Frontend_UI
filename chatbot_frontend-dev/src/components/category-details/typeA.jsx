import React, { useState, useEffect } from 'react';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
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
import { useDispatch } from 'react-redux';
import { updateFillStatus } from 'src/redux/slices/features-slice/user';
import { useTranslation } from 'react-i18next';
import { categoryDetailForBValidate } from 'src/validation/candidate/categoryDetails';
import AlertDialogSlide from 'src/components/common/confirmDialog';
import moment from 'moment';
import {
  useGetCategoryMutation,
  useGetSubCategoryMutation,
  useGetPhysicalDisaMutation,
  useGetDefenceStatusMutation,
  useGetCvcAuthorityMutation,
} from 'src/redux/slices/common/other';
import { useGetCandidateDetailsMutation } from 'src/redux/slices/common/applicationForm/basicDetails';
import { Iconify } from 'src/components/iconify';
import { useUpdateCategoryDetailsMutation } from 'src/redux/slices/common/applicationForm/categoryDetails';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useParams } from 'react-router';
import { NotesCard } from 'src/components/notes/NotesCard';
import { NotesTypography } from 'src/components/notes/NotesTypography';

const Type = ({ data }) => {
  const { i18n, t } = useTranslation();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const navigate = useNavigate();
  const [refreshAuth] = useGetCandidateDetailsMutation();
  const [openModal, setopenModal] = useState({ open: false, data: '' });
  const [update, { isSuccess, isError, error, isLoading, data: updateSuccess }] =
    useUpdateCategoryDetailsMutation();
  const [getPhysicalDisa, { data: physicalDisaList }] = useGetPhysicalDisaMutation();
  const [getCategory, { data: categoryList }] = useGetCategoryMutation();
  const [getSubCategory, { data: subCategoryList }] = useGetSubCategoryMutation();
  const [getDefence, { data: defenceList }] = useGetDefenceStatusMutation();
  const [getCvcAuthority, { data: cvcAuthority }] = useGetCvcAuthorityMutation();
  const [state, setState] = useState({
    category: '',
    categoryErr: false,
    categoryErrMsg: '',
    categoryName: '',
    categoryNameErr: false,
    categoryNameErrMsg: '',
    ewsStatus: '',
    ewsStatusErr: false,
    ewsStatusErrMsg: '',
    subCategory: '',
    subCategoryErr: false,
    subCategoryErrMsg: '',
    ph_category: '',
    ph_categoryErr: false,
    ph_categoryErrMsg: '',
    physicalDisabilityId: '',
    physicalDisabilityIdErr: false,
    physicalDisabilityIdErrMsg: '',
    df_category: '',
    df_categoryErr: false,
    df_categoryErrMsg: '',
    defenceId: '',
    defenceIdErr: false,
    defenceIdErrMsg: '',
    isNclAvailable: '',
    isNclAvailableErr: false,
    isNclAvailableErrMsg: '',
    nationalitydoc: '',
    nationalitydocErr: false,
    nationalitydocErrMsg: '',
    selectedTypeId: '',
    isEwsAvailable: '',
    isEwsAvailableErr: false,
    isEwsAvailableErrMsg: '',
    caste_cartificate_status: '',
    caste_cartificate_statusErr: false,
    caste_cartificate_statusErrMsg: '',
    caste_tribe_cartificate_status: '',
    caste_tribe_cartificate_statusErr: false,
    caste_tribe_cartificate_statusErrMsg: '',
    casteCerIss: '',
    casteCerIssErr: false,
    casteCerIssErrMsg: '',
    cvcApplicationNo: '',
    cvcApplicationNoErr: false,
    cvcApplicationNoErrMsg: '',
    authName: '',
    authNameErr: false,
    authNameErrMsg: '',
    dateOfApplication: '',
    dateOfApplicationErr: false,
    dateOfApplicationErrMsg: '',
    candidateName: '',
    candidateNameErr: false,
    candidateNameErrMsg: '',
    casteCerNo: '',
    casteCerNoErr: false,
    casteCerNoErrMsg: '',

    df_category: '',
    df_categoryErr: false,
    df_categoryErrMsg: '',
    defenceId: '',
    defenceIdErr: false,
    defenceIdErrMsg: '',
  });

  const handelOpenModal = (data) => {
    setopenModal({ open: true, data: data ?? '' });
  };
  const handelCloseModal = (data) => {
    setopenModal({ open: false, data: '' });
  };

  const handelChange = (_event) => {
    console.log(_event.target.value);
    if (_event.target.name == 'categoryName') {
      setState((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.value,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: '',
        category: '1',
        categoryErr: false,
        categoryErrMsg: '',
      }));
    } else if (_event.target.name == 'category') {
      setState((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.value,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: '',
        subCategory: '',
        subCategoryErr: false,
        subCategoryErrMsg: '',
      }));
    } else if (_event.target.name == 'ph_category' && _event.target.value == '1') {
      setState((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.value,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: '',
        physicalDisabilityId: '',
        physicalDisabilityIdErr: false,
        physicalDisabilityIdErrMsg: '',
      }));
    } else if (_event.target.name == 'df_category' && _event.target.value == '1') {
      setState((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.value,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: '',
        defenceId: '',
        defenceIdErr: false,
        defenceIdErrMsg: '',
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
    if (data) {
      setState({
        category: data?.category_id != 0 ? data?.category_id?.toString() : '',
        categoryErr: false,
        categoryErrMsg: '',
        categoryName: data?.category_id == 0 ? '' : data?.category_id == 1 ? '1' : '2',
        categoryNameErr: false,
        categoryNameErrMsg: '',
        subCategory: data?.subcategory_id != 0 ? data?.subcategory_id?.toString() : '',
        subCategoryErr: false,
        subCategoryErrMsg: '',
        ph_category:
          data?.physicaldisability_id == 0 ? '' : data?.physicaldisability_id == 5 ? '2' : '1',
        ph_categoryErr: false,
        ph_categoryErrMsg: '',
        physicalDisabilityId: data?.physicaldisability_id?.toString(),
        physicalDisabilityIdErr: false,
        physicalDisabilityIdErrMsg: '',
        df_category: data?.defence_id == 0 ? '' : data?.defence_id == 4 ? '2' : '1',
        df_categoryErr: false,
        df_categoryErrMsg: '',
        // defenceId: data?.defence_id == 0 ? '2' : '1',
        defenceId: data?.defence_id?.toString(),
        defenceIdErr: false,
        defenceIdErrMsg: '',
        isNclAvailable: data?.ncl_cartificate_status?.toString(),
        isNclAvailableErr: false,
        isNclAvailableErrMsg: '',
        nationalitydoc: Number(data?.nationalitydoc) > 0 ? data?.nationalitydoc?.toString() : '',
        nationalitydocErr: false,
        nationalitydocErrMsg: '',
        selectedTypeId: data?.mastercandidatetype_id,
        ewsStatus: data?.ews != 0 ? data?.ews?.toString() : '',
        isEwsAvailable: data?.ews_cartificate_status
          ? data?.ews_cartificate_status?.toString()
          : '',
        caste_cartificate_status: data?.caste_cartificate_status
          ? data?.caste_cartificate_status?.toString()
          : '',
        caste_tribe_cartificate_status: data?.caste_tribe_cartificate_status
          ? data?.caste_tribe_cartificate_status?.toString()
          : '',
        casteCerIss: data?.caste_certificate_issue,
        casteCerIssErr: false,
        casteCerIssErrMsg: '',
        cvcApplicationNo: data?.getCvcData?.application_number,
        cvcApplicationNoErr: false,
        cvcApplicationNoErrMsg: '',
        authName: data?.getCvcData?.auth_name,
        authNameErr: false,
        authNameErrMsg: '',
        dateOfApplication: data?.getCvcData?.date_of_application?.split(' ')[0],
        dateOfApplicationErr: false,
        dateOfApplicationErrMsg: '',
        candidateName: data?.getCvcData?.cand_name,
        candidateNameErr: false,
        candidateNameErrMsg: '',
        casteCerNo: data?.getCvcData?.cast_cert_number,
        casteCerNoErr: false,
        casteCerNoErrMsg: '',
      });
    }
  }, [data]);
  useEffect(() => {
    getCategory({ course_name: import.meta.env.VITE_APPNAME_SMALL });
    getPhysicalDisa({ course_name: import.meta.env.VITE_APPNAME_SMALL });
    getDefence({ course_name: import.meta.env.VITE_APPNAME_SMALL });
    getCvcAuthority({ course_name: import.meta.env.VITE_APPNAME_SMALL });
  }, []);

  const openCategoryFiled = (category) => {
    if (category > 3) {
      return true;
    } else {
      return false;
    }
  };

  const openNcl = (category) => {
    if (category >= 4) {
      return true;
    } else {
      return false;
    }
  };

  const openPhysicalDisa = (id) => {
    if (id != 1) {
      return true;
    } else {
      return false;
    }
  };

  const validate = async (_e) => {
    try {
      _e.preventDefault();

      categoryDetailForBValidate.parse(state);
    } catch (error) {
      console.log(error);
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

    handelOpenModal('Press Confirm, If You are sure data provided by you is Correct ');
  };

  const handelFinalSubmit = async () => {
    update({
      category_id: Number(state.categoryName) == 2 ? Number(state.category) : 1,

      categoryName: Number(state.categoryName),

      subcategory_id: Number(state.categoryName) == 2 ? Number(state.subCategory) : 0,

      ph_category: Number(state.ph_category),

      physicaldisability_id: Number(state.physicalDisabilityId),

      df_category: Number(state.df_category),
      defence_id: Number(state.defenceId),

      nationalitydoc: Number(state.nationalitydoc) ? Number(state.nationalitydoc) : 0,

      ncl_cartificate_status:
        state.isNclAvailable == '' || Number(state.category) < 4 ? '' : state.isNclAvailable,

      caste_cartificate_status:
        Number(state.subCategory) > 0 && Number(state.categoryName) == 2
          ? Number(state.caste_tribe_cartificate_status)
          : 0,

      caste_tribe_cartificate_status:
        Number(state.subCategory) > 0 && Number(state.categoryName) == 2
          ? Number(state.caste_tribe_cartificate_status)
          : 0,

      ews: Number(state.categoryName) <= 1 ? Number(state.ewsStatus) : 0,

      ews_cartificate_status:
        Number(state.categoryName) <= 1 && Number(state.ewsStatus) == 1
          ? Number(state.isEwsAvailable)
          : 0,

      caste_certificate_issue: Number(state.categoryName) == 2 ? state?.casteCerIss : '',

      application_number:
        Number(state.caste_tribe_cartificate_status) == 2 && Number(state.categoryName) == 2
          ? state?.cvcApplicationNo
          : '',

      auth_name:
        Number(state.caste_tribe_cartificate_status) == 2 && Number(state.categoryName) == 2
          ? state?.authName
          : '',

      date_of_application:
        Number(state.caste_tribe_cartificate_status) == 2 && Number(state.categoryName) == 2
          ? state?.dateOfApplication
          : '',

      cand_name:
        Number(state.caste_tribe_cartificate_status) == 2 && Number(state.categoryName) == 2
          ? state?.candidateName
          : '',

      cast_cert_number:
        Number(state.caste_tribe_cartificate_status) == 2 && Number(state.categoryName) == 2
          ? state?.casteCerNo
          : '',
      ...(userId && {
        candidate_user_id: userId,
      }),
    });
  };

  useEffect(() => {
    if (state.category && state.category != 1) {
      getSubCategory({
        category_id: state.category,
        course_name: import.meta.env.VITE_APPNAME_SMALL,
      });
    }
  }, [state.category]);

  useEffect(() => {
    if (isSuccess && updateSuccess) {
      toast.success(updateSuccess?.message);

      updateRedux();
    }
  }, [isSuccess, updateSuccess]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.error || error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (state.ph_category == 2) {
      setState((_prevState) => ({
        ..._prevState,
        physicalDisabilityId: '5',
        physicalDisabilityIdErr: false,
        physicalDisabilityIdErrMsg: '',
      }));
    }
    // else {
    // 	setState((_prevState) => ({
    // 		..._prevState,
    // 		physicalDisabilityId: '',
    // 		physicalDisabilityIdErr: false,
    // 		physicalDisabilityIdErrMsg: '',
    // 	}));
    // }
  }, [state.ph_category]);

  useEffect(() => {
    if (state.df_category == 2) {
      setState((_prevState) => ({
        ..._prevState,
        defenceId: '4',
        defenceIdErr: false,
        defenceIdErrMsg: '',
      }));
    }
    // else {
    // 	setState((_prevState) => ({
    // 		..._prevState,
    // 		defenceId: '',
    // 		defenceIdErr: false,
    // 		defenceIdErrMsg: '',
    // 	}));
    // }
  }, [state.df_category]);

  async function updateRedux() {
    try {
      const refreshData = await refreshAuth({ candidate_user_id: userId ?? '' }).unwrap();
      if (refreshData) {
        dispatch(updateFillStatus(refreshData?.data?.fill_status));
        handelCloseModal();
        router.saveNextNavigation(
          paths.candidate.qualificationsDetails,
          paths.fc.qualificationsDetails(userId),
          userId
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component="main" mt={2}>
      {/* <Title2 title='Your Type of Candidature :' title2='' /> */}

      <Box
        sx={{
          // flexGrow: 1,
          mt: 3,
        }}
      >
        <form noValidate onSubmit={validate} autoComplete="off">
          <Box
            sx={{
              p: 1.5,
              borderRadius: '10px',
              border: '1px solid #dbd9d9',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  Category Details / प्रवर्ग तपशील
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">
                  Do you belong to General/Reserved Category / सर्वसाधारण / आरक्षित प्रवर्ग निवडा{' '}
                  {/* <Typography
										variant='subtitle2'
										display={'inline-flex'}
										sx={{ color: 'error.main' }}
									>
										*
									</Typography> */}
                  :
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormHelperText sx={{ color: 'error.main' }}>
                  {state.categoryNameErrMsg}
                </FormHelperText>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="categoryName"
                  value={state.categoryName}
                  onChange={handelChange}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio size="small" />}
                    label="General/सर्वसाधारण"
                  />

                  <FormControlLabel
                    value={2}
                    control={<Radio size="small" />}
                    label="Reserved/आरक्षित"
                    disabled={data?.mastercandidatetype_id > 4}
                  />
                </RadioGroup>
              </Grid>

              {state?.categoryName == '1' &&
                (data?.mastercandidatetype_id == 1 ||
                  data?.mastercandidatetype_id == 2 ||
                  data?.mastercandidatetype_id == 3 ||
                  data?.mastercandidatetype_id == 4 ||
                  data?.mastercandidatetype_id == 6) && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2">
                        Do you belong to Economically Weaker Section (EWS) आपण ईडब्लूस(आर्थिकदृष्टया
                        दुर्बल घटक) जागांसाठी अर्ज करू इच्छिता?
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
                        {state.ewsStatusErrMsg}
                      </FormHelperText>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="ewsStatus"
                        value={state.ewsStatus}
                        onChange={handelChange}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio size="small" />}
                          label="Yes/हो"
                        />

                        <FormControlLabel
                          value={2}
                          control={<Radio size="small" />}
                          label="No/नाही"
                          // disabled={
                          // 	data?.mastercandidatetype_id == 5 ||
                          // 	data?.mastercandidatetype_id == 6
                          // }
                        />
                      </RadioGroup>
                    </Grid>
                  </>
                )}

              {state?.categoryName && state?.categoryName == '2' && (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                      Select the Reserved Category to which you belong / आपल्या जातीचे नाव निवडा
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          color: state.categoryErr ? 'error.main' : '',
                        }}
                      >
                        Select Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Category"
                        value={state.category}
                        error={state.categoryErr}
                        onChange={handelChange}
                        name="category"
                        size="small"
                        placeholder="Select Category"
                      >
                        <MenuItem value={'1'}>
                          <em>Select Category</em>
                        </MenuItem>

                        {categoryList?.data?.map((_district, _index) => {
                          return (
                            <MenuItem value={_district.id.toString()} key={_index}>
                              {_district.cat_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {state.categoryErrMsg}
                      </FormHelperText>
                    </FormControl>
                    {state.category == 10 && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        SEBC Candidates reservation policy will be subject to the decision of
                        Hon’ble High Court in related Writ Petitions.
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                      Select the Caste to which you belong / आपल्या उपजातीचे नाव निवडा
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          color: state.subCategoryErr ? 'error.main' : '',
                        }}
                      >
                        Select Sub Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Sub  Category"
                        value={state.subCategory}
                        error={state.subCategoryErr}
                        onChange={handelChange}
                        name="subCategory"
                        size="small"
                      >
                        <MenuItem>
                          <em>Select Sub Category</em>
                        </MenuItem>

                        {subCategoryList?.data?.map((_e, _index) => {
                          return (
                            <MenuItem value={_e.id.toString()} key={_index}>
                              {_e.name} [{_e.serialno}]
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {state.subCategoryErrMsg}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  {state.subCategory && (
                    <>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2">
                          Select Status of Caste / Tribe Validity Certificate
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{
                              color: state.caste_tribe_cartificate_statusErr ? 'error.main' : '',
                            }}
                          >
                            Select Status
                          </InputLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Category"
                            value={state.caste_tribe_cartificate_status}
                            error={state.caste_tribe_cartificate_statusErr}
                            onChange={handelChange}
                            name="caste_tribe_cartificate_status"
                            size="small"
                          >
                            <MenuItem value={'0'}>Select Status</MenuItem>
                            <MenuItem value={'1'}>Available</MenuItem>
                            {state.category == 10 || state.category == 8 ? (
                              <MenuItem value={'2'}>Applied But Not Received</MenuItem>
                            ) : null}
                            {/* {data?.late_confirm == 0 && (
                              <MenuItem value={"2"}>
                                Applied But Not Received
                              </MenuItem>
                            )} */}
                            {data?.late_confirm == 0 && (
                              <MenuItem value={'3'}>Not Available</MenuItem>
                            )}
                          </Select>
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {state.caste_tribe_cartificate_statusErrMsg}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                      Issuing Authority for Caste Certificate:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          color: state.casteCerIssErr ? 'error.main' : '',
                        }}
                      >
                        Select Authority
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Category"
                        value={state.casteCerIss}
                        error={state.casteCerIssErr}
                        onChange={handelChange}
                        name="casteCerIss"
                        size="small"
                      >
                        <MenuItem value={'Dy. Collector'}>Dy. Collector</MenuItem>
                        <MenuItem value={'Land Acquisition Officer'}>
                          {' '}
                          Land Acquisition Officer{' '}
                        </MenuItem>
                        <MenuItem value={'Sub-Divisional Officer'}>Sub-Divisional Officer</MenuItem>

                        <MenuItem value={'Tahasildar'}>Tahasildar</MenuItem>
                      </Select>
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {state.casteCerIssErrMsg}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </>
              )}

              {state?.categoryName == '2' && state?.category && openNcl(state?.category) && (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                      Select Status of Non-Creamy Layer Certificate / नॉन क्रेमलियेर प्रमाणपत्राची
                      स्थिती निवडा
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          color: state.isNclAvailableErr ? 'error.main' : '',
                        }}
                      >
                        Select Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Category"
                        value={state.isNclAvailable}
                        error={state.isNclAvailableErr}
                        onChange={handelChange}
                        name="isNclAvailable"
                        size="small"
                      >
                        <MenuItem value={''}>
                          <em>Select Status</em>
                        </MenuItem>

                        <MenuItem value="Available">Available</MenuItem>
                        {data?.late_confirm == 0 && (
                          <MenuItem value="Applied But Not Received">
                            Applied But Not Received
                          </MenuItem>
                        )}

                        {data?.late_confirm == 0 && (
                          <MenuItem value="Not Available">Not Available</MenuItem>
                        )}
                      </Select>
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {state.isNclAvailableErrMsg}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          {console.log(data?.mastercandidatetype_id)}
          {state?.ewsStatus == 1 &&
            state?.categoryName == '1' &&
            (data?.mastercandidatetype_id < 4 || data?.mastercandidatetype_id == 6) && (
              <>
                <NotesCard>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <NotesTypography>Select Status of EWS Certificate</NotesTypography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {state.isEwsAvailableErrMsg}
                        </FormHelperText>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{
                            color: state.isEwsAvailableErr ? 'error.main' : '',
                          }}
                        >
                          Select Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Select Category"
                          value={state.isEwsAvailable}
                          error={state.isEwsAvailableErr}
                          onChange={handelChange}
                          name="isEwsAvailable"
                          size="small"
                        >
                          <MenuItem value={''}>Select Stastus</MenuItem>

                          <MenuItem value={'1'}>Available</MenuItem>
                          {data?.late_confirm == 0 && (
                            <MenuItem value={'2'}>Applied But Not Received</MenuItem>
                          )}
                          {data?.late_confirm == 0 && (
                            <MenuItem value={'3'}>Not Available</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <NotesTypography>
                    Economically Weaker Section (EWS) / आर्थिकदृष्टया दुर्बल घटक:
                  </NotesTypography>

                  <Grid container spacing={1}>
                    <Grid item sx={12} display={'flex'}>
                      <NotesTypography component={'span'}>
                        <Iconify icon={'weui:arrow-filled'} />
                      </NotesTypography>
                      <NotesTypography>
                        If you select 'Available', You are required to submit PROFORMA V for
                        Economically Weaker Sections(EWS) Certificate issued by Appropriate
                        Authority of Govt. Of Maharashtra at the time of verification at{' '}
                        {import.meta.env.VITE_FC_NAME} (Refer page 48 of Information Brochure).
                      </NotesTypography>
                    </Grid>
                    {data?.late_confirm == 0 && (
                      <Grid item sx={12} display={'flex'}>
                        <Iconify icon={'weui:arrow-filled'} />
                        <NotesTypography>
                          If you select 'Applied but not Received', you have to submit the receipt
                          of application made for proforma V to the concerning authority, Such
                          candidate needs to submit the original document of Proforma V on or before
                          the last date of reporting to the allotted institute for CAP round - I.
                        </NotesTypography>
                      </Grid>
                    )}

                    {data?.late_confirm == 0 && (
                      <Grid item sx={12} display={'flex'}>
                        <Iconify icon={'weui:arrow-filled'} />
                        <NotesTypography>
                          If you select 'Not Available', Please apply to the concern Authority for
                          proforma V certificate to get the benefit of EWS and submit the receipt at
                          the time of verification at {import.meta.env.VITE_FC_NAME} . If you could
                          not submit the receipt you will be considered as NON-EWS type candidate,
                          Then you are eligible as per Open category.
                        </NotesTypography>
                      </Grid>
                    )}

                    <Grid item sx={12} display={'flex'}>
                      <Iconify icon={'weui:arrow-filled'} />
                      <NotesTypography>
                        Click Here{' '}
                        {/* <a href="https://admissioncet.4pindia.com/cet2023/mca23/staticFiles2023/hmct/PROFORMA V .pdf">PROFORMA V for Economically Weaker Sections(EWS)
													Certificate issued by Appropriate Authority of
													Govt.</a> */}
                        {/* <Link
													// to={`/${
													// 	import.meta.env.VITE_SUBFOLDER_NAME
													// }/Rules_for_Diploma_Admissions(2020).pdf`}
													
													to={`https://admissioncet.4pindia.com/cet2023/mca23/staticFiles2023/hmct/PROFORMA V .pdf`}
												>
													PROFORMA V for Economically Weaker Sections(EWS)
													Certificate issued by Appropriate Authority of
													Govt.
												</Link> */}
                        {/* <Link
                          href="https://admissioncet.4pindia.com/cet2023/mca23/staticFiles2023/hmct/PROFORMA V .pdf"
                          target="_blank"
                        >
                          PROFORMA V for Economically Weaker Sections(EWS)
                          Certificate issued by Appropriate Authority of Govt.
                        </Link> */}
                        <Typography
                          component={'span'}
                          sx={{
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            window.open(
                              `${import.meta.env.VITE_SUBFOLDER_NAME}/assets/proformas/Proforma - V.pdf`,
                              '_blank'
                            )
                          }
                        >
                          PROFORMA V for Economically Weaker Sections(EWS) Certificate issued by
                          Appropriate Authority of Govt.
                        </Typography>
                      </NotesTypography>
                    </Grid>
                  </Grid>
                </NotesCard>
              </>
            )}
          {state?.categoryName == '2' && (
            <NotesCard>
              <NotesTypography variant="h6">Important Instructions :</NotesTypography>

              <Grid container spacing={1}>
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />{' '}
                  </NotesTypography>
                  <NotesTypography>
                    If you select 'Available',You are required to scan and upload the Caste / Tribe
                    Validity Certificate of the candidate and also the remarks that the caste is
                    recognised as backward class in the State of Maharashtra. / सूचना तुम्ही
                    'Available ' निवडल्यास, तुम्हाला उमेदवाराच्या वर्गवारीचा स्पष्ट उल्लेख असलेले
                    जात प्रमाणपत्र स्कॅन करून अपलोड करणे आवश्यक आहे आणि महाराष्ट्र राज्यात ही जात
                    मागासवर्गीय म्हणून ओळखली गेली असली पाहिजे..
                  </NotesTypography>
                </Grid>

                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />{' '}
                  </NotesTypography>
                  <NotesTypography>
                    If you select 'Applied but not Received', you have to submit the receipt of
                    application made for Caste / Tribe Validity Certificate clearly mentioning the
                    category of the candidate and also the remarks that the caste is recognised as
                    backward class in the State of Maharashtra./ तुम्ही 'applied but not received '
                    निवडल्यास, तुम्हाला उमेदवाराच्या वर्गवारीचा स्पष्ट उल्लेख असलेले जात
                    प्रमाणपत्रासाठी केलेल्या अर्जाची पावती संबंधित प्राधिकरणाकडे जमा करावी लागेल.
                  </NotesTypography>
                </Grid>
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />{' '}
                  </NotesTypography>
                  <NotesTypography>
                    If you select 'Not Available' for Caste / Tribe certificate or Non-Creamy Layer
                    Certificate you will be converted to General Category.
                  </NotesTypography>
                </Grid>
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />{' '}
                  </NotesTypography>
                  <NotesTypography>
                    You are required to upload the Caste Certificate clearly mentioning the category
                    of the candidate and also the remarks that the caste is recognised as backward
                    class in the State of Maharashtra
                  </NotesTypography>
                </Grid>
                {state?.category > 3 && (
                  <>
                    <Grid item sx={12} display={'flex'}>
                      <NotesTypography component={'span'}>
                        <Iconify icon={'weui:arrow-filled'} />{' '}
                      </NotesTypography>
                      <NotesTypography>
                        You are required to submit Non-Creamy Layer Certificate issued by Sub
                        Divisional officer or Deputy Collector of the district in addition to the
                        caste certificate valid upto {import.meta.env.VITE_SUBCATEGORY_CERT_DATE}
                      </NotesTypography>
                    </Grid>
                    <Grid item sx={12} display={'flex'}>
                      <NotesTypography component={'span'}>
                        <Iconify icon={'weui:arrow-filled'} />{' '}
                      </NotesTypography>
                      <NotesTypography>
                        If the candidate does not have the Non-Creamy Layer Certificate Valid Upto{' '}
                        {import.meta.env.VITE_SUBCATEGORY_CERT_DATE}, Then the candidate shall Fill
                        the Application form in General Category.
                      </NotesTypography>
                    </Grid>{' '}
                  </>
                )}
              </Grid>
            </NotesCard>
          )}
          <Box
            sx={{
              p: 1.5,
              mt: 1,
              borderRadius: '10px',
              border: '1px solid #dbd9d9',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  Physically Challeged Details / दिव्यांग व्यक्ती तपशील
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">
                  Do you belong to Physically Challeged / दिव्यांग व्यक्ती तपशील
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
                  {state.ph_categoryErrMsg}
                </FormHelperText>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="ph_category"
                  value={state.ph_category}
                  onChange={handelChange}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio size="small" />}
                    label="Yes/हो"
                    disabled={data?.mastercandidatetype_id > 4}
                  />

                  <FormControlLabel value={2} control={<Radio size="small" />} label="No/नाही" />
                </RadioGroup>
              </Grid>

              {state?.ph_category && state?.ph_category == 1 && (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                      If claiming for Physically Challeged, specify type
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          color: state.physicalDisabilityIdErr ? 'error.main' : '',
                        }}
                      >
                        Select Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Category"
                        value={state.physicalDisabilityId}
                        error={state.physicalDisabilityIdErr}
                        onChange={handelChange}
                        name="physicalDisabilityId"
                        size="small"
                      >
                        <MenuItem value={'0'}>
                          <em>Select Status</em>
                        </MenuItem>

                        {physicalDisaList?.data?.map((_e, _index) => {
                          return (
                            <MenuItem value={_e.id.toString()} key={_index}>
                              {_e.typename}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {state.ph_categoryErrMsg}
                      </FormHelperText>
                      <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                        (Minimum 40% benchmark and disability. permanent in nature)
                      </Typography>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          {state?.ph_category && state?.ph_category == 1 && (
            <NotesCard>
              <NotesTypography variant="h6">Important Instructions :</NotesTypography>

              <Grid container spacing={1}>
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />
                  </NotesTypography>
                  <NotesTypography>
                    You are required to scan and upload Certificate of Person with Disabilities at
                    the time of Document Verification at {import.meta.env.VITE_FC_NAME}.{' '}
                    {/* <span style={{ fontWeight: 'bold' }}>
											Certificate of Disability
										</span> */}
                  </NotesTypography>
                </Grid>
                <Grid item sx={12} display={'flex'}>
                  <Box display={'flex'}>
                    <NotesTypography component={'span'}>
                      <Iconify icon={'weui:arrow-filled'} />{' '}
                    </NotesTypography>

                    <Typography
                      component={'span'}
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      variant="subtitle2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_SUBFOLDER_NAME}/assets/proformas/proformaF.pdf`,
                          '_blank'
                        )
                      }
                    >
                      {' '}
                      Click Here to View Proforma – F3{' '}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </NotesCard>
          )}
          <Box
            sx={{
              p: 1.5,
              mt: 1,
              borderRadius: '10px',
              border: '1px solid #dbd9d9',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                  Defence Details / सरंक्षण कर्मचारी तपशील
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">
                  Is Parent a Defence Personnel ? / पालक सरंक्षण दलातील कर्मचारी आहे?
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
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="df_category"
                  value={state.df_category}
                  onChange={handelChange}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio size="small" />}
                    label="Yes/हो"
                    disabled={data?.mastercandidatetype_id > 4}
                  />

                  <FormControlLabel value={2} control={<Radio size="small" />} label="No/नाही" />
                </RadioGroup>
                <FormHelperText sx={{ color: 'error.main' }}>
                  {state.df_categoryErrMsg}
                </FormHelperText>
              </Grid>

              {state?.df_category && state?.df_category == 1 && (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                      If claiming for DEFENCE, specify type
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          color: state.defenceIdErr ? 'error.main' : '',
                        }}
                      >
                        Select Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Category"
                        value={state.defenceId}
                        error={state.defenceIdErr}
                        onChange={handelChange}
                        name="defenceId"
                        size="small"
                        MenuProps={{
                          PaperProps: {
                            style: { width: '300px' },
                          },
                        }}
                      >
                        <MenuItem value={'0'}>
                          <em>Select Status</em>
                        </MenuItem>

                        {defenceList?.data?.map((_e, _index) => {
                          return (
                            <MenuItem
                              value={_e.id.toString()}
                              key={_index}
                              sx={{
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                              }}
                            >
                              {_e.def_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {state.defenceIdErrMsg}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>

          {state?.df_category && state?.df_category == 1 && (
            <NotesCard>
              <NotesTypography variant="h6">Important Instructions :</NotesTypography>

              <Grid container spacing={1}>
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />
                  </NotesTypography>
                  <NotesTypography>
                    You are required to scan and upload the Domicile Certificate of Father/Mother of
                    the Candidate. / वडील / आई जे सक्रिय संरक्षण सेवेतील व्यक्ती आहेत त्यांचे
                    अधिवासाचे प्रमाणपत्र अपलोड करणे आवश्यक
                  </NotesTypography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />
                  </NotesTypography>
                  <Typography variant="subtitle2" mt={1} sx={{ color: 'error.noteText' }}>
                    You are required to scan and upload the proof of his/her Defence type by way of
                    a certificate in prescribed Proforma-C / संरक्षण सेवा प्रमाणपत्र प्रोफोर्मा- C
                    अपलोड करणे आवश्यक
                    <Typography
                      component={'span'}
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      variant="subtitle2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_SUBFOLDER_NAME}/assets/proformas/proformaC.pdf`,
                          '_blank'
                        )
                      }
                    >
                      {' '}
                      Click Here to View Proforma – C{' '}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
              {state.defenceId == 3 && (
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />{' '}
                  </NotesTypography>
                  <Typography variant="subtitle2" mt={1} sx={{ color: 'error.noteText' }}>
                    You are required to scan and upload the proof of his/her Defence type by way of
                    a certificate in prescribed Proforma-D / संरक्षण सेवा प्रमाणपत्र प्रोफोर्मा- D
                    अपलोड करणे आवश्यक
                    <Typography
                      component={'span'}
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      variant="subtitle2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_SUBFOLDER_NAME}/assets/proformas/proformaD.pdf`,
                          '_blank'
                        )
                      }
                    >
                      {' '}
                      Click Here to View Proforma – D{' '}
                    </Typography>
                  </Typography>
                </Grid>
              )}

              {state.defenceId == 5 && (
                <Grid item sx={12} display={'flex'}>
                  <NotesTypography component={'span'}>
                    <Iconify icon={'weui:arrow-filled'} />{' '}
                  </NotesTypography>
                  <Typography variant="subtitle2" mt={1} sx={{ color: 'error.noteText' }}>
                    You are required to scan and upload the proof of his/her Defence type by way of
                    a certificate in prescribed Proforma-E / संरक्षण सेवा प्रमाणपत्र प्रोफोर्मा- E
                    अपलोड करणे आवश्यक
                    <Typography
                      component={'span'}
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      variant="subtitle2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_SUBFOLDER_NAME}/assets/proformas/proformaDefence.pdf`,
                          '_blank'
                        )
                      }
                    >
                      {' '}
                      Click Here to View Proforma – E{' '}
                    </Typography>
                  </Typography>
                </Grid>
              )}
            </NotesCard>
          )}

          {(data?.mastercandidatetype_id == 1 ||
            data?.mastercandidatetype_id == 2 ||
            data?.mastercandidatetype_id == 3 ||
            data?.mastercandidatetype_id == 4 ||
            data?.mastercandidatetype_id == 5 ||
            data?.mastercandidatetype_id == 6) && (
            <NotesCard>
              <NotesTypography variant="h6">Important Instructions :</NotesTypography>

              <Box display={'flex'}>
                <NotesTypography component={'span'}>
                  <Iconify icon={'weui:arrow-filled'} />{' '}
                </NotesTypography>
                <NotesTypography>The Candidate must be an Indian National.</NotesTypography>
              </Box>
              <Box display={'flex'}>
                <NotesTypography component={'span'}>
                  <Iconify icon={'weui:arrow-filled'} />{' '}
                </NotesTypography>
                <NotesTypography>
                  You are required to scan and upload any one of the following document as a proof
                  of Nationality at the time of verification at {import.meta.env.VITE_FC_NAME}.
                </NotesTypography>
              </Box>
            </NotesCard>
          )}
          {state?.caste_tribe_cartificate_status == 2 && (
            <Box
              sx={{
                p: 1.5,
                mt: 1,
                borderRadius: '10px',
                border: '1px solid #dbd9d9',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">
                    Application number from Caste Authority
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
                    helperText={t(state.cvcApplicationNoErrMsg)}
                    error={state.cvcApplicationNoErr}
                    autoFocus
                    fullWidth
                    // label={t('Application number')}
                    margin="normal"
                    name="cvcApplicationNo"
                    onChange={handelChange}
                    type="text"
                    value={state.cvcApplicationNo}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">
                    Authority Name{' '}
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
                        color: state.authNameErr ? 'error.main' : '',
                      }}
                    >
                      Authority Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Authority Name"
                      value={state.authName}
                      error={state.authNameErr}
                      onChange={handelChange}
                      name="authName"
                      size="small"
                    >
                      <MenuItem value={'0'}>
                        <em>Authority Name </em>
                      </MenuItem>

                      {cvcAuthority?.data?.map((_e, _index) => {
                        return (
                          <MenuItem value={`${_e.Jurisdiction}-${_e.Districts}`} key={_index}>
                            {_e.Jurisdiction}-{_e.Districts}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {state.ph_categoryErrMsg}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Date of Application</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    helperText={state.dateOfApplicationErrMsg}
                    error={state.dateOfApplicationErr}
                    autoFocus
                    fullWidth
                    margin="normal"
                    name="dateOfApplication"
                    onChange={handelChange}
                    value={state.dateOfApplication}
                    size="small"
                    autoComplete="off"
                    type="date"
                    inputProps={{ max: moment().format('YYYY-MM-DD') }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">
                    Candidate Name as per certificate.{' '}
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
                    helperText={t(state.candidateNameErrMsg)}
                    error={state.candidateNameErr}
                    autoFocus
                    fullWidth
                    // label={t('Candidate Name')}
                    margin="normal"
                    name="candidateName"
                    onChange={handelChange}
                    type="text"
                    value={state.candidateName}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">
                    Caste Certificate Number{' '}
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
                    helperText={t(state.casteCerNoErrMsg)}
                    error={state.casteCerNoErr}
                    autoFocus
                    fullWidth
                    // label={t('Certicate No')}
                    margin="normal"
                    name="casteCerNo"
                    onChange={handelChange}
                    type="text"
                    value={state.casteCerNo}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {data?.mastercandidatetype_id == 1 && (
            // data?.mastercandidatetype_id == 6
            <Box
              sx={{
                p: 1.5,
                mt: 1,
                borderRadius: '10px',
                border: '1px solid #dbd9d9',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                    Certificate of the Indian Nationality of the candidate
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {state.nationalitydocErrMsg}
                  </FormHelperText>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    Certificate of the{' '}
                    <span style={{ fontWeight: 'bold' }}>Indian Nationality </span>
                    of the candidate (usually issued by the Tehsildar/Executive Magistrate/Dy.
                    Collector of the concerned District/Taluka.)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={8}
                      control={<Radio size="small" />}
                      //	label='Yes'
                    />
                  </RadioGroup>
                </Grid>

                {/* {data.data} */}

                {/* {data?.mastercandidatetype_id === 2 ||
                  data?.mastercandidatetype_id === 3 ||
                  data?.mastercandidatetype_id === 4 ||
                  (data?.mastercandidatetype_id === 5 && (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={10}
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                      >
   <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                        &nbsp;
                        <Typography variant="subtitle2">
                          Certificate of the{" "}
                          <span style={{ fontWeight: "bold" }}>
                            Indian Passport{" "}
                          </span>
                          in the name of the Candidate, issued by Government Of
                          India.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="nationalitydoc"
                          value={state.nationalitydoc}
                          onChange={handelChange}
                        >
                          <FormControlLabel
                            value={10}
                            control={<Radio size="small" />}
                            //	label='Yes'
                          />
                        </RadioGroup>
                      </Grid>
                    </>
                  ))} */}

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    The <span style={{ fontWeight: 'bold' }}>School Leaving Certificate</span>{' '}
                    indicating the Nationality of the Candidate as 'Indian' Or The place of birth In
                    India.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={9}
                      control={<Radio size="small" />}
                      //		label='Yes'
                    />
                  </RadioGroup>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    <span style={{ fontWeight: 'bold' }}>Birth Certificate</span> of the Candidate
                    indicating the place of birth in India.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={11}
                      control={<Radio size="small" />}
                      //					label='Yes'
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Box>
          )}
          {(data?.mastercandidatetype_id == 2 ||
            data?.mastercandidatetype_id == 3 ||
            data?.mastercandidatetype_id == 4 ||
            data?.mastercandidatetype_id == 5) && (
            <Box
              sx={{
                p: 1.5,
                mt: 1,
                borderRadius: '10px',
                border: '1px solid #dbd9d9',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                    Certificate of the Indian Nationality of the candidate
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {state.nationalitydocErrMsg}
                  </FormHelperText>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    Certificate of the{' '}
                    <span style={{ fontWeight: 'bold' }}>Indian Nationality </span>
                    of the candidate (usually issued by the Tehsildar/Executive Magistrate/Dy.
                    Collector of the concerned District/Taluka.)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={8}
                      control={<Radio size="small" />}
                      //	label='Yes'
                    />
                  </RadioGroup>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    Certificate of the <span style={{ fontWeight: 'bold' }}>Indian Passport </span>
                    in the name of the Candidate, issued by Government Of India.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={10}
                      control={<Radio size="small" />}
                      //	label='Yes'
                    />
                  </RadioGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    The <span style={{ fontWeight: 'bold' }}>School Leaving Certificate</span>{' '}
                    indicating the Nationality of the Candidate as 'Indian' Or The place of birth In
                    India.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={9}
                      control={<Radio size="small" />}
                      //		label='Yes'
                    />
                  </RadioGroup>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    <span style={{ fontWeight: 'bold' }}>Birth Certificate</span> of the Candidate
                    indicating the place of birth in India.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={11}
                      control={<Radio size="small" />}
                      //					label='Yes'
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Box>
          )}
          {data?.mastercandidatetype_id == 6 && (
            <Box
              sx={{
                p: 1.5,
                mt: 1,
                borderRadius: '10px',
                border: '1px solid #dbd9d9',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                    Certificate of the Indian Nationality of the candidate
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {state.nationalitydocErrMsg}
                  </FormHelperText>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    Certificate of the{' '}
                    <span style={{ fontWeight: 'bold' }}>Indian Nationality </span>
                    of the candidate (usually issued by the Tehsildar/Executive Magistrate/Dy.
                    Collector of the concerned District/Taluka.)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={8}
                      control={<Radio size="small" />}
                      //	label='Yes'
                    />
                  </RadioGroup>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    Certificate of the <span style={{ fontWeight: 'bold' }}>Indian Passport </span>
                    in the name of the Candidate, issued by Government Of India.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={10}
                      control={<Radio size="small" />}
                      //	label='Yes'
                    />
                  </RadioGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    The <span style={{ fontWeight: 'bold' }}>School Leaving Certificate</span>{' '}
                    indicating the Nationality of the Candidate as 'Indian' Or The place of birth In
                    India.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={9}
                      control={<Radio size="small" />}
                      //		label='Yes'
                    />
                  </RadioGroup>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={10}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Iconify icon={'material-symbols:send'} sx={{ color: 'primary.main' }} />
                  &nbsp;
                  <Typography variant="subtitle2">
                    <span style={{ fontWeight: 'bold' }}>Birth Certificate</span> of the Candidate
                    indicating the place of birth in India.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nationalitydoc"
                    value={state.nationalitydoc}
                    onChange={handelChange}
                  >
                    <FormControlLabel
                      value={11}
                      control={<Radio size="small" />}
                      //					label='Yes'
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Box>
          )}
          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={6} md={6} display={'flex'} justifyContent={'flex-end'}>
              <LoadingButton
                //   disabled={formik.isSubmitting}

                fullWidth
                sx={{ maxWidth: '160px' }}
                size="medium"
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
                color="error"
                sx={{ maxWidth: '150px' }}
                fullWidth
                size="medium"
                onClick={() => {
                  if (userId) {
                    router.back();
                  } else {
                    router.push(paths.candidate.typeDetails);
                  }
                }}
              >
                {t('Back')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <AlertDialogSlide
        open={openModal.open}
        data={openModal.data}
        handelClose={handelCloseModal}
        handelSubmit={handelFinalSubmit}
        loading={isLoading}
      />
    </Box>
  );
};

export default Type;
