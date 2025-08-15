import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------

export function ReusableFormDialog({
  open,
  onClose,
  value,
  onChange,
  onSubmit,
  title,
  description,
  label,
  buttonText,
  isLoading,
  valueToShow,
}) {
  const formatValue = (valueToShow) => {
    if (/^\d{10}$/.test(valueToShow)) {
      // If it's a 10-digit phone number, mask all but the last 4 digits
      return '******' + valueToShow.slice(-4);
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueToShow)) {
      // If it's an email, mask part of the username
      const [username, domain] = valueToShow.split('@');
      if (username.length > 1) {
        return username[0] + '*'.repeat(username.length - 2) + username.slice(-1) + '@' + domain;
      } else {
       
        return '*@' + domain;
      }
    } else {
      return valueToShow;
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} sx={{ minWidth: '40%' }}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>{description} {formatValue(valueToShow)}</Typography>

        <TextField
          autoFocus
          fullWidth
          type="number"
          margin="dense"
          variant="outlined"
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <LoadingButton loading={isLoading} onClick={onSubmit} variant="contained">
          {buttonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
