import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { Privacy } from 'src/sections/privacy';

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
        <Privacy />
      </Container>
    </>
  );
}
