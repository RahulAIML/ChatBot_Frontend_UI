import Box from '@mui/material/Box';

import { layoutClasses } from '../classes';

// ----------------------------------------------------------------------

export function Main({ children, sx, isNavHorizontal, ...other }) {
  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
