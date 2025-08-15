import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector } from 'react-redux';
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function MailItem({ mail, selected, sx, ...other }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box component="li" sx={{ display: 'flex' }}>
      <ListItemButton
        disableGutters
        sx={{
          p: 1,
          gap: 2,
          borderRadius: 1,
          ...(selected && { bgcolor: 'action.selected' }),
          ...sx,
        }}
        {...other}
      >
        <Avatar alt={mail.from_username} src={mail?.from?.avatarUrl ?? ''}>
          {mail.from_username.charAt(0).toUpperCase()}
        </Avatar>

        <ListItemText
          primary={`${mail.from_username} ${mail?.from_group_id === 5 ? `(${mail?.application_id})` : ''}`}
          primaryTypographyProps={{ noWrap: true, component: 'span', variant: 'subtitle2' }}
          secondary={mail.subject}
          secondaryTypographyProps={{
            noWrap: true,
            component: 'span',
            variant:
              mail.read_status == 'U' && mail.to_user_id == user?.userId ? 'subtitle2' : 'body2',
            color:
              mail.read_status == 'U' && mail.to_user_id == user?.userId
                ? 'text.primary'
                : 'text.secondary',
          }}
        />

        <Stack alignItems="flex-end" sx={{ alignSelf: 'stretch' }}>
          <Typography
            noWrap
            variant="body2"
            component="span"
            sx={{ mb: 1.5, fontSize: 12, color: 'text.disabled' }}
          >
            {fToNow(mail.created)}
          </Typography>

          {mail.read_status == 'U' && mail.to_user_id == user?.userId && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'info.main',
              }}
            />
          )}
        </Stack>
      </ListItemButton>
    </Box>
  );
}
