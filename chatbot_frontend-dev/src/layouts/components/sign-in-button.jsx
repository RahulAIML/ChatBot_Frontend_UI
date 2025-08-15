import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
  return (
    <Button
      component={RouterLink}
      href={paths.auth.candidate.login}
      variant="outlined"
      sx={sx}
      {...other}
    >
      Sign in
    </Button>
  );
}
