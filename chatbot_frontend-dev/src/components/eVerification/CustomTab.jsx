import React from 'react';
import Box from '@mui/material/Box';
import { Iconify } from 'src/components/iconify';
import Tab from '@mui/material/Tab';
import { CustomTabs } from 'src/components/custom-tabs';
import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';
import { useParams } from 'react-router-dom';
const TABS = [
  { value: 1, label: 'Home', icon: <Iconify icon={'material-symbols:home'} /> },
  { value: 2, label: 'Step 1', icon: <Iconify icon={'ic:round-looks-one'} /> },
  { value: 3, label: 'Step 2', icon: <Iconify icon={'ic:round-looks-two'} /> },
  { value: 4, label: 'Step 3', icon: <Iconify icon={'icon-park-solid:three-key'} /> },
  { value: 5, label: 'Step 4', icon: <Iconify icon={'icon-park-solid:four-key'} /> },
  { value: 6, label: 'Step 5', icon: <Iconify icon={'icon-park-solid:five-key'} /> },
  { value: 7, label: 'Summary', icon: <Iconify icon={'ooui:text-summary-ltr'} /> },
  { value: 8, label: 'Final', icon: <Iconify icon={'mingcute:save-fill'} /> },
];
import { useMediaQuery, useTheme } from '@mui/material';

const CustomTab = (props) => {
  const { userId, flag } = useParams();
  const router = useRouter();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [value, setValue] = React.useState(props.step);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getRedirectUrl = (stepId) => {
    switch (stepId) {
      case 1:
        return paths.fc[`${flag.toLowerCase()}VerificationFreshHome`](userId, flag);
      case 2:
        return paths.fc[`${flag.toLowerCase()}VerificationFreshStep1`](userId, flag);
      case 3:
        return paths.fc[`${flag.toLowerCase()}VerificationFreshStep2`](userId, flag);
      case 4:
        return paths.fc[`${flag.toLowerCase()}VerificationFreshStep3`](userId, flag);
      case 5:
        return paths.fc[`${flag.toLowerCase()}VerificationFreshStep4`](userId, flag);
      case 6:
        return paths.fc[`${flag.toLowerCase()}VerificationFreshStep5`](userId, flag);
      default:
        return '';
    }
    return '';
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <CustomTabs
        value={value}
        onChange={handleChange}
        variant={isMediumScreen ? 'fullWidth' : 'scrollable'}
        scrollButtons
        allowScrollButtonsMobile
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="start"
            value={tab.value}
            label={tab.label}
            disabled={tab.value > value}
            sx={{ color: 'primary.main' }}
            icon={tab.icon}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            onClick={() => router.push(getRedirectUrl(tab.value))}
          />
        ))}
      </CustomTabs>
    </Box>
  );
};

export default CustomTab;
