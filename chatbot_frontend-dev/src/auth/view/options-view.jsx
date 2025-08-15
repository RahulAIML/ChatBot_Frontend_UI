import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  Grid,
  FormControl,
  Typography,
  FormControlLabel,
} from '@mui/material';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { RouterLink } from 'src/routes/components';
import { ZodError } from 'zod';
import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';
import { SignUpSchema } from 'src/validation/institute/auth';
import { useMeInstituteMutation } from 'src/redux/slices/institute/auth';
import { toast } from 'src/components/snackbar';
import { FormHead } from '../components/form-head';
export function OptionForm({ navigate, choice, setChoice }) {
  const [state, setState] = useState({
    option: '',
    optiondErr: false,
    optionErrMsg: '',
  });

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
    let flag = false;
    if (!state.option) {
      toast.error('Please Select Option to Reset Password');
      flag = true;
    }
    if (!flag) {
      navigate();
      setChoice(state.option);
    }
  };

  return (
    <>
      <FormHead icon={null} title="Options to Reset Password" description={``} />
      <Box gap={3} display="flex" flexDirection="column">
        <form
          noValidate
          onSubmit={validate}
          autoComplete="off"
          //   {...props}
        >
          <FormControl fullWidth>
            {/* <FormHelperText sx={{ color: 'error.main' }}>{state.genderErrMsg}</FormHelperText> */}
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="option"
              value={state.option}
              onChange={handelChange}
            >
              <FormControlLabel
                value={1}
                control={<Radio size="small" />}
                label="
                 Using Security Question selected in College Registration"
              />
              <FormControlLabel
                value={2}
                control={<Radio size="small" />}
                label="
                 Using One Time Password (OTP) sent via SMS to Registered Mobile Number"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained">
            Proceed
          </LoadingButton>
        </form>
      </Box>
    </>
  );
}
