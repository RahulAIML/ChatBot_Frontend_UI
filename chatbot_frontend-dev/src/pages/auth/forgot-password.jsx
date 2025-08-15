import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SplitForgotView } from 'src/auth/view';

// ----------------------------------------------------------------------

const metadata = { title: `Forgot Password | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SplitForgotView />
    </>
  );
}
