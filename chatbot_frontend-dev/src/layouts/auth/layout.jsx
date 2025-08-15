import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { CONFIG } from 'src/config-global';
import { stylesMode } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import Button from '@mui/material/Button';
import { Main, Content } from './main';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { Footer, HomeFooter } from '../main/footer';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { navData as mainNavData } from '../config-nav-main';
import { SignInButton } from '../components/sign-in-button';
import { SettingsButton } from '../components/settings-button';
import { usePathname } from 'src/routes/hooks';
import { useTheme } from '@mui/material/styles';
import { Section } from './section';
// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, data, section, children, header }) {
  const pathname = usePathname();
  const theme = useTheme();
  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery = 'md';

  const navData = data?.nav ?? mainNavData;
  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' }, ...header?.sx }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                />

                <Logo />

                <Box
                  sx={{
                    display: 'none',
                    p: 2,
                    [theme.breakpoints.up(layoutQuery)]: {
                      display: 'block',
                    },
                  }}
                >
                  <Typography variant="body1">
                    <strong>
                      {' '}
                      State Common Entrance Test Cell, Maharashtra State, Mumbai 8th Floor, New
                      Excelsior Building, A.K.Nayak Marg, Fort, Mumbai-400001
                    </strong>
                  </Typography>

                  <Typography variant="body1">
                    {import.meta.env.VITE_COURSE_NAME} {import.meta.env.VITE_CURRENT_YEAR}
                  </Typography>
                </Box>
              </>
            ),
            rightArea: (
              <>
                <NavDesktop
                  data={navData}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
                  }}
                />
                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                  <SignInButton />
                  <SettingsButton />
                  <Button
                    component={RouterLink}
                    href={paths.auth.candidate.signup}
                    variant="contained"
                    sx={sx}
                  >
                    Sign Up
                  </Button>
                </Box>
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={homePage ? <HomeFooter /> : <Footer layoutQuery={layoutQuery} />}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px' }}
      // sx={{
      //   '&::before': {
      //     width: 1,
      //     height: 1,
      //     zIndex: -1,
      //     content: "''",
      //     opacity: 0.24,
      //     position: 'fixed',
      //     backgroundSize: 'cover',
      //     backgroundRepeat: 'no-repeat',
      //     backgroundPosition: 'center center',
      //     backgroundImage: `url(${CONFIG.assetsDir}/assets/background/background-3-blur.webp)`,
      //     [stylesMode.dark]: { opacity: 0.08 },
      //   },
      //   ...sx,
      // }}
    >
      {/* <Main layoutQuery={layoutQuery}>{children}</Main> */}
      <Main layoutQuery={layoutQuery}>
        {/* <Section
          title={section?.title}
          layoutQuery={layoutQuery}
          imgUrl={section?.imgUrl}
          method={CONFIG.auth.method}
          subtitle={section?.subtitle}
        /> */}
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}
