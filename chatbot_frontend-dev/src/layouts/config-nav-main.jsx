import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  candidatelogin: icon('ic-candidatelogin'),
  registration: icon('ic-registration'),
  fclogin: icon('ic-fc-login'),
  print: <Iconify icon="tdesign:save-filled" />,
  meritstatus: <Iconify icon="fa6-solid:ranking-star" />,
  allotment: <Iconify icon="material-symbols:ballot-rounded" />,
  admin: <Iconify icon="eos-icons:admin" />,
  ro: <Iconify icon="mdi:office-building-marker" />,

  importantlinks: <Iconify icon="mdi:file-link" />,

  informationbrochure: <Iconify icon="mage:message-information-fill" />,
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Dashboard',
        subtitle: 'Statistics and Overview of Analytics',
        path: paths.home,
        icon: ICONS.dashboard,
        visible: true,
      },
    ],
  },
];
