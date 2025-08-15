import { useState, useEffect, useCallback, forwardRef } from 'react';
import { CardMedia, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import { useBoolean } from 'src/hooks/use-boolean';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { _mock } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateAvatar } from 'src/components/animate';

import { useMockedUser } from 'src/auth/hooks';

import { UpgradeBlock } from '../nav-upgrade';
import { AccountButton } from '../account-button';
import { SignOutButton } from '../sign-out-button';
import { useSelector, useDispatch } from 'react-redux';
// import { useGetProfilePhotoMutation } from 'src/redux/slices/common/getFile';

export function AccountDrawer({ data, sx, ...other }) {
  const theme = useTheme();
  // const [getFile, { data: fileData }] = useGetProfilePhotoMutation();
  const router = useRouter();

  const pathname = usePathname();

  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (user?.imagename) {
  //     getFile({
  //       filename: user?.imagename,
  //       flag: 1,
  //       course: import.meta.env.VITE_APPNAME_SMALL,
  //     });
  //   }
  // }, [user?.imagename]);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback(
    (path) => {
      handleCloseDrawer();
      router.push(path);
    },
    [handleCloseDrawer, router]
  );

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: null, alt: user?.username },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user?.username?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        onClick={handleOpenDrawer}
        photoURL={null}
        displayName={user?.username}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {user?.username}
            </Typography>
          </Stack>
          <Stack
            sx={{
              py: 3,
              px: 2.5,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            {data
              ?.filter((item) => item?.visible == true)
              .map((option) => {
                const rootLabel = pathname.includes('/dashboard') ? 'Home' : 'Dashboard';

                const rootHref = pathname.includes('/dashboard') ? '/' : paths.candidate.root;

                return (
                  <MenuItem
                    key={option.label}
                    onClick={() =>
                      handleClickItem(option.label === 'Home' ? rootHref : option.href)
                    }
                    sx={{
                      py: 1,
                      color: 'text.secondary',
                      '& svg': { width: 24, height: 24 },
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {option.icon}

                    <Box component="span" sx={{ ml: 2 }}>
                      {option.label === 'Home' ? rootLabel : option.label}
                    </Box>

                    {option.info && (
                      <Label color="error" sx={{ ml: 1 }}>
                        {option.info}
                      </Label>
                    )}
                  </MenuItem>
                );
              })}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </>
  );
}
