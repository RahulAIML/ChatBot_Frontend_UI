import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function FormHead({ sx, icon, title, description, ...other }) {
  return (
    <>
      {icon && (
        <Box component="span" display="flex" justifyContent={'center'}>
          {icon}
        </Box>
      )}

      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        sx={{ mb: 2, textAlign: 'center', whiteSpace: 'pre-line', ...sx }}
        {...other}
      >
        <Typography variant="h4">{title}</Typography>

        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </Box>
    </>
  );
}
