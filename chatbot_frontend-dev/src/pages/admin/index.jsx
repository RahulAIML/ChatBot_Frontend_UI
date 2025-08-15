import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { Home } from 'src/sections/admin/home/index';

// ----------------------------------------------------------------------

const metadata = { title: `Admin Dashboard - ${CONFIG.appName}` };

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Home />
    </>
  );
}
