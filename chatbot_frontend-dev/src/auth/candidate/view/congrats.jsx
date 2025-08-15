import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Link,
  Link as RouterLink,
  Container,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { useTranslation } from 'react-i18next';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useGetDataForRegisterationVerifyMutation } from 'src/redux/slices/candidate/auth';
export function CongratsPage({ navigate }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [getData, { data, isSuccess }] = useGetDataForRegisterationVerifyMutation();
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      localStorage.clear();
    }
  }, [isSuccess]);
  return (
    <Container>
      <Box gap={3} display="flex" flexDirection="column">
        <Card sx={{ mt: 2, borderRadius: '10px', backgroundColor: 'info.lighter', p: 2 }}>
          <Typography variant="h6" mt={1} sx={{ textDecoration: 'underline' }}>
            {t('Notes')}:-
          </Typography>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}>
              <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />{' '}
            </Typography>
            <Typography variant="subtitle2" mt={1} fontWeight={'bold'}>
              {t(
                'You can use your Application ID as your User Name and the password which you have set at the time of registration.'
              )}
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}>
              <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />{' '}
            </Typography>
            <Typography variant="subtitle2" mt={1}>
              {t(
                'By Login, you can edit your Online Application Form, before confirmation from Facilitation Centre (In Person or e-Scrutiny).'
              )}
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}>
              <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />{' '}
            </Typography>
            <Typography variant="subtitle2" mt={1}>
              {t(
                'By Login, you can take printout of your Application Form and participate in CAP at various stages.'
              )}
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}>
              <Iconify icon={'weui:arrow-filled'} sx={{ color: 'primary.main' }} />{' '}
            </Typography>
            <Typography variant="subtitle2" mt={1}>
              {t('Please complete your application form by following various steps login.')}
            </Typography>
          </Box>
        </Card>

        <Grid item xs={12} md={12} textAlign="center" mt={1}>
          <Card
            sx={{
              mt: 2,
              border: '1px solid #dbd9d9',
              p: 4,
            }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {isSuccess && (
              <>
                <Typography variant="subtitle2">
                  Dear <span>{data?.data?.full_name}</span>, Fill application form for{' '}
                  {import.meta.env.VITE_COURSE_NAME} {import.meta.env.VITE_CURRENT_YEAR} Using
                  Further Details.
                  <br /> Your Application ID:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {data?.data?.username}
                </Typography>
              </>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            textAlign="center"
            p={2}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            backgroundColor="green.secondary"
          >
            <Typography color="green.primary" fontWeight="bold">
              Thank You for Registering Online For {import.meta.env.VITE_COURSE_NAME}{' '}
              {import.meta.env.VITE_CURRENT_YEAR}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} p={2}>
          <Box textAlign="center">
            <RouterLink
              component={Link}
              onClick={() => {
                router.push(paths.auth.candidate.login);
              }}
              underline="none"
            >
              <Button variant="contained">
                Click Here For login and fill/confirm your application{' '}
              </Button>
            </RouterLink>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}
