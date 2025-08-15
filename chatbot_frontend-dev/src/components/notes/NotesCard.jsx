import React from 'react';
import { Typography, Card } from '@mui/material';
import { stylesMode } from 'src/theme/styles';
export function NotesCard({ sx, children }) {
  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: '10px',
        backgroundColor: 'info.lighter',
        [stylesMode.dark]: {
          backgroundColor: 'info.darker',
        },
        p: 2,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
