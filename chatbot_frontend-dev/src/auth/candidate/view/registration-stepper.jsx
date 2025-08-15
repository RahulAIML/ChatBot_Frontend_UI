import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient, stylesMode } from 'src/theme/styles';
import { paths } from 'src/routes/paths';
import { Iconify } from 'src/components/iconify';
import { Section } from './section';
import { RegistrationForm } from './registration-form';
import { SplitVerifyView } from './verify-view';
import { CongratsPage } from './congrats';
import { useMediaQuery } from '@mui/material';
import { NotesCard } from 'src/components/notes/NotesCard';
import { NotesTypography } from 'src/components/notes/NotesTypography';
import Title from 'src/components/common/title';
import { useRouter } from 'src/routes/hooks';
// ----------------------------------------------------------------------

const STEPS = ['Registration', 'OTP Verification', 'Application Details'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: theme.vars.palette.success.main },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: theme.vars.palette.success.main },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.vars.palette.divider,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  height: 22,
  display: 'flex',
  alignItems: 'center',
  color: theme.vars.palette.text.disabled,
  ...(ownerState.active && { color: theme.vars.palette.success.main }),
  '& .QontoStepIcon-completedIcon': {
    zIndex: 1,
    fontSize: 18,
    color: theme.vars.palette.success.main,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify
          icon="eva:checkmark-fill"
          className="QontoStepIcon-completedIcon"
          width={24}
          height={24}
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

function getStepContent(step, handleNext) {
  switch (step) {
    case 0:
      return <RegistrationForm navigate={handleNext} />;
    case 1:
      return <SplitVerifyView navigate={handleNext} />;
    case 2:
      return <CongratsPage />;
    default:
      return 'Unknown step';
  }
}

// ----------------------------------------------------------------------

export function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (Number(import.meta.env.VITE_IS_SSO) == 1) {
      router.push(paths.sso);
    }
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const layoutQuery = 'md';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* <Box sx={{ mb: 2, padding: 0 }} /> */}
      <Grid container>
        <Grid item xs={4} style={{ display: isMobile ? 'none' : 'block' }}>
          <Section
            title={'Candidate Registration'}
            layoutQuery={layoutQuery}
            // imgUrl={section?.imgUrl}
            method={CONFIG.auth.method}
            subtitle={`Admission in ${import.meta.env.VITE_APPNAME} ${import.meta.env.VITE_CURRENT_YEAR}`}
          />
        </Grid>
        <Grid item xs={isMobile ? 12 : 8}>
          <Card
            elevation={15}
            sx={{
              borderRadius: '10px',
              // border: '1px solid #dbd9d9',
              pt: 2,
              display: 'flex',
              flexDirection: 'column',
              // alignItems:'center',
              justifyContent: 'center',
            }}
          >
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box
              sx={
                {
                  // p: 3,
                  // my: 1.5,
                  // minHeight: 120,
                }
              }
            >
              <Box sx={{ my: 1 }}>{getStepContent(activeStep, handleNext)}</Box>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
              {activeStep != 2 && (
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
