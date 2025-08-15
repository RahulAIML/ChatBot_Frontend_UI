import Stack from '@mui/material/Stack';

// ----------------------------------------------------------------------

export function Layout({ slots, sx, replyData, ...other }) {
  return (
    <Stack sx={sx} {...other}>
      {slots.header}

      <Stack spacing={1} direction="row" sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Stack
          sx={{
            flex: '0 0 200px',
            overflow: 'hidden',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {slots.nav}
        </Stack>

        <Stack
          sx={{
            borderRadius: 1.5,
            flex: replyData ? '0 0 320px' : '0 0 80%', // Corrected syntax
            overflow: 'hidden',
            bgcolor: 'background.default',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {slots.list}
        </Stack>
        {replyData && (
          <Stack
            sx={{
              minWidth: 0,
              flex: '1 1 auto',
              borderRadius: 1.5,
              overflow: 'hidden',
              bgcolor: 'background.default',
            }}
          >
            {slots?.details}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
