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
import { styled } from '@mui/material/styles';

const CustomBox = styled('div')(({ theme }) => ({
	width: '100%',
	marginTop: '8px',
	position: 'fixed',
	padding: '10px',
	zIndex: 9999,
	// borderBottomLeftRadius: '15px',
	// borderBottomRightRadius: '15px',
	textAlign: 'start',
	backgroundImage:
		'linear-gradient(90deg, rgb(29 32 141) 0%, rgb(44 114 216) 35%, rgba(0, 212, 255, 1) 100%);', // Add linear gradient background
	[theme.breakpoints.up('lg')]: {
		width: 'calc(100% - 280px)',
	},
}));

const Title = ({ title, muiStyle }) => {
	return (
		<CustomBox>
			<Typography variant='subtitle1' color='primary.contrastText' textAlign={'center'}>
				{title}
			</Typography>
		</CustomBox>
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
