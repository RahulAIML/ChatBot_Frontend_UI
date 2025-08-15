import Grid from '@mui/material/Unstable_Grid2';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { AppWelcome } from './app-welcome';

import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

export function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <DashboardContent maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <AppWelcome
              title={`Welcome back 👋 \n CHATBOT Admin Portal`}
              description={null}
              img={<SeoIllustration hideBackground />}
              action={null}
            />
          </Grid>
        </Grid>
      </DashboardContent>{' '}
    </>
  );
}
