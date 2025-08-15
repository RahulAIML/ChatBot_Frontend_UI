import SvgIcon from '@mui/material/SvgIcon';
import { paths } from 'src/routes/paths';
import { Iconify } from 'src/components/iconify';
import { useSelector } from 'react-redux';

export const AccountMenu = () => {
  const { user } = useSelector((state) => state.auth);

  const _account = [];

  return _account;
};
