import React from 'react';
import { Typography } from '@mui/material';
import { stylesMode } from 'src/theme/styles';
export function NotesTypography({ sx, children, variant = 'subtitle2' }) {
  return (
    <Typography
      variant={variant}
      mt={1}
      sx={{
        color: 'info.dark',
        [stylesMode.dark]: {
          color: 'primary.lighter',
        },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
