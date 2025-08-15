import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from '../../components/form-head';
import { FormSocials } from '../../components/form-socials';
import { FormDivider } from '../../components/form-divider';
import { SignUpTerms } from '../../components/sign-up-terms';
import { CustomizedSteppers } from './registration-stepper';
import { NotesCard } from 'src/components/notes/NotesCard';
import { NotesTypography } from 'src/components/notes/NotesTypography';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function SplitSignUpView() {
  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box>
      {/* <FormHead
        title="Registration Form"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.auth.candidate.login} variant="subtitle2">
              Sign In
            </Link>
          </>
        }
      /> */}

      {/* {!isMobile && (
        <NotesCard
        // sx={{
        //   borderRadius: '10px',
        //   backgroundColor: 'beige',
        //   border: '1px solid #c4c4c4',
        //   p: 2,
        // }}
        >
          <NotesTypography variant="h6" textAlign="start">
            <strong> Important Instructions for Registration:</strong>
          </NotesTypography>

          <NotesTypography variant="subtitle2">
            <Iconify icon={'weui:arrow-filled'} />
            Candidate registration process is for capturing data applying for admission in M-ARCH{' '}
            {import.meta.env.VITE_CURRENT_YEAR}
          </NotesTypography>

          <NotesTypography variant="subtitle2">
            <Iconify icon={'weui:arrow-filled'} />
            The data will be used for the future reference during admission process.
          </NotesTypography>

          <NotesTypography variant="subtitle2">
            <Iconify icon={'weui:arrow-filled'} /> Data will be mapped through Candidate email and
            mobile number, hence Candidates are requested to fill Email-Id and Mobile number same as
            that will be used during admission process.
          </NotesTypography>

          <NotesTypography variant="subtitle2" sx={{ color: 'error.main' }}>
            <Iconify icon={'weui:arrow-filled'} />
            <strong>
              {' '}
              The password must be between 7 to 15 characters. Your password must contain at least
              1- Numeric value,1-Small-case Letter,1-Upper-case Letter,1-Special Character.
            </strong>
          </NotesTypography>
        </NotesCard>
      )} */}

      <CustomizedSteppers />

      {/* <SignUpTerms /> */}

      {/* <FormDivider />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      /> */}
    </Box>
  );
}
