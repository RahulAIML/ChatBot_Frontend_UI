import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { TERMSANDCONDITION } from 'src/sections/terms-&-Conditions';

// ----------------------------------------------------------------------

const metadata = { title: `Privacy Policy - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Container
        maxWidth={false}
        sx={{
          padding: 1,
          margin: 0,
        }}
      >
        <TERMSANDCONDITION />
      </Container>
    </>
  );
}
