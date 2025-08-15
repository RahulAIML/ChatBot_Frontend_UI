import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Upload  from 'src/sections/admin/upload/index';

// ----------------------------------------------------------------------

const metadata = { title: `Doc Upload - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Upload />
    </>
  );
}
