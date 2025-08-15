import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  pveri: <Iconify icon="uiw:verification" />,
  everi: <Iconify icon="material-symbols-light:domain-verification" />,
  confirm: icon('ic-menu-item'),
  gri: icon('ic-chat'),
  report: <Iconify icon="mdi:file-report" />,
  transaction: <Iconify icon="fluent:form-28-filled" />,
  message: icon('ic-mail'),
  fc: <Iconify icon="mdi:plus-circle-outline" />,
  edit: <Iconify icon="material-symbols:edit-outline" />,
};

export const NavMenu = () => {
  const { user } = useSelector((state) => state.auth);

  const { t } = useTranslation();
  const dashboardNavData = [
    {
      subheader: '',
      items: [
        {
          title: 'Dashboard',
          path: paths.admin.root,
          icon: ICONS.dashboard,
          visible: true,
          access: true,
          disabled: false,
        },
      ],
    },
    {
      subheader: '',
      items: [
        {
          title: 'Upload',
          path: paths.admin.upload,
          icon: ICONS.report,
          visible: true,
          access: true,
          disabled: false,
        },
      ],
    },
  ];
  return dashboardNavData;
};
