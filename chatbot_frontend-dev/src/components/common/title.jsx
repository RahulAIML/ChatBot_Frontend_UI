import React from 'react';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
const Title = ({ title, muiStyle, align }) => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        p: 1.2,
        borderRadius: '8px',
        textAlign: 'start',
        mt: 1,
        ...muiStyle,
      }}
    >
      <Typography align={align ?? ''} variant="subtitle2" color="primary.contrastText" fontWeight={'bold'}>
        {title}
      </Typography>
    </Box>
  );
};

export default Title;

{
  /* <Card
			sx={{
				borderRadius: '10px',
				...muiStyle,
				height: '50px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				p: 1,
			}}
			elevation={10}
		>
			<Card
				sx={{
					backgroundColor: 'primary.light',
					borderRadius: '5px',
					width: '100%',
					height: '100%',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				elevation={20}
			>
				<Typography variant='h6' color='primary.contrastText'>
					{title}
				</Typography>
			</Card>
		</Card> */
}
